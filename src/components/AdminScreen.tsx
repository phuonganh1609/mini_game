"use client"

import { useEffect, useState } from "react";
import { clearLeaderboard } from "../utils/leaderBoard";
import { RefreshCw, Trash2, LogOut } from "lucide-react";

import { db } from "../utils/firebase";
import { collection, onSnapshot } from "firebase/firestore";

type Score = {
  name: string
  score: number
}

export default function AdminScreen({ onExit }: { onExit: () => void }) {

  const [users, setUsers] = useState<Score[]>([])
  const [status, setStatus] = useState<"connected" | "disconnected">("connected")

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "leaderboard"),
      (snapshot) => {

        const scores: Score[] = []

        snapshot.forEach((doc) => {
          scores.push(doc.data() as Score)
        })

        scores.sort((a, b) => b.score - a.score)

        setUsers(scores)
        setStatus("connected")
      },
      () => {
        setStatus("disconnected")
      }
    )

    return () => unsubscribe()

  }, [])

  async function handleClear() {
    await clearLeaderboard()
  }

  function getMedal(index:number){
    if(index===0) return "🥇"
    if(index===1) return "🥈"
    if(index===2) return "🥉"
    return `#${index+1}`
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-blue-950 text-white">

      <h1 className="text-5xl mb-8 text-yellow-400 font-extrabold text-center">
        ADMIN DASHBOARD
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">

          <h2 className="text-xl font-semibold text-yellow-400">
            Leaderboard
          </h2>

          <div className="flex items-center gap-3">

            {/* Player count */}
            <span className="text-xs text-gray-300">
              Players: {users.length}
            </span>

            {/* Connection status */}
            <span className="text-xs font-medium">
              {status === "connected"
                ? <span className="text-green-400">🟢 Online</span>
                : <span className="text-red-400">🔴 Offline</span>
              }
            </span>

            {/* Buttons */}
            <div className="flex gap-2">

              <button
                onClick={handleClear}
                className="bg-orange-500 hover:bg-orange-400 p-2 rounded-md transition shadow"
                title="Xóa leaderboard"
              >
                <Trash2 size={16}/>
              </button>

              <button
                onClick={onExit}
                className="bg-red-600 hover:bg-red-500 p-2 rounded-md transition shadow"
                title="Thoát"
              >
                <LogOut size={16}/>
              </button>

            </div>

          </div>

        </div>

        {/* Leaderboard */}
        <ul className="space-y-2">

          {users.length === 0 && (
            <li className="text-gray-400 text-sm">
              Chưa có người chơi nào
            </li>
          )}

          {users.map((u, i) => (

            <li
              key={i}
              className={`flex justify-between items-center py-2 px-3 rounded text-sm transition-all duration-300
              ${i === 0 ? "bg-yellow-500/20" : ""}
              ${i === 1 ? "bg-gray-400/10" : ""}
              ${i === 2 ? "bg-orange-500/10" : ""}
              `}
            >

              <div className="flex items-center gap-2">

                <span className="text-lg">
                  {getMedal(i)}
                </span>

                <span className="font-medium">
                  {u.name}
                </span>

              </div>

              <span className="text-yellow-400 font-semibold">
                {u.score}
              </span>

            </li>

          ))}

        </ul>

      </div>

    </div>
  )
}