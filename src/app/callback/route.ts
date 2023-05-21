import { redirect, notFound } from 'next/navigation';

import token from "../token"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const res = await fetch(`https://api.ddpurse.com/v1/oauth2/get_access_token`, {
      body: JSON.stringify({
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
        client_secret: process.env.CLIENT_SECRET,
        client_id: process.env.CLIENT_ID,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST'
    });
    const { code: apiCode, data, msg } = await res.json();

    if (apiCode === 0) {
      const { access_token } = data;
      token.access_token = access_token;
      redirect('/');
    }

  }

  notFound();
}