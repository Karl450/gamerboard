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

export async function GET(req) {
    try {
        const db = await openDb();
        const wishlist = await db.all("SELECT * FROM wishlist");
        return new Response(JSON.stringify(wishlist), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        return new Response(JSON.stringify({ err: 'Failed to fetch wishlist' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}

export async function POST(req) {
    const { perkName } = await req.json();

    try {
        const db = await openDb();

        await db.run(`
            CREATE TABLE IF NOT EXISTS wishlist (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                perkName TEXT NOT NULL
            )
        `);

        // Check if the perk is already in the wishlist
        const existingPerk = await db.get('SELECT * FROM wishlist WHERE perkName = ?', perkName);
        if (existingPerk) {
            return new Response(JSON.stringify({ message: 'Perk already in wishlist' }), {
                status: 409,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await db.run('INSERT INTO wishlist (perkName) VALUES (?)', perkName);

        return new Response(JSON.stringify({ message: 'Perk added to wishlist' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Error inserting perk into wishlist:', err);
        return new Response(JSON.stringify({ err: 'Failed to add perk to wishlist' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}