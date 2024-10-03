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
        CREATE TABLE IF NOT EXISTS realms (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            timezone TEXT NOT NULL,
            connected_realm INTEGER NOT NULL,
            ts DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
}

export async function GET(request) {
    try {
        const tokenResponse = await fetch('http://localhost:3000/api/getToken', {
            method: 'POST',
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to fetch access token');
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.accessToken;

        const db = await openDb();
        const connectedId = await db.all('SELECT id FROM connected_realms');

        if (connectedId.length === 0) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const newConnectedArray = await Promise.all(
            connectedId.map(async function(realmsId) {
                try {
                    const wowDataResponse = await axios.get('https://us.api.blizzard.com/data/wow/connected-realm/' + realmsId.id, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        params: {
                            namespace: 'dynamic-classic1x-us',
                            orderby: 'id'
                        },
                    });

                    //return wowDataResponse.data;
                    return wowDataResponse.data.realms.map(realm => ({
                        clusterId: wowDataResponse.data.id,
                        id: realm.id,
                        name: realm.name.en_US,
                        category: realm.category.en_US,
                        timezone: realm.timezone 
                    }));
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.warn(`Realm ID ${realmsId.id} not found (404). Skipping.`);
                        return null;
                    } else {
                        console.error(`Error fetching data for realm ID ${realmsId.id}:`, error.response ? error.response.data : error.message);
                        return null;
                    }
                }                
            })
        );

        const flattenedResults = newConnectedArray.filter(result => result !== null).flat();

        await createTableIfNotExists(db);
        for (const realm of flattenedResults) {
            const existingEntry = await db.get('SELECT id FROM realms WHERE id = ?', realm.id);

            if (!existingEntry) {
                await db.run(
                    'INSERT INTO realms (id, name, category, timezone, connected_realm) VALUES (?, ?, ?, ?, ?)', 
                    [realm.id, realm.name, realm.category, realm.timezone, realm.clusterId]
                );
            } else {
                console.log(`Realm with id ${realm.id} already exists. Skipping insert.`);
            }
        }

        return new Response(JSON.stringify(flattenedResults), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        //console.error('Error fetching WoW Classic data:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch WoW Classic data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
