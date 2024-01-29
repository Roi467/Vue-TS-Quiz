<script setup lang="ts">
import type { QuestionCard } from '@/types/QuestionCard'

const props = defineProps<QuestionCard>()
// todo: try to change it to functional component
</script>

<template>
  <div class="question-card">
    <p class="number">Question: {{ props.questionNr / props.totalQuestions }}</p>
    <p>{{ props.question }}</p>
    <div>
      <div v-for="(answer, idx) in props.answers" :key="idx">
        <button
          @click="props.callback(answer)"
          :class="{
            correct: userAnswer?.correctAnswer === answer,
            clicked: userAnswer?.answer === answer
          }"
        >
          {{ answer }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>
