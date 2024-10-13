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
        const perk = await db.all('SELECT * FROM perks');
        return new Response(JSON.stringify(perk), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Error fetching perks:', err);
        return new Response(JSON.stringify({ err: 'Failed to fetch perks' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}