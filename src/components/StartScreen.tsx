"use client"

import { useState, useEffect } from "react"
import { audioManager } from "../utils/sound"

export default function StartScreen({ onStart }: { onStart: (name: string) => void }) {

	const [name, setName] = useState("");
	const [touched, setTouched] = useState(false);
	const [audioReady, setAudioReady] = useState(false);

	const valid = name.trim().length >= 2;

	// Đợi user click lần đầu để bật audio
	useEffect(() => {

		const enableAudio = () => {

			audioManager.init()
			audioManager.stopAll()
			audioManager.play("welcome")

			setAudioReady(true)

			window.removeEventListener("click", enableAudio)
		}

		window.addEventListener("click", enableAudio)

		return () => window.removeEventListener("click", enableAudio)

	}, [])

	function handleStart() {

		if (!valid) return

		audioManager.stopAll()

		if (name.trim().toLowerCase() === "admin") {
			onStart("__admin__")
		} else {
			onStart(name.trim())
		}
	}

	return (

		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-blue-950 text-white">

			<h1 className="text-5xl mb-8 text-yellow-400 drop-shadow-lg font-extrabold text-center">
				AI LÀ TRIỆU PHÚ
			</h1>

			<div className="bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col items-center w-full max-w-xs">

				<div className="mb-4 text-sm text-gray-300 text-center">
					Nhập tên để bắt đầu chơi<br />
					<span className="text-xs text-gray-400">Tên phải có ít nhất 2 ký tự.</span>
				</div>

				<input
					placeholder="Nhập tên của bạn"
					value={name}
					onChange={e => {
						setName(e.target.value)
						setTouched(true)
					}}
					className="px-4 py-2 text-white rounded mb-2 w-full text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
					maxLength={20}
					autoFocus
				/>

				{!valid && touched && (
					<div className="text-red-400 mb-2 text-xs w-full text-center">
						Tên phải có ít nhất 2 ký tự
					</div>
				)}

				<button
					onClick={handleStart}
					disabled={!valid}
					className={`bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold text-lg shadow transition w-full ${valid ? "hover:bg-yellow-400" : "opacity-50 cursor-not-allowed"}`}
				>
					Đăng nhập
				</button>

				{!audioReady && (
					<div className="text-xs text-gray-400 mt-3">
						Click vào màn hình để bật âm thanh
					</div>
				)}

			</div>

		</div>
	)
}