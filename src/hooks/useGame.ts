"use client"

import { useEffect, useState } from "react"
import { questions } from "../domain/quiz.entity"
import { audioManager } from "../utils/sound"
import { saveScore } from "../utils/leaderBoard"

export function useGame(player: string) {

	const [current, setCurrent] = useState(0)
	const [gameOver, setGameOver] = useState(false)
	const [finished, setFinished] = useState(false)
	const [answersToShow, setAnswersToShow] = useState(questions[0].answers)

	const [used5050, setUsed5050] = useState(false)
	const [usedAudience, setUsedAudience] = useState(false)

	const question = questions[current]
	const money = question.money || 0

	// =========================
	// TRẢ LỜI CÂU HỎI
	// =========================
	const [answerSai, setAnswerSai] = useState<number | null>(null);
	const [correctIndex, setCorrectIndex] = useState<number | null>(null);
	function answer(index: number) {
		if (answersToShow[index] === undefined) return;
		const isCorrect = question.answers.indexOf(answersToShow[index]) === question.correct;
		// stop thinking sound
		audioManager.stopAll();
		if (isCorrect) {
			audioManager.play("correct");
		} else {
			audioManager.play("wrong");
			setAnswerSai(index);
			// Tìm index đáp án đúng trong answersToShow
			const correctInShow = answersToShow.findIndex(a => a === question.answers[question.correct]);
			setCorrectIndex(correctInShow);
		}
		setTimeout(() => {
			if (isCorrect) {
				setAnswerSai(null);
				setCorrectIndex(null);
				if (current + 1 < questions.length) {
					const next = current + 1;
					setCurrent(next);
					setAnswersToShow(questions[next].answers);
					// play thinking sound next question
					audioManager.stopAll();
					audioManager.play("thinking");
				} else {
					saveScore(player, questions.length);
					setFinished(true);
					audioManager.stopAll();
					audioManager.play("win");
				}
			} else {
				saveScore(player, current);
				audioManager.stopAll();
				audioManager.play("lose");
				setGameOver(true);
			}
		}, 1500);
	}

	// =========================
	// 50:50
	// =========================
	function use5050() {

		if (used5050) return

		setUsed5050(true)

		audioManager.play("lifeline")

		const correctIdx = question.correct

		const wrongs = question.answers
			.map((a, i) => i)
			.filter(i => i !== correctIdx)

		const randomWrongIdx =
			wrongs[Math.floor(Math.random() * wrongs.length)]

		const twoAnswers = [
			question.answers[correctIdx],
			question.answers[randomWrongIdx],
		]

		setAnswersToShow(twoAnswers.sort(() => 0.5 - Math.random()))
	}

	// =========================
	// HỎI KHÁN GIẢ
	// =========================
	function useAudience() {

		if (usedAudience) return

		setUsedAudience(true)

		audioManager.play("lifeline")

		alert("Khán giả chọn: " + question.answers[question.correct])
	}

	// =========================
	// RESET ANSWERS KHI QUA CÂU
	// =========================
	useEffect(() => {
		setAnswersToShow(questions[current].answers)
	}, [current])

	return {
		question,
		current,
		gameOver,
		finished,
		money,
		answer,
		use5050,
		useAudience,
		answersToShow,
		setGameOver,
		answerSai,
		correctIndex,
	}
}