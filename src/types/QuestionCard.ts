export type QuestionCard = {
  question: string
  answers: string[]
  callback: any
  userAnswer: string | undefined
  questionNr: number
  totalQuestions: number
}

export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'multiple' | 'boolean'

export interface QuestionsState {
  type: QuestionType
  difficulty: Difficulty
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}
