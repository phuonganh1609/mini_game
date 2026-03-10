
"use client"

import { useGame } from "../hooks/useGame";
import { useEffect, useState } from "react";
import MoneyPyramid from "./MoneyPyramid";
import Leaderboard from "./LeaderBoard";

export default function GameBoard({ player, onExit }: { player: string; onExit: () => void }) {

	const { question, current, gameOver, answer, money, finished, use5050, useAudience, answersToShow } = useGame(player);
	const [used5050, setUsed5050] = useState(false);
	const [usedAudience, setUsedAudience] = useState(false);
	const [usedCall, setUsedCall] = useState(false);
	const [usedStudio, setUsedStudio] = useState(false);
	// Gọi điện cho người thân
	function handleCall() {
		if (usedCall) return;
		setUsedCall(true);
		// 70% trả lời đúng, 30% random
		const isCorrect = Math.random() < 0.7;
		let suggestion;
		if (isCorrect) {
			suggestion = question.answers[question.correct];
		} else {
			const wrongs = question.answers.filter((_, i) => i !== question.correct);
			suggestion = wrongs[Math.floor(Math.random() * wrongs.length)];
		}
		alert(`Người thân nghĩ: "${suggestion}"`);
	}

	function handleStudio() {
		if (usedStudio) return;
		setUsedStudio(true);
		// 60% trả lời đúng, 40% random
		const isCorrect = Math.random() < 0.6;
		let suggestion;
		if (isCorrect) {
			suggestion = question.answers[question.correct];
		} else {
			const wrongs = question.answers.filter((_, i) => i !== question.correct);
			suggestion = wrongs[Math.floor(Math.random() * wrongs.length)];
		}
		alert(`Trường quay chọn: "${suggestion}"`);
	}
	const [timer, setTimer] = useState(30);

	// Countdown timer
	useEffect(() => {
		if (gameOver || finished) return;

		if (timer === 0) {
			onExit();
			return;
		}

		const interval = setInterval(() => {
			setTimer(t => t - 1);
		}, 1000);

		return () => clearInterval(interval);

	}, [timer, gameOver, finished]);

	// format timer
	const minutes = Math.floor(timer / 60);
	const seconds = (timer % 60).toString().padStart(2, "0");

	// GAME OVER
	if (gameOver) {
		return (
			<div className="h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
				<h1 className="text-5xl font-bold text-red-500 mb-6">Game Over ❌</h1>
				<p className="text-2xl mb-6">Bạn đã thắng {money.toLocaleString()} đ</p>
				<Leaderboard />
				<button
					onClick={onExit}
					className="mt-8 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl font-bold text-lg shadow-lg"
				>
					Thoát về trang đầu
				</button>
			</div>
		);
	}

	// WIN
	if (finished) {
		return (
			<div className="h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
				<h1 className="text-5xl font-bold text-yellow-400 mb-6">🎉 Bạn đã chiến thắng!</h1>
				<p className="text-2xl mb-6">Tiền thưởng: {money.toLocaleString()} đ</p>
				<Leaderboard />
				<button
					onClick={onExit}
					className="mt-8 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold text-lg shadow-lg"
				>
					Thoát về trang đầu
				</button>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-gradient-to-b from-[#020617] via-[#0b1f44] to-[#020617] text-white">

			{/* MONEY PYRAMID */}
			<div className="w-72 flex items-center justify-center border-r border-blue-900">
				<MoneyPyramid current={current} />
			</div>

			{/* MAIN GAME */}
			<div className="flex-1 flex flex-col items-center justify-center p-10">

				{/* TOP BAR */}
				<div className="flex items-center justify-between w-full max-w-3xl mb-8">

					<button
						onClick={onExit}
						className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full text-xl shadow"
					>
						←
					</button>

					{/* TIMER */}
					<div className="bg-black border-2 border-yellow-400 px-6 py-2 rounded-full text-yellow-400 text-2xl font-bold shadow-lg">
						{minutes}:{seconds}
					</div>

					{/* LIFELINES */}
					<div className="flex gap-2">
						<button
							onClick={() => { if (!used5050) { use5050(); setUsed5050(true); } }}
							disabled={used5050}
							className={`bg-blue-200 text-blue-900 font-bold px-4 py-2 rounded shadow ${used5050 ? 'opacity-50 cursor-not-allowed' : ''}`}
						>
							50:50
						</button>

						<button
							onClick={() => { if (!usedAudience) { useAudience(); setUsedAudience(true); } }}
							disabled={usedAudience}
							className={`bg-blue-200 text-blue-900 font-bold px-4 py-2 rounded shadow ${usedAudience ? 'opacity-50 cursor-not-allowed' : ''}`}
						>
							👥
						</button>

						<button
							onClick={handleCall}
							disabled={usedCall}
							className={`bg-blue-200 text-blue-900 font-bold px-4 py-2 rounded shadow ${usedCall ? 'opacity-50 cursor-not-allowed' : ''}`}
						>
							📞
						</button>

						<button
							onClick={handleStudio}
							disabled={usedStudio}
							className={`bg-blue-200 text-blue-900 font-bold px-4 py-2 rounded shadow ${usedStudio ? 'opacity-50 cursor-not-allowed' : ''}`}
						>
							🔄
						</button>
					</div>

				</div>

				{/* QUESTION */}
				<div className="bg-[#0f2a5c] border-4 border-blue-500 px-12 py-6 rounded-3xl text-2xl text-center max-w-3xl mb-10 shadow-xl">
					{question.question}
				</div>

				{/* ANSWERS */}
				<div className="grid grid-cols-2 gap-6 w-full max-w-3xl">

					{answersToShow.map((ans, i) => (

						<button
							key={i}
							onClick={() => answer(i)}
							className="bg-[#112a66] hover:bg-yellow-400 hover:text-black border-2 border-blue-400 px-6 py-4 rounded-full text-xl font-bold flex items-center gap-4 transition shadow-xl"
						>

							<span className="bg-blue-300 text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">
								{String.fromCharCode(65 + i)}
							</span>

							{ans}

						</button>

					))}

				</div>

				{/* MONEY */}
				<div className="mt-10 text-xl font-bold text-yellow-300">
					💰 Tiền thưởng:{" "}
					<span className="text-yellow-400 text-2xl">
						{money.toLocaleString()} đ
					</span>
				</div>

			</div>

		</div>
	);
}
