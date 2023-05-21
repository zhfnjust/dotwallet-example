import { DotwalletSigner, DefaultProvider } from "scrypt-ts";
import token from "./token"

async function getData() {
  if (token.access_token) {

    const provider = new DefaultProvider();

    const signer = new DotwalletSigner(token.access_token, provider)

    const balance = await signer.getBalance();

    return { balance: balance.confirmed + balance.unconfirmed };
  }

  return { balance: -1 };
}

export default async function Home() {

  const data = await getData();

  console.log('data', data)

  if(data.balance === -1 ) {
    const loginUrl = `https://api.ddpurse.com/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(
      process.env.REDIRECT_URI || ''
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
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="m-4 p-4 bg-blue-200 font-bold rounded-lg">
          <label>balance</label> {data.balance}
        </div>
      </main>
    );
  }


}
