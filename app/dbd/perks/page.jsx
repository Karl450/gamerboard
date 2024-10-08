import Navbar from "@/app/components/Navbar";
import Perks from "@/app/components/Perks";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { type } from "os";

async function getPerks() {


    const db = await openDb();
    await createTableIfNotExists(db);

    const currentTime = new Date().getTime();

    const perksExist = await db.all("SELECT * FROM perks");


    //this if work well, dont touch it
    if (perksExist.length > 0) {
        console.warn('PERKS exist')
        const mostRecentPerk = perksExist[0];
        const perkTs = new Date(mostRecentPerk.ts).getTime();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        //data is less than a week old
        if (currentTime - perkTs < oneWeek) {
            return perksExist;
        }
    }
    else {
        console.warn('PERKS does NOT exist')
        const res = await fetch('https://dbd.tricky.lol/api/perks');
        const result = await res.json();
    
        if (result) {
            // Remove old perks from the db
            await db.run(`DELETE FROM perks`);

            const perksArray = Object.entries(result);

            // Insert the fresh one
            const insertQuery = `
                INSERT INTO perks (name, role, character, description, image, tunables, ts)
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            `;

            for (const [perkKey, perk] of perksArray) {
                await db.run(insertQuery, [
                    perk.name,
                    perk.role,
                    perk.character,
                    perk.description,
                    perk.image,
                    JSON.stringify(perk.tunables)
                ]);
            }

            return result;
        }
        else {
          return null
        }
    }

}

async function openDb() {
    const dbPath = path.join(process.cwd(), 'db', 'dbd.db');
    return open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
}

async function createTableIfNotExists(db) {
    await db.run(`
        CREATE TABLE IF NOT EXISTS perks (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            character TEXT,
            description TEXT NOT NULL,
            image TEXT,
            tunables TEXT NOT NULL,
            ts DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
}

export default async function DBD_Perks() {

    const navLinks = [
        { href: '/', name: 'Home' },
        { href: '/dbd', name: 'DBD' },
        { href: '/dbd/shrine', name: 'Shrine' },
        { href: '/dbd/perks', name: 'Perks' },
        { href: '/dbd/wislist', name: 'Wishlist' },
    ];

    let data = await getPerks();

    if (!Array.isArray(data)) {
        data = Object.values(data);
    }

    const perkData = data.map((perk) => {

        const tunables = JSON.parse(perk.tunables || '[]');

        return {
            name: perk.name,
            role: perk.role,
            desc: perk.description,
            character: perk.character,
            tunables: tunables,
            image: perk.image,
        };
    });

    return (
        <>
            <Navbar links={navLinks} />
            <div className="flex flex-col min-h-screen justify-center items-center">
                <Perks className={""} perks={perkData} />
            </div>
        </>
    );
}