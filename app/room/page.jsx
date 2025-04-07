"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_svgs/GoBackSVG";
import PageTitle from "@/app/_components/PageTitle";
import SectionTitle from "../_components/SectionTitle";
import JoinInputBox from "./_components/JoinInputBox";
import BuyInOption from "./_components/BuyInOption";
import ThemeBtn from "../_components/ThemeBtn";
import { read_player_profile } from "@/actions/actions";
import { getSocket } from "@/utils/socket";
import CasualGameOption from "./_components/CasualGameOption";

const socket = getSocket();

export default function MatchRoom() {
  const [roomId, setRoomId] = useState("");
  const [clicked, setClicked] = useState(false);
  const [buyIn, setBuyIn] = useState(200);

  const handleJoin = () => {
    read_player_profile().then(({ player_name, player_avatar_id, player_uuid }) => {
      socket.emit("join-room", roomId, player_uuid, player_name, player_avatar_id, (status) => {
        if (status === 200) {
          redirect(`/room/${roomId}`);
        } else {
          setClicked(false);
        }
      });
    });
  };

  const handleCreate = () => {
    setClicked(true);
    read_player_profile().then(({ player_name, player_avatar_id, player_uuid }) => {
      socket.emit("create-room", player_uuid, player_name, player_avatar_id, buyIn, (status, roomId) => {
        if (status === 201) {
          redirect(`/room/${roomId}`);
        } else {
          setClicked(false);
        }
      });
    });
  };

  return (
    <div className="container-md grid max-w-[600px] flex-1 gap-4 rounded-sm p-4">
      <div className="flex justify-between">
        <ThemeLink href="/home" className="px-2 py-1">
          HOME <GoBackSVG />
        </ThemeLink>
        <PageTitle>Match</PageTitle>
      </div>
      <div className="grid gap-2">
        <SectionTitle>Join Room by Id</SectionTitle>
        <JoinInputBox value={roomId} onChange={setRoomId} />
        <ThemeBtn
          disabled={roomId.length !== 6 || clicked}
          onClick={handleJoin}
        >
          Join Room
        </ThemeBtn>
      </div>
      <div className="grid gap-2">
        <SectionTitle>Create A New Room</SectionTitle>
        <BuyInOption selected={buyIn} onSelect={setBuyIn} />
        <CasualGameOption />
        <ThemeBtn disabled={clicked} onClick={handleCreate}>
          Create Room
        </ThemeBtn>
      </div>
    </div>
  );
}
