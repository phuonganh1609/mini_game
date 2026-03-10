"use client"

import { useEffect, useState } from "react"
import { questions } from "../domain/quiz.entity"
import { playCorrect,playWrong } from "../utils/sound"
import { saveScore } from "../utils/leaderBoard"

export function useGame(player: string) {
	const [current, setCurrent] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [finished, setFinished] = useState(false);
	const [answersToShow, setAnswersToShow] = useState(questions[0].answers);
	const [used5050, setUsed5050] = useState(false);
	const [usedAudience, setUsedAudience] = useState(false);

	const question = questions[current];
	const money = question.money || 0;

	function answer(index: number) {
		if (answersToShow[index] === undefined) return;
		// Phát âm thanh ngay lập tức
		const isCorrect = question.answers.indexOf(answersToShow[index]) === question.correct;
		if (isCorrect) {
			playCorrect();
		} else {
			playWrong();
		}
		// Sau đó cập nhật state
		setTimeout(() => {
			if (isCorrect) {
				if (current + 1 < questions.length) {
					setCurrent(current + 1);
					setAnswersToShow(questions[current + 1].answers);
				} else {
					saveScore(player, questions.length);
					setFinished(true);
				}
			} else {
				saveScore(player, current);
				setGameOver(true);
			}
		}, 0);
	}

	function use5050() {
		if (used5050) return;
		setUsed5050(true);
		// Chỉ còn lại 2 đáp án: 1 đúng, 1 sai ngẫu nhiên
		const correctIdx = question.correct;
		const wrongs = question.answers.map((a, i) => i).filter(i => i !== correctIdx);
		const randomWrongIdx = wrongs[Math.floor(Math.random() * wrongs.length)];
		const twoAnswers = [question.answers[correctIdx], question.answers[randomWrongIdx]];
		// Shuffle để vị trí random
		setAnswersToShow(twoAnswers.sort(() => 0.5 - Math.random()));
	}

	function useAudience() {
		if (usedAudience) return;
		setUsedAudience(true);
		// Gợi ý khán giả: highlight đáp án đúng
		alert("Khán giả chọn: " + question.answers[question.correct]);
	}

	// Reset answersToShow khi đổi câu hỏi
	useEffect(() => {
		setAnswersToShow(question.answers);
	}, [current]);

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
	};
}