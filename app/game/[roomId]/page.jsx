"use client";

import { useEffect, useReducer, useState } from "react";
import { redirect, useParams } from "next/navigation";
import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_svgs/GoBackSVG";
import Opponent from "./_components/Opponent";
import { read_player_profile, add_bank } from "@/actions/actions";
import PageTitle from "@/app/_components/PageTitle";
import { getSocket } from "@/utils/socket";
import GameTable from "./_components/GameTable";
import PlayerArea from "./_components/PlayerArea";

let socket = getSocket();

const gameStateInit = {
  playerUUID: "",
  playerName: "",
  playerAvatar: "",
  playerCards: [null, null],
  playerBets: 0,
  disableAction: true,
  isHost: false,
  showNewRound: false,
  gameText: "",
  opponents: [],
  centerCards: [],
  bbUUID: "",
  sbUUID: "",
  inTurnUUID: "",
  winnerUUIDs: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "JOIN_ROOM":
      return {
        ...state,
        playerUUID: payload.playerUUID,
        playerName: payload.playerName,
        playerAvatar: payload.playerAvatar,
        opponents: payload.opponents,
        isHost: payload.isHost,
        showNewRound: payload.isHost,
        gameText: payload.isHost ? "Press NEW ROUND to start." : "Waiting for game to start.",
      };
    case "HIDE_NEW_GAME":
      return {
        ...state,
        showNewRound: false,
      };
    case "SHOW_NEW_GAME":
      return {
        ...state,
        showNewRound: true,
      };
    case "DISABLE_ACTION":
      return {
        ...state,
        disableAction: true
      }
    case "ENABLE_ACTION":
      return {
        ...state,
        disableAction: false,
      }
    case "NEW_ROUND":
      return {
        ...state,
        playerBets: payload.players.find((item) => item.uuid === state.playerUUID).bets,
        playerCards: [
          { rank: "X", suit: "X" },
          { rank: "X", suit: "X" },
        ],
        opponents: payload.players.filter((item) => item.uuid !== state.playerUUID),
        centerCards: payload.centerCards,
        bbUUID: payload.bbUUID,
        sbUUID: payload.sbUUID,
        inTurnUUID: payload.inTurnUUID,
        winnerUUIDs: payload.winnerUUIDs,
        gameText:
          payload.sbUUID === state.playerUUID
            ? "You are the Small Blind."
            : `${payload.players.find((item) => item.uuid === payload.sbUUID).username} is the Small Blind.`,
      };
    case "NEXT_TURN":
      const playerState = payload.players.find((item) => item.uuid === state.playerUUID);
      return {
        ...state,
        inTurnUUID: payload.inTurnUUID,
        centerCards: payload.centerCards,
        disableAction: payload.inTurnUUID !== state.playerUUID,
        playerBets: playerState.bets,
        playerCards: playerState.cards[0] === null ? playerState.cards : state.playerCards,
        opponents: payload.players.filter((item) => item.uuid !== state.playerUUID),
        gameText:
          payload.inTurnUUID === state.playerUUID
            ? "It's your turn now."
            : `${state.opponents.find((item) => item.uuid === payload.inTurnUUID).username}'s turn.`,
      };
    case "SET_PLAYER_CARD":
      return {
        ...state,
        playerCards: payload,
      };
    case "SET_WINNER":
      return {
        ...state,
        inTurnUUID: "",
        winnerUUIDs: payload.winnerUUIDs,
        opponents: payload.players.filter((item) => item.uuid !== state.playerUUID),
        showNewRound: state.isHost,
        gameText:
          payload.winnerUUIDs[0] === state.playerUUID
            ? "You are the winner!"
            : `${state.opponents.find((item) => item.uuid === payload.winnerUUIDs[0]).username} is the winner!`,
      };
    case "SET_WINNERS":
      return {
        ...state,
        inTurnUUID: "",
        winnerUUIDs: payload.winnerUUIDs,
        opponents: payload.players.filter((item) => item.uuid !== state.playerUUID),
        showNewRound: state.isHost,
        gameText: payload.winnerUUIDs.includes(state.playerUUID)
          ? `You, ${state.opponents
              .filter((item) => payload.winnerUUIDs.includes(item.uuid))
              .map((item) => item.username)
              .join(", ")} are the winners!`
          : `${state.opponents
              .filter((item) => payload.winnerUUIDs.includes(item.uuid))
              .map((item) => item.username)
              .join(", ")} are the winners!`,
      };
  }
};

