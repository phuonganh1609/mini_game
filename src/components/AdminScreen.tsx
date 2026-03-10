"use client"

import { useEffect, useState } from "react";
import { getLeaderboard } from "../utils/leaderBoard";

export default function AdminScreen({ onExit }: { onExit: () => void }) {
  const [users, setUsers] = useState<{ name: string; score: number }[]>([]);

  useEffect(() => {
    setUsers(getLeaderboard());
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-blue-950 text-white">
      <h1 className="text-5xl mb-8 text-yellow-400 font-extrabold text-center">ADMIN DASHBOARD</h1>
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl mb-4 text-yellow-400">Danh sách người chơi</h2>
        <ul>
          {users.length === 0 && <li className="text-gray-400">Chưa có người chơi nào.</li>}
          {users.map((u, i) => (
            <li key={i} className="flex justify-between border-b py-2">
              <span>{u.name}</span>
              <span>{u.score}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onExit}
          className="mt-6 bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-lg font-bold text-lg shadow transition w-full"
        >
          Thoát về trang đầu
        </button>
      </div>
    </div>
  );
}
