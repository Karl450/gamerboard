import { NextResponse } from "next/server";

export async function POST(request) {


    try {
        const { perkName } = await request.json();

        const dsWebhook = 'https://discordapp.com/api/webhooks/1292988831078809640/y6piOQybiAxpqdAXs8J3FHUv_aOF0uUKxPxLordsq0Ltdlwe-1jc3rY1QnwuH8QI1xuN';

        const webhookBody = {
            embeds: [{
            title: 'PERK WAS FOUND ON THE SHRINE!',
            fields: [
                { name: 'Perk', value: perkName },
            ]
            }],
        };

        const response = await fetch(dsWebhook, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookBody),
        });

        if (!response.ok) {
            throw new Error('Failed to send message to Discord');
        }
        return NextResponse.json({ success: true })

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }

}