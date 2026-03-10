"use client"

import { useState } from "react"
import StartScreen from "../components/StartScreen"
import GameBoard from "../components/GameBoard"

export default function Page(){

	const [player, setPlayer] = useState<string | null>(null);
	// Hàm exit: quay về trang đầu, reset trạng thái
	function handleExit() {
		setPlayer(null);
	}

	if (!player) {
		return <StartScreen onStart={setPlayer} />;
	}
	if (player === "__admin__") {
		const AdminScreen = require("../components/AdminScreen").default;
		return <AdminScreen onExit={handleExit} />;
	}
	return <GameBoard player={player} onExit={handleExit} />;
}