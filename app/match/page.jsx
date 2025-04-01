"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_svgs/GoBackSVG";
import PageTitle from "@/app/_components/PageTitle";
import SectionTitle from "../_components/SectionTitle";
import JoinInputBox from "./_components/JoinInputBox";
import CreateOption from "./_components/CreateOption";
import ThemeBtn from "../_components/ThemeBtn";
import { read_player_profile } from "@/actions/actions";
import { getSocket } from "@/utils/socket";

const socket = getSocket();

export default function MatchRoom() {
  const [roomId, setRoomId] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    read_player_profile().then(({ player_name, player_uuid }) => {
      socket.emit("joinRoom", roomId, player_uuid, player_name, (res) => {
        if (res === 0) {
          console.log("Room not found.");
          setClicked(false);
        } else if (res === -1) {
          console.log("Room Id invalid.");
          setClicked(false);
        } else if (res === 1) {
          console.log("Successfully joined room.");
          redirect(`/match/room/${roomId}`);
        }
      });
    });
  };

  const handleCreateRoom = () => {
    setClicked(true);
    read_player_profile().then(({ player_name, player_uuid }) => {
      socket.emit("createRoom", player_uuid, player_name, (roomId) => {
        redirect(`/match/room/${roomId}`);
      });
    });
  };

  return (
    <div className="container-md grid max-w-[600px] flex-1 gap-8 rounded-sm p-4">
      <div className="flex justify-between">
        <ThemeLink href="/home" className="px-2 py-1">
          HOME <GoBackSVG />
        </ThemeLink>
        <PageTitle>Match</PageTitle>
      </div>
      <div className="grid gap-4">
        <SectionTitle>Join Room by Id</SectionTitle>
        <JoinInputBox value={roomId} onChange={setRoomId} />
        <ThemeBtn
          disabled={roomId.length !== 6 || clicked}
          onClick={handleClick}
        >
          Join Room
        </ThemeBtn>
      </div>
      <div className="grid gap-4">
        <SectionTitle>Create A New Room</SectionTitle>
        <CreateOption />
        <ThemeBtn disabled={clicked} onClick={handleCreateRoom}>
          Create Room
        </ThemeBtn>
      </div>
    </div>
  );
}
