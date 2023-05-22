import { DotwalletSigner, DefaultProvider } from "scrypt-ts";
import token from "../token";

async function getData() {
  if(token.access_token) {
    const provider = new DefaultProvider();
    const signer = new DotwalletSigner(token.access_token, provider);
    const balance = await signer.getBalance();
    return { balance: balance.confirmed + balance.unconfirmed };
  }

  return { balance: 0 };
}

export default async function Balance() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="m-4 p-4 bg-blue-200 font-bold rounded-lg">
        <label>balance: </label> {data.balance}
      </div>
    </main>
  );
}
