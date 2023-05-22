export default async function Home() {
  const loginUrl = `https://api.ddpurse.com/authorize?client_id=${
    process.env.CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    process.env.REDIRECT_URI || ""
  )}&response_type=code&scope=${encodeURIComponent(
    "user.info"
  )}&state=${crypto.randomUUID()}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="m-4 p-4 bg-blue-200 font-bold rounded-lg">
        <a href={loginUrl}>DotWallet Login</a>
      </div>
    </main>
  );
}
