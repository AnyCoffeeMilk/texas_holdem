"use client";

import { useEffect, useReducer } from "react";
import { redirect, useParams } from "next/navigation";
import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_svgs/GoBackSVG";
import Opponent from "../_components/Opponent";
import { read_player_profile, add_bank } from "@/actions/actions";
import PageTitle from "@/app/_components/PageTitle";
import { getSocket } from "@/utils/socket";
import { gameStateInit, gameStateReducer } from "./gameStateReducer";
import GameTable from "../_components/GameTable";
import PlayerArea from "../_components/PlayerArea";
import RaisePanel from "../_components/RaisePanel";

let socket = getSocket();

export default function OnlineGame() {
  const { roomId } = useParams();
  const [state, dispatch] = useReducer(gameStateReducer, gameStateInit);

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
              playerBuyIn: players.find((item) => item.uuid === player_uuid).buyIn,
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

  const handleAction = (actionID, addBet = null) => {
    dispatch({ type: "DISABLE_ACTION" });
    if (addBet === null) {
      socket.emit(actionID, roomId, state.playerUUID, (status) => {
        if (status !== 200) {
          dispatch({ type: "ENABLE_ACTION" });
        }
      });
    } else {
      socket.emit(actionID, roomId, state.playerUUID, addBet, (status) => {
        if (status !== 200) {
          dispatch({ type: "ENABLE_ACTION" });
        }
      });
    }
  };

  const handleNewRound = () => {
    dispatch({ type: "HIDE_NEW_GAME" });
    socket.emit("new-round", roomId, (status) => {
      if (status !== 200) {
        dispatch({ type: "SHOW_NEW_GAME" });
      }
    });
  };

  const chipPot =
    state.opponents.length > 0
      ? state.playerBets + state.opponents.map((item) => item.bets).reduce((a, b) => a + b)
      : 0;

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
        chipPot={chipPot}
        centerCards={state.centerCards}
        showNewRound={state.showNewRound}
      />
      <PlayerArea
        state={state}
        onCall={() => handleAction("call-action")}
        onRaise={() => dispatch({ type: "SHOW_RAISE_PANEL" })}
        onFold={() => handleAction("fold-action")}
      />
      {state.showRaisePanel ? (
        <div className="bg-dark/50 flex-center absolute top-0 left-0 z-20 h-screen w-screen p-1">
          <RaisePanel
            playerInfo={{
              username: state.playerName,
              avatar: state.playerAvatar,
              bets: state.playerBets,
              buyIn: state.playerBuyIn,
            }}
            minBet={state.minBet}
            chipPot={chipPot}
            onCancel={() => dispatch({ type: "HIDDEN_RAISE_PANEL" })}
            onConfirm={(addBet) => {
              dispatch({ type: "HIDDEN_RAISE_PANEL" });
              handleAction("raise-action", addBet);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
