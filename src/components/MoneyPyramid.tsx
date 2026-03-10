"use client"

import { questions } from "../domain/quiz.entity";

export default function MoneyPyramid({ current }: { current: number }) {
	return (
		<div className="w-60 bg-black border-l border-gray-700 p-6 flex flex-col justify-center">
			<h2 className="text-yellow-400 text-center font-bold mb-4">💰 Bảng tiền</h2>
			<ul className="space-y-2">
				   {[...questions].reverse().map((q, i) => {
					   const idx = questions.length - 1 - i;
					   const money = typeof q.money === "number" && !isNaN(q.money) ? q.money : 0;
					   return (
						   <li
							   key={idx}
							   className={`text-center py-2 rounded ${idx === current ? "bg-yellow-500 text-black font-bold" : "bg-gray-800"}`}
						   >
							   {money.toLocaleString()} đ
						   </li>
					   );
				   })}
			</ul>
		</div>
	);
}