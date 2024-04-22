"use client";
import { useEffect, useState } from "react";

export default function AccountPage({ params }) {
  const [balance, setBalance] = useState();
  const [input, setInput] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3002/me/account/balance", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: params.account,
      }),
    })
      .then((response) => response.json())
      .then((data) => setBalance(data));
  }, []);

  function handleClick() {
    fetch("http://localhost:3002/me/account/deposit", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: params.account,
        amount: input,
      }),
    })
      .then((response) => response.json())
      .then((data) => setBalance(data[0].balance));
  }

  return (
    <>
      <div className="flex h-screen justify-center flex-col">
        <div className="flex flex-col items-center gap-5 w-1/2 self-center max-w-96 text-center bg-slate-800 bg-opacity-90 rounded-2xl p-10">
          <h1 className="text-white text-4xl font-bold">Welcome!</h1>
          <h1 className="text-white text-2xl font-bold">Balance: {balance}</h1>
          <input
            type="number"
            min="0"
            onChange={(e) => setInput(parseFloat(e.target.value))}
            className="border rounded-full p-3"
          ></input>
          <button
            onClick={handleClick}
            className="py-2 px-5 bg-slate-600 hover:bg-slate-500 font-bold text-white rounded-full hover:text-white opacity-90"
          >
            Deposit
          </button>
        </div>
      </div>
    </>
  );
}
