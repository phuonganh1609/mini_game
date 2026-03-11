
"use client"

import { useGame } from "../hooks/useGame";
import { useEffect, useState } from "react";
import MoneyPyramid from "./MoneyPyramid";
import Leaderboard from "./LeaderBoard";
import {audioManager } from "../utils/sound";
export default function GameBoard({ player, onExit }: { player: string; onExit: () => void }) {
	useEffect(() => {
		audioManager.init();
		audioManager.stopAll();
		audioManager.play("thinking");
	}, []);
	const [started, setStarted] = useState(false);
	const { question, current, gameOver, answer, money, finished, use5050, useAudience, answersToShow, setGameOver, answerSai, correctIndex } = useGame(player);
	const [used5050, setUsed5050] = useState(false);
	const [usedAudience, setUsedAudience] = useState(false);
	const [usedCall, setUsedCall] = useState(false);
	const [usedStudio, setUsedStudio] = useState(false);
	useEffect(() => {
		if (!gameOver && !finished && current !== 0) {
			audioManager.stopAll();
			audioManager.play("thinking");
		}
		return () => {
			audioManager.stop("thinking");
		};
	}, [current, gameOver, finished]);
	// Gọi điện cho người thân
	function handleCall() {
		if (usedCall) return;
		setUsedCall(true);
		audioManager.play("lifeline"); // sound lifeline
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
		audioManager.play("lifeline"); // sound lifeline
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

	// Reset timer khi qua câu mới
	useEffect(() => {
		if (!gameOver && !finished) {
			setTimer(30);
		}
	}, [current]);

	// Countdown timer chỉ chạy khi đang chơi
	useEffect(() => {
		if (gameOver || finished) return;

		if (timer === 0 && !gameOver) {
			audioManager.stopAll();
			audioManager.play("timeout");
			setTimeout(() => {
				setGameOver(true);
			}, 1500);
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

	function handleExit() {
		audioManager.stopAll();
		audioManager.play("welcome");
		onExit();
	}
	return (
		<div className="flex flex-col md:flex-row min-h-screen overflow-x-hidden bg-gradient-to-b from-[#020617] via-[#0b1f44] to-[#020617] text-white">

  {/* MONEY PYRAMID */}
  <div className="w-full md:w-72 flex items-center justify-center border-b md:border-b-0 md:border-r border-blue-900 p-4">
    <MoneyPyramid current={current} />
  </div>

  {/* MAIN GAME */}
  <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-10">

    {/* TOP BAR */}
    <div className="flex flex-wrap items-center justify-between w-full max-w-3xl mb-8 gap-3">

      <button
        onClick={handleExit}
        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full text-lg md:text-xl shadow"
      >
        ←
      </button>

      {/* TIMER */}
      <div className="bg-black border-2 border-yellow-400 px-4 md:px-6 py-2 rounded-full text-yellow-400 text-xl md:text-2xl font-bold shadow-lg">
        {minutes}:{seconds}
      </div>

      {/* LIFELINES */}
      <div className="flex flex-wrap gap-2">

        <button
          onClick={() => {
            if (!used5050) {
              use5050();
              setUsed5050(true);
              audioManager.play("lifeline");
            }
          }}
          disabled={used5050}
          className={`bg-blue-200 text-blue-900 font-bold px-3 md:px-4 py-2 rounded shadow text-sm md:text-base ${
            used5050 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          50:50
        </button>

        <button
          onClick={() => {
            if (!usedAudience) {
              useAudience();
              setUsedAudience(true);
            }
          }}
          disabled={usedAudience}
          className={`bg-blue-200 text-blue-900 font-bold px-3 md:px-4 py-2 rounded shadow text-sm md:text-base ${
            usedAudience ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          👥
        </button>

        <button
          onClick={handleCall}
          disabled={usedCall}
          className={`bg-blue-200 text-blue-900 font-bold px-3 md:px-4 py-2 rounded shadow text-sm md:text-base ${
            usedCall ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          📞
        </button>

        <button
          onClick={handleStudio}
          disabled={usedStudio}
          className={`bg-blue-200 text-blue-900 font-bold px-3 md:px-4 py-2 rounded shadow text-sm md:text-base ${
            usedStudio ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          🏛️
        </button>

      </div>
    </div>

    {/* QUESTION */}
    <div className="w-full max-w-3xl text-center text-lg md:text-2xl font-bold text-yellow-200 mb-6 px-2">
      {question.question}
    </div>

    {/* ANSWERS */}
    <div className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-8 w-full max-w-3xl">
      {answersToShow.map((ans, i) => {

        let btnColor = "bg-[#112a66]";
        let textColor = "text-white";

        if (answerSai !== null && i === answerSai) {
          btnColor = "bg-red-600";
          textColor = "text-white";
        }

        if (correctIndex !== null && i === correctIndex) {
          btnColor = "bg-green-500";
          textColor = "text-white font-bold";
        }

        return (
          <button
            key={i}
            onClick={() => answer(i)}
            disabled={answerSai !== null || gameOver || finished}
            className={`${btnColor} ${textColor}
              hover:bg-yellow-400 hover:text-black
              border-2 border-blue-400
              px-4 md:px-6
              py-3 md:py-4
              rounded-full
              text-base md:text-xl
              font-bold
              flex items-center gap-3 md:gap-4
              transition shadow-xl`}
          >
            <span className="bg-blue-300 text-blue-900 rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center font-bold">
              {String.fromCharCode(65 + i)}
            </span>
            {ans}
          </button>
        );
      })}
    </div>

    {/* MONEY */}
    <div className="mt-8 md:mt-10 text-lg md:text-xl font-bold text-yellow-300">
      💰 Tiền thưởng:{" "}
      <span className="text-yellow-400 text-xl md:text-2xl">
        {money.toLocaleString()} đ
      </span>
    </div>

  </div>
</div>
	);
}
