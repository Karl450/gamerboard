import Link from "next/link";

export default function DBD_Nav() {
    return (
        <div className="flex justify-center items-center h-12 text-center text-xl">
            <div className="mt-6">
                <Link href="/dbd/shrine" className="mx-6">Shrine</Link>
                <Link href="/" className="mx-6">Survivors</Link>
                <Link href="/" className="mx-6">Killers</Link>
                <Link href="/" className="mx-6">Perks</Link>
            </div>
        </div>
    );
}