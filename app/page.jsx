import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span className="text-7xl pb-72 text-amber-500 font-protest-strike">Gamerboard</span>
      <div className="grid grid-cols-2 gap-16 h-80 w-[750px] ">
        <Link
          href="/dbd"
          className="deadByDaylight bg-dbd bg-cover bg-center h-full w-full block hover:scale-125 duration-700"
        />
        <Link
          href="classicwow"
          className="wowClassic bg-wow-classic bg-cover bg-center hover:scale-125 duration-700"
        />
      </div>
    </div>
  );
}
