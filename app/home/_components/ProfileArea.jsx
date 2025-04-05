import Avatar from "@/app/_components/Avatar";
import ChipLabel from "@/app/_components/ChipLabel";
import PageTitle from "@/app/_components/PageTitle";
import ThemeLink from "@/app/_components/ThemeLink";
import EditSVG from "@/app/_svgs/EditSVG";

export default function ProfileArea({ playerInfo }) {
  return (
    <div className="container-md col-1 row-2 grid grid-cols-[auto_1fr] grid-rows-[1fr_auto_auto_auto] gap-2 rounded-sm p-2 sm:col-[1/2] sm:row-[1/3] sm:grid-cols-[1fr_auto] sm:grid-rows-[auto_1fr_auto_auto] sm:p-4">
      <PageTitle className="col-[1/3] row-1 justify-center sm:col-1 sm:row-1 sm:justify-start">PROFILE</PageTitle>
      <div className="col-2 row-4 sm:col-2 sm:row-1">
        <ThemeLink href="/home/profile" className="px-2 py-1">
          Edit <EditSVG />
        </ThemeLink>
      </div>
      <Avatar
        className="col-1 row-[2/5] min-h-full w-[110px] sm:col-[1/3] sm:row-2 sm:h-[240px] sm:min-h-auto sm:w-full md:h-[270px] md:w-[245px] lg:h-[300px] lg:w-full"
        src={playerInfo.avatar}
        name={playerInfo.username}
      />
      <div className="text-light bg-dark col-2 row-2 grid items-center rounded-sm text-center text-[2em] font-bold italic sm:col-[1/3] sm:row-3">
        {playerInfo.username}
      </div>
      <ChipLabel className="col-2 row-3 text-2xl sm:col-[1/3] sm:row-4" chips={playerInfo.bank} digits={5}>
        BANK
      </ChipLabel>
    </div>
  );
}
