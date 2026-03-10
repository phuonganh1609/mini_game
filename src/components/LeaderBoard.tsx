"use client"

import { useEffect, useState } from "react";
import { getLeaderboard } from "../utils/leaderBoard";

export default function Leaderboard() {
	const [scores, setScores] = useState<{ name: string; score: number }[]>([]);

	useEffect(() => {
		setScores(getLeaderboard());
	}, []);

	return (
		<div className="bg-black text-white p-6 rounded-lg w-80">
			<h2 className="text-xl mb-4 text-yellow-400">🏆 Leaderboard</h2>
			<ul>
				{scores.map((s, i) => (
					<li key={i} className="flex justify-between border-b py-1">
						<span>{s.name}</span>
						<span>{s.score}</span>
					</li>
				))}
			</ul>
		</div>
	);
}