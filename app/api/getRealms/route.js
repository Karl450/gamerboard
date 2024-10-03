import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function openDb() {
    const dbPath = path.join(process.cwd(), 'db', 'classicwow.db');
    return open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
}

export async function GET(req) {
    try {
        const db = await openDb();
        const realms = await db.all('SELECT * FROM realms');
        return new Response(JSON.stringify(realms), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Error fetching realms:', err);
        return new Response(JSON.stringify({ err: 'Failed to fetch realms' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}