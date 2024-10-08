// app/api/realms/route.js
import axios from 'axios';
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

async function createTableIfNotExists(db) {
    await db.run(`
        CREATE TABLE IF NOT EXISTS connected_realms (
            id INTEGER PRIMARY KEY,
            ts DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
}

export async function GET() {
    try {
        const tokenResponse = await fetch('http://localhost:3000/api/getToken', {
            method: 'POST',
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to fetch access token');
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.accessToken;

        const wowDataResponse = await axios.get('https://us.api.blizzard.com/data/wow/connected-realm/index', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                namespace: 'dynamic-classic1x-us',
                locale: 'en_US'
            },
        });

        const connectedRealms = wowDataResponse.data.connected_realms;

        const realmIds = connectedRealms.map(realm => {
            const match = realm.href.match(/connected-realm\/(\d+)/);
            return match ? parseInt(match[1], 10) : null;
        }).filter(id => id !== null);

        console.log(realmIds);

        const db = await openDb();
        await createTableIfNotExists(db);
        
        for (const id of realmIds) {
            //making sure the data doesnt exist already, if it does, I'll skip the insert
            const existingEntry = await db.get('SELECT id FROM connected_realms WHERE id = ?', id);

            if (!existingEntry) {
                await db.run('INSERT INTO connected_realms (id) VALUES (?)', id);
            } else {
                console.log(`Realm with id ${id} already exists. Skipping insert.`);
            }
        }
        
        return new Response(JSON.stringify(wowDataResponse.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
        
    } catch (error) {
        console.error('Error fetching WoW Classic ConnectedRealms data:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch WoW Classic data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
