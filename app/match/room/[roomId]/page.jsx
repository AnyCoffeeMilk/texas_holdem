"use client";

import { useParams } from "next/navigation";
import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_svgs/GoBackSVG";
import PageTitle from "@/app/_components/PageTitle";
import SectionTitle from "@/app/_components/SectionTitle";
import RoomIdField from "./_components/RoomIdField";
import { useEffect, useState } from "react";
import { getSocket } from "@/utils/socket";
import ThemeBtn from "@/app/_components/ThemeBtn";
import { read_player_profile } from "@/actions/actions";

let socket = getSocket();

export default function Room() {
  const { roomId } = useParams();

  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    socket.off("updateRoom");
    socket.on("updateRoom", (players) => setPlayerList(players))
    socket.emit("getRoomPlayers", roomId, (players) => setPlayerList(players))
  }, []);

  const handleClick = () => {
    startGame(roomId);
    redirect(`/match/game/${roomId}`);
  };

  return (
    <div className="container-md grid max-w-[600px] flex-1 gap-2 rounded-sm p-4 sm:gap-4">
      <div className="flex justify-between">
        <ThemeLink href="/match" className="px-2 py-1">
          Match
          <GoBackSVG />
        </ThemeLink>
        <PageTitle>Room</PageTitle>
      </div>
      <SectionTitle>Room Id</SectionTitle>
      <RoomIdField roomId={roomId} />
      <SectionTitle>Players</SectionTitle>
      <div className="border-dark grid grid-flow-col grid-cols-2 grid-rows-[repeat(4,32px)] gap-4 rounded-sm border-2 p-4">
        {playerList.length === 0 ? (
          <span>Loading...</span>
        ) : (
          playerList.map((item, index) => (
            <div
              key={index}
              className="flex items-center text-xl font-extrabold"
            >
              <span className="w-[1.5em]">{index + 1}:</span>
              <div className="bg-dark text-light w-[180px] rounded-sm py-[0.1em] text-center">
                {item.username}
              </div>
            </div>
          ))
        )}
      </div>
      <ThemeBtn disabled={playerList.length < 2} onClick={handleClick}>
        Start Game
      </ThemeBtn>
    </div>
  );
}
