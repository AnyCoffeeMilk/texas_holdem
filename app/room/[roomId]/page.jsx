"use client";

import { redirect, useParams } from "next/navigation";
import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_svgs/GoBackSVG";
import PageTitle from "@/app/_components/PageTitle";
import SectionTitle from "@/app/_components/SectionTitle";
import RoomIdField from "./_components/RoomIdField";
import { useEffect, useState } from "react";
import { getSocket } from "@/utils/socket";
import ThemeBtn from "@/app/_components/ThemeBtn";
import { read_player_profile } from "@/actions/actions";
import PlayerBlock from "./_components/PlayerBlock";

let socket = getSocket();

export default function Room() {
  const { roomId } = useParams();

  const [playerList, setPlayerList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.off("update-room");
    socket.on("update-room", (players) => setPlayerList(players));
    socket.off("start-game");
    socket.on("start-game", () => redirect(`/game/${roomId}`));
    read_player_profile().then(({ player_uuid }) =>
      socket.emit("get-room-players", roomId, (status, players, hostUUID) => {
        if (status === 200) {
          setPlayerList(players);
          if (hostUUID === player_uuid) {
            setIsHost(true);
          }
        } else {
          redirect("/room");
        }
      })
    );
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    socket.emit("host-start-game", roomId, (status) => {
      if (status === 200) {
        redirect(`/game/${roomId}`);
      } else {
        setIsClicked(false);
      }
    });
  };

  return (
    <div className="container-md grid max-w-[600px] flex-1 gap-4 rounded-sm p-4">
      <div className="flex justify-between">
        <ThemeLink href="/room" className="px-2 py-1">
          Match
          <GoBackSVG />
        </ThemeLink>
        <PageTitle>Room</PageTitle>
      </div>
      <div className="grid gap-2">
        <SectionTitle>Room Id</SectionTitle>
        <RoomIdField roomId={roomId} />
      </div>
      <div className="grid gap-2">
        <SectionTitle>Players</SectionTitle>
        <div className="border-dark grid grid-flow-col grid-cols-2 grid-rows-[repeat(4,32px)] gap-4 rounded-sm border-2 p-4">
          {playerList.length === 0 ? (
            <span>Loading...</span>
          ) : (
            playerList.map((item, index) => (
              <PlayerBlock
                key={index}
                index={index + 1}
                username={item.username}
              />
            ))
          )}
        </div>
        {!isHost ? null : (
          <ThemeBtn
            disabled={playerList.length < 2 || isClicked}
            onClick={handleClick}
          >
            Start Game
          </ThemeBtn>
        )}
      </div>
    </div>
  );
}