export default function OnlineGame() {
  const { roomId } = useParams();
  const [state, dispatch] = useReducer(reducer, gameStateInit);

  useEffect(() => {
    read_player_profile().then(({ player_name, player_avatar, player_uuid }) => {
      socket.emit("get-room-players", roomId, (status, players, hostUUID) => {
        if (status === 200) {
          dispatch({
            type: "JOIN_ROOM",
            payload: {
              playerUUID: player_uuid,
              playerName: player_name,
              playerAvatar: player_avatar,
              opponents: players.filter((item) => item.uuid !== player_uuid),
              isHost: hostUUID === player_uuid,
            },
          });
        } else {
          redirect("/room");
        }
      });
      socket.off("lost-host");
      socket.on("lost-host", () => redirect("/room"));
      socket.off("update-public-state");
      socket.on("update-public-state", (newState) => {
        if (newState.gameStage === 1) {
          dispatch({ type: "NEW_ROUND", payload: newState });
        } else if (newState.gameStage === 2) {
          dispatch({ type: "NEXT_TURN", payload: newState });
        } else if (newState.gameStage === 3) {
          if (newState.winnerUUIDs.length === 1) {
            dispatch({ type: "SET_WINNER", payload: newState });
          } else {
            dispatch({ type: "SET_WINNER", payload: newState });
          }
        }
      });
      socket.off("update-private-state");
      socket.on("update-private-state", (newState) => dispatch({ type: "SET_PLAYER_CARD", payload: newState.cards }));
    });
  }, []);

  const handleAction = (actionID) => {
    dispatch({ type: "DISABLE_ACTION" });
    socket.emit(actionID, roomId, state.playerUUID, (status) => {
      if (status === 404) {
        dispatch({ type: "ENABLE_ACTION" });
      }
    });
  };

  const handleNewRound = () => {
    dispatch({ type: "HIDE_NEW_GAME" });
    socket.emit("new-round", roomId, (status) => {
      if (status === 404) {
        dispatch({ type: "SHOW_NEW_GAME" });
      }
    });
  };

  return !state.playerUUID ? null : (
    <div className="grid min-h-[calc(100svh-1rem)] w-full max-w-[480px] min-w-[350px] grid-cols-1 grid-rows-[auto_auto_1fr_auto] gap-2 sm:w-[620px] sm:max-w-none sm:min-w-auto lg:w-[1024px] lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr_auto] lg:gap-4 lg:p-4">
      <div className="col-1 row-1 flex justify-between lg:col-[1/3]">
        <ThemeLink href="/home" className="px-2 py-1">
          HOME <GoBackSVG />
        </ThemeLink>
        <PageTitle>Online Match</PageTitle>
      </div>
      <div className="sm:container-md row-2 flex gap-2 overflow-auto rounded-sm py-1 sm:gap-6 sm:p-4 lg:col-1 lg:row-[2/4] lg:h-[calc(100svh-7rem-3px)] lg:flex-col">
        {state.opponents.length === 0 ? (
          <span>Loading...</span>
        ) : (
          state.opponents.map((item, index) => (
            <Opponent
              key={index}
              info={item}
              isBlinking={state.inTurnUUID === item.uuid || state.winnerUUIDs.includes(item.uuid)}
              blindTag={state.sbUUID === item.uuid ? "SB" : state.bbUUID === item.uuid ? "BB" : null}
            />
          ))
        )}
      </div>
      <GameTable
        gameText={state.gameText}
        onNewRound={handleNewRound}
        centerCards={state.centerCards}
        showNewRound={state.showNewRound}
      />
      <PlayerArea
        state={state}
        onCall={() => handleAction("call-action")}
        onRaise={() => handleAction("raise-action")}
        onFold={() => handleAction("fold-action")}
      />
    </div>
  );
}
