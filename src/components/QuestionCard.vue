<script setup lang="ts">
import type { QuestionCard } from '@/types/QuestionCard'

const props = defineProps<QuestionCard>()
// todo: try to change it to functional component
</script>

<template>
  <p class="number">Question: {{ props.questionNr / props.totalQuestions }}</p>
  <p>{{ props.question }}</p>
  <div>
    <div v-for="(answer, idx) in props.answers" :key="idx">
      <button @click="props.callback(answer)">
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script lang="ts"></script>
