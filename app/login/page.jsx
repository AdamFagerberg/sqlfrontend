"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function handleClick() {
    fetch("http://localhost:3002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => router.push(`/${data.token}`));
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="border rounded-full p-3"
        ></input>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-full p-3"
        ></input>

        <div>
          <button
            onClick={handleClick}
            className="py-2 px-5 bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 rounded-full hover:text-white opacity-90"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
