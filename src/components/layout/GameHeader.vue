<script setup>
defineProps({
  numOfAttempts: Number,
  totalScore: Number
})

const emit = defineEmits(['openInstructionsModal'])

function showModal() {
  emit('openInstructionsModal')
}

</script>

<template>
  <header class="gameHeader">
    <div class="gameHeader__inner">
      <h1 class="gameHeader__title">Memory League</h1>
      <ul class="gameHeader__controls">
        <li class="gameHeader__controls-listItem">Attempts: {{ numOfAttempts }}</li>
        <li class="gameHeader__controls-listItem">Score: {{ totalScore }}</li>
        <li class="gameHeader__controls-button" @click="showModal">How to Play</li>
      </ul>
    </div>
  </header>
</template>
