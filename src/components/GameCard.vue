<script setup>
defineProps({
  card: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['flipCard'])

function clickCard(card) {
  emit('flipCard', card)
}
</script>

<template>
  <div @click="clickCard(card)" class="card">
    <div class="card__inner" :class="{ 'card__flip': card.flipped }">
      <div class="card__flip-front">
        <img class="card__image" :src="'/images/default.png'" />
      </div>
      
      <div :class="{'card__flip card__flip-back': card.flipped }">
        <img class="card__image" :src="card.image" />
      </div>
      
    </div>
  </div>
</template>
