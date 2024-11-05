import Navbar from "@/app/components/Navbar";
import DeleteBtn from "./DeleteBtn";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function openDb() {
    const dbPath = path.join(process.cwd(), 'db', 'dbd.db');
    return open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
}

async function getWishlist() {
    const db = await openDb();
    const wishlist = await db.all("SELECT * FROM wishlist")
    return wishlist;
}

async function getPerksInfo(wishlist) {
    const db = await openDb();
    const placeholders = wishlist.map(() => '?').join(', ');
    const perks = await db.all(
        `SELECT * FROM perks WHERE name IN (${placeholders})`,
        wishlist
    );
    return perks;
}



export default async function Wishlist() {

    const navLinks = [
        { href: '/', name: 'Home' },
        { href: '/dbd', name: 'DBD' },
        { href: '/dbd/shrine', name: 'Shrine' },
        { href: '/dbd/perks', name: 'Perks' },
    ];

    const wishlist = await getWishlist();
    const wishPerkNames = wishlist.map(item => item.perkName);
    const wishPerks = await getPerksInfo(wishPerkNames);

    const perksImageMap = new Map(
        wishPerks.map(perk => [perk.name, perk.image])
    );

    return (
        <>
            <Navbar links={navLinks} />
            <table>
                <tbody>

                {wishlist.length === 0 ? (
                    <tr>
                        <td colSpan="3" className="text-center py-4">
                            <span>oops! Wishlist is empty</span>
                        </td>
                    </tr>
                ) : (
                    wishlist.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.perkName}</td>
                            <td>
                                <img
                                    src={`/images/Content/${perksImageMap.get(item.perkName)}`}
                                    alt={item.perkName}
                                    className="w-20 h-auto"
                                />
                            </td>
                            <td>
                                <DeleteBtn perkId={item.id} />
                            </td>
                        </tr>
                    ))
                )}

                </tbody>
            </table>
        </>
    );
}