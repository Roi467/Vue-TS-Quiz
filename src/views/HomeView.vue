<script setup lang="ts">
import { fetchQuizQuestions } from '@/API'
import QuestionCard from '@/components/QuestionCard.vue'
import type { QuestionState, AnswerObject } from '@/types/QuestionCard'
import { Difficulty } from '@/enums/Question'

import { ref } from 'vue'
</script>

<template>
  <main>
    <button
      class="start"
      @click="startTrivia"
      v-if="gameOver || userAnswers.length === questions.length"
    >
      Start
    </button>

    <p class="score" v-if="!gameOver && !loading">Score: {{ score }}</p>

    <p v-if="loading">Loading Questions ...</p>

    <QuestionCard
      v-if="questions[questionIdx]"
      :questionNr="questionIdx + 1"
      :totalQuestions="TOTAL_QUESTIONS"
      :question="questions[questionIdx].question"
      :answers="[
        ...questions[questionIdx].incorrect_answers,
        questions[questionIdx].correct_answer
      ]"
      :userAnswer="userAnswers[questionIdx] ? userAnswers[questionIdx] : undefined"
      :callback="checkAnswer"
    />

    <button
      v-if="questions[questionIdx + 1] && userAnswers[questionIdx]"
      class="next"
      @click="nextQuestion"
    >
      Next Question
    </button>
  </main>
</template>

<script lang="ts">
const TOTAL_QUESTIONS = 10

const loading = ref(false)
const questions = ref([] as QuestionState[])
const questionIdx = ref(0)
const userAnswers = ref([] as AnswerObject[])
const score = ref(0)
const gameOver = ref(true)

const startTrivia = async () => {
  loading.value = true
  gameOver.value = false
  score.value = 0
  questionIdx.value = 0
  userAnswers.value = []

  try {
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    questions.value = newQuestions
    loading.value = false
  } catch (error) {
    console.error(error)
  }
}

const getCurrentQuestion = () => {
  const current = questions.value.filter((v, idx) => idx === questionIdx.value)

  return current ? current[0] : null
}

const isAlreadyAnswered = (question: string): boolean => {
  const flag = userAnswers.value.filter((v) => v.question === question)

  return !!flag.length
}

const nextQuestion = (): void => {
  gameOver.value = questionIdx.value + 1 === TOTAL_QUESTIONS

  if (gameOver.value) {
    return
  }

  questionIdx.value = questionIdx.value + 1
}

const checkAnswer = (answer: string): void => {
  if (gameOver.value) return

  const currentQuestion = getCurrentQuestion()

  // we don't have this question
  if (!currentQuestion) return

  // can't answer twice
  if (isAlreadyAnswered(currentQuestion.question)) return

  const correct = currentQuestion.correct_answer === answer

  if (correct) {
    score.value = score.value + 1
  }

  userAnswers.value.push({
    question: currentQuestion.question,
    correctAnswer: currentQuestion.correct_answer,
    answer,
    correct
  })
}
</script>
