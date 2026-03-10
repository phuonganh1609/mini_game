"use client"

import { useEffect, useState } from "react";
import { getLeaderboard, clearLeaderboard, Score } from "../utils/leaderBoard";

export default function Leaderboard() {
  const [scores, setScores] = useState<Score[]>([]);

  const loadLeaderboard = async () => {
    const data = await getLeaderboard();
    setScores(data);
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const handleClear = async () => {
    await clearLeaderboard();
    loadLeaderboard();
  };

  return (
    <div className="bg-black/70 p-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">🏆 Leaderboard</h2>

      <ul>
        {scores.map((s, i) => (
          <li key={i}>
            {i + 1}. {s.name} - {s.score}
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mt-3">
        <button
          onClick={loadLeaderboard}
          className="bg-blue-500 px-3 py-1 rounded"
        >
          Refresh
        </button>

        <button
          onClick={handleClear}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
}