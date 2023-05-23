export default async function Home() {
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI || '');
  const scope = encodeURIComponent("user.info autopay.bsv");
  const state = crypto.randomUUID();
  const loginUrl = `https://api.ddpurse.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="m-4 p-4 bg-blue-200 font-bold rounded-lg">
        <a href={loginUrl}>DotWallet Login</a>
      </div>
    </main>
  );
}
