"use client"

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc
} from "firebase/firestore"

import { db } from "./firebase"

export type Score = {
  name: string
  score: number
}

export async function getLeaderboard(): Promise<Score[]> {

  const snapshot = await getDocs(collection(db, "leaderboard"))

  const scores: Score[] = []

  snapshot.forEach(doc => {
    scores.push(doc.data() as Score)
  })

  scores.sort((a,b)=>b.score-a.score)

  return scores.slice(0,10)
}

export async function saveScore(name:string,score:number){

  await addDoc(collection(db,"leaderboard"),{
    name,
    score
  })

}

export async function clearLeaderboard(){

  const snapshot = await getDocs(collection(db,"leaderboard"))

  for (const docItem of snapshot.docs){
    await deleteDoc(docItem.ref)
  }

}