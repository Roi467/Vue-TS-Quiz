import type { Difficulty } from '@/enums/Question'

export type QuestionCard = {
  question: string
  answers: string[]
  callback: any
  userAnswer: string | undefined
  questionNr: number
  totalQuestions: number
}

export type QuestionType = 'multiple' | 'boolean'

// question from API
export interface Question {
  type: QuestionType
  difficulty: Difficulty
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type QuestionState = Question & { answers: string[] }
