<script setup lang="ts">
import QuestionCard from '@/components/QuestionCard.vue'
import type { QuestionsState } from '@/types/QuestionCard'

import { ref } from 'vue'
</script>

<template>
  <main>
    <button class="start" @click="startTrivia">Start</button>
    <p class="score">Score:</p>
    <p>Loading Questions ...</p>
    <QuestionCard
      v-if="questions[number]"
      :questionNr="number + 1"
      :totalQuestions="TOTAL_QUESTIONS"
      :question="questions[number].question"
      :answers="[...questions[number].incorrect_answers, questions[number].correct_answer]"
      :userAnswer="userAnswers[number] ? userAnswers[number] : undefined"
      :callback="checkAnswer"
    />
    <button v-if="questions[number + 1]" class="next" @click="nextQuestion">Next Question</button>
  </main>
</template>

<script lang="ts">
const TOTAL_QUESTIONS = 10

const loading = ref(false)
const questions = ref([] as QuestionsState[])
const number = ref(0)
const userAnswers = ref([])
const score = ref(0)
const gameOver = ref(true)

const startTrivia = () => {
  console.log('start')
}

const nextQuestion = () => {
  console.log('nextQuestion')
}

const checkAnswer = () => {
  console.log('checkAnswer')
}
</script>
