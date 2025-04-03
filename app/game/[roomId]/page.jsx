"use client";

import { useEffect, useRef, useState } from "react";
import { redirect, useParams } from "next/navigation";
import ChipLabel from "@/app/_components/ChipLabel";
import Avatar from "@/app/_components/Avatar";
import ThemeBtn from "@/app/_components/ThemeBtn";
import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_svgs/GoBackSVG";
import Opponent from "./_components/Opponent";
import PokerCard from "@/app/_components/PokerCard";
import { read_player_profile, read_opponents_profile, get_opponent_action, add_bank } from "@/actions/actions";
import useOnlineGamer from "@/hooks/useOnlineGamer";
import useGameTable from "@/hooks/useGameTable";
import useOnlineTurnHandler from "@/hooks/useOnlineTurnHandler";
import PageTitle from "@/app/_components/PageTitle";
import { getSocket } from "@/utils/socket";

let socket = getSocket();

export default function OnlineGame() {
  const { roomId } = useParams();

  const gameTable = useGameTable();
  const player = useOnlineGamer();

  const [isHost, setIsHost] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [hideNewGame, setHideNewGame] = useState(false);
  const [opponents, setOpponents] = useState([]);
  const [gameState, setGameState] = useState(0);
  const [gameText, setGameText] = useState("");
  const [bbUUID, setBbUUID] = useState("");
  const [sbUUID, setSbUUID] = useState("");
  const [inTurnUUID, setInTurnUUID] = useState("");

  useEffect(() => {
    read_player_profile().then(({ player_name, player_avatar, player_uuid }) => {
      player.setInitInfo(player_name, player_uuid, player_avatar);
      socket.emit("get-room-players", roomId, (status, players, hostUUID) => {
        if (status === 200) {
          setOpponents(players.filter((item) => item.uuid !== player_uuid));
          if (hostUUID === player_uuid) {
            setIsHost(true);
          }
        } else {
          redirect("/room");
        }
      });
      socket.off("disconnected");
      socket.on("disconnected", () => redirect("/room"));
      socket.off("update-public-state");
      socket.on("update-public-state", (newState) => {
        setGameState(newState.gameState);
        setBbUUID(newState.bbUUID);
        setSbUUID(newState.sbUUID);
        setInTurnUUID(newState.inTurnUUID);
        setOpponents(newState.players.filter((item) => item.uuid !== player_uuid));
        player.setBets(newState.players.find((item) => item.uuid === player_uuid).bets);
      });
      socket.off("update-private-state");
      socket.on("update-private-state", (newState) => {
        console.log(newState);
        player.setCards(newState.cards);
      });
    });
  }, []);

  useEffect(() => {
    if (inTurnUUID === player.uuid) {
      setBtnDisabled(false);
    }
  }, [inTurnUUID, player.uuid]);

  useEffect(() => {
    switch (gameState) {
      case 0:
        setGameText(isHost ? "Press NEW ROUND to start." : "Waiting for game to start.");
        break;
      case 1:
        setGameText(
          sbUUID === player.uuid
            ? "You are the Small Blind."
            : `${opponents.find((item) => item.uuid === sbUUID).username} is the Small Blind.`
        );
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
    }
  }, [gameState, isHost]);

  const handleCall = () => {
    setBtnDisabled(true);
    socket.emit("call-action", roomId, player.uuid, (status) => {
      if (status === 404) {
        setBtnDisabled(false);
      }
    });
  };

  const handleRaise = () => {
    setBtnDisabled(true);
    socket.emit("raise-action", roomId, player.uuid, (status) => {
      if (status === 404) {
        setBtnDisabled(false);
      }
    });
  };

  const handleFold = () => {
    setBtnDisabled(true);
    socket.emit("fold-action", roomId, player.uuid, (status) => {
      if (status === 200) {
        player.setCards([null, null]);
      } else {
        setBtnDisabled(false);
      }
    });
  };

  const handleNewRound = () => {
    setHideNewGame(true);
    socket.emit("new-round", roomId, (status) => {
      if (status === 404) {
        setHideNewGame(false);
      }
    });
  };

  return !player.avatar ? null : (
    <div className="grid min-h-[calc(100svh-1rem)] max-w-[480px] min-w-[350px] grid-cols-1 grid-rows-[auto_auto_1fr_auto] gap-2 sm:w-[620px] sm:max-w-none sm:min-w-auto lg:w-[1024px] lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr_auto] lg:gap-4 lg:p-4">
      <div className="col-1 row-1 flex justify-between lg:col-[1/3]">
        <ThemeLink href="/home" className="px-2 py-1">
          HOME <GoBackSVG />
        </ThemeLink>
        <PageTitle>Online Match</PageTitle>
      </div>
      <div className="sm:container-md row-2 flex gap-2 overflow-auto rounded-sm py-1 sm:gap-6 sm:p-4 lg:col-1 lg:row-[2/4] lg:h-[calc(100svh-7rem-3px)] lg:flex-col">
        {opponents.length === 0 ? (
          <span>Loading...</span>
        ) : (
          opponents.map((item, index) => (
            <Opponent
              key={index}
              info={item}
              inTurn={inTurnUUID === item.uuid}
              blindTag={sbUUID === item.uuid ? "SB" : bbUUID === item.uuid ? "BB" : null}
            />
          ))
        )}
      </div>
      <div className="container-sm sm:container-md flex-center relative col-1 row-3 rounded-sm px-2 sm:px-4 lg:col-2 lg:row-2">
        <div className="bg-dark text-light absolute top-4 w-full p-2 text-center text-xl font-bold italic lg:text-2xl">
          {gameText}
        </div>
        <div className="sm:flex-center grid grid-cols-[repeat(4,minmax(0,1fr))_1fr] gap-1 text-xl sm:gap-2 sm:text-lg">
          {gameTable.cards.map((item, index) => (
            <div className="flex-center h-[6.75em] w-[5.5em]">
              <PokerCard key={index} rank={item?.rank} suit={item?.suit} />
            </div>
          ))}
        </div>
        {!isHost || hideNewGame ? null : (
          <ThemeBtn className="absolute right-2 bottom-2" onClick={handleNewRound}>
            NEW ROUND
          </ThemeBtn>
        )}
      </div>
      <div className="sm:container-md col-1 row-4 grid grid-cols-[auto_minmax(130px,auto)_minmax(110px,1fr)] grid-rows-[auto_1fr_auto] gap-1 rounded-sm p-0 sm:grid-cols-[auto_1fr_minmax(100px,1fr)] sm:gap-2 sm:p-4 lg:col-2 lg:row-3">
        <div className="relative col-1 row-[1/3]">
          <Avatar
            className="h-[110px] w-[100px] sm:h-[132px] sm:w-[120px] lg:h-[143px] lg:w-[130px]"
            src={player.avatar}
            name={player.name}
          />
          <div className="text-light bg-dark border-light absolute -top-1 -left-2 rotate-z-[-20deg] rounded-sm border-2 px-2 font-bold">
            {sbUUID === player.uuid ? "SB" : bbUUID === player.uuid ? "BB" : null}
          </div>
        </div>
        <div
          className={`bg-dark text-light ${!btnDisabled ? "animate-blink" : null} col-1 row-3 rounded-sm py-0.5 text-center text-base font-bold sm:text-xl`}
        >
          {player.name}
        </div>
        <div className="col-2 row-[2/4] grid grid-cols-[minmax(0,1fr)_1fr] gap-1 sm:grid-cols-2 sm:gap-2">
          {player.cards.map((item, index) => (
            <div
              key={index}
              className="flex-center h-[105px] w-[85px] text-xl sm:h-full sm:w-full sm:place-self-center"
            >
              <PokerCard rank={item?.rank} suit={item?.suit} />
            </div>
          ))}
        </div>
        <div className="col-3 row-[1/4] grid gap-2 sm:text-lg">
          <ThemeBtn onClick={handleCall} className="[&>div]:py-0" disabled={btnDisabled}>
            CHECK
          </ThemeBtn>
          <ThemeBtn onClick={handleRaise} className="[&>div]:py-0" disabled={btnDisabled}>
            RAISE
          </ThemeBtn>
          <ThemeBtn onClick={handleFold} className="[&>div]:py-0" disabled={btnDisabled}>
            FOLD
          </ThemeBtn>
        </div>
        <ChipLabel className="col-2 row-1 text-base sm:text-xl [&>span]:px-1" chips={player.bets} digits={3}>
          BETS
        </ChipLabel>
      </div>
    </div>
  );
}
