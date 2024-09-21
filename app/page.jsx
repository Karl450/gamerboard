import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="grid grid-cols-2 gap-16 h-80 w-[750px]">
        <Link
          href="/dbd/shrine"
          className="deadByDaylight bg-dbd bg-cover bg-center h-full w-full block"
        />
        <Link
          href="classicwow"
          className="wowClassic bg-wow-classic bg-cover bg-center"
        />
      </div>
    </div>
  );
}
