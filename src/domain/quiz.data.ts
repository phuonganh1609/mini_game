"use client"

export type Question = {
  question: string
  answers: string[]
  correct: number
  money?: number
}