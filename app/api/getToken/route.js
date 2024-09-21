import axios from 'axios';

export async function POST(request) {
  const { CLIENT_ID, CLIENT_SECRET } = process.env;

  try {
    const response = await axios.post('https://us.battle.net/oauth/token', null, {
      params: {
        grant_type: 'client_credentials',
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });

    return new Response(JSON.stringify({ accessToken: response.data.access_token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching access token:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch access token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
