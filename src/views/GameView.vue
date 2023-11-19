<script setup>
import GameCard from '@/components/GameCard.vue'
import GameHeader from '@/components/layout/GameHeader.vue'
import GameModal from '@/components/layout/GameModal.vue'
import { shuffleCards } from '@/service/gameLogic'
import { ref, watch } from 'vue'

const numOfAttempts = ref(5)

const totalScore = ref(0)

const showInstructionsModal = ref(false)

const showGameOverModal = ref(false)

const showGameWinModal = ref(false)

const cards = ref([])

cards.value = shuffleCards()

watch(numOfAttempts, () => {
  console.log('Numebr of Attempts -> ' + numOfAttempts.value)
  if (numOfAttempts.value === 0) {
    showGameOverModal.value = true
    console.log('Game Over!')
  }
})

watch(totalScore, () => {
  // showingGameWinModal.value = true
  console.log('Total Score -> ' + totalScore.value)
})

const cardPair = ref([])

watch(
  cardPair.value,
  (newPair) => {
    console.log('Watch Card Pair', newPair)
    if (newPair.length == 2) {
      console.log('Length is 2')
      matchCard(newPair)
      return
    }
  },
  { deep: true }
)

const matchCard = (newCardPair) => {
  if (newCardPair[0].id === newCardPair[1].id) {
    totalScore.value += numOfAttempts.value * 5
    numOfAttempts.value = 5
    setTimeout(() => {
      const pairedCards = cards.value.filter((pairedCard) => {
        return pairedCard.flipped === true
      })
      if (pairedCards.length === cards.value.length) {
        showGameWinModal.value = true
      }
      cardPair.value.length = 0
    }, 500)
  } else {
    console.log('Matched Card')
    setTimeout(() => {
      newCardPair.forEach((card) => (card.flipped = false))
      numOfAttempts.value--
      cardPair.value.length = 0
      console.log('Emplty card pair', cardPair.value.length)
    }, 1000)
  }
}

const handleCardClicked = (card, index) => {
  if (cardPair.value.length === 2 || card.flipped) {
    return
  }

  card.flipped = true

  if (cardPair.value.length < 2) {
    if (cardPair.value.length === 0) {
      card.index = index
      cardPair.value.push(card)
    } else {
      cardPair.value.forEach((pair) => {
        if (pair.index !== index) {
          cardPair.value.push(card)
        }
      })
    }
  }
}

const resetGame = () => {
  cards.value.forEach((card) => (card.flipped = false))
  cards.value = shuffleCards()
  numOfAttempts.value = 5
  totalScore.value = 0
}
</script>

<template>
  <GameHeader
    :numOfAttempts="numOfAttempts"
    :totalScore="totalScore"
    @openInstructionsModal="showInstructionsModal = true"
  />

  <div class="gameContainer">
    <div class="gameContainer__inner">
      <GameCard
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
        @flipCard="(card) => handleCardClicked(card, index)"
      />
    </div>
    <button class="gameContainer__reset" @click="resetGame()">
      Reset Game
    </button>
  </div>

  <Teleport to="body">
    <GameModal v-if="showInstructionsModal">
      <section>
        <div class="gameModal__container">
          <div class="gameModal__container-header">
            <h1 class="gameModal__container-title">Instructions</h1>
          </div>
          <ul class="gameModal__instructions--list">
            <li class="gameModal__instructions--listItem">
              This game consists of an even number of cards with footbal club logos at the back.
              Each football clun logo appears on precisely two cards.
            </li>
            <li class="gameModal__instructions--listItem">
              Click on a card to flip it, showing the football logo behind it. If you flip over two
              cards, having the same logo, they remain face up. Otherwise, the cards flip back over
              after a small period of time.
            </li>
            <li class="gameModal__instructions--listItem">
              The goal of the game is to get all the cards flipped face up (i.e., find all the
              matching logo pairs) in the least number of tries. That means that lower number of
              tries are better scores.
            </li>
            <li class="gameModal__instructions--listItem">
              You have a maximum of 5 tries(attempts) to get a matching pair of logos, after which
              the Game is Over
            </li>
            <li class="gameModal__instructions--listItem">
              Each correct pair has a base value of 5 points. Therefore your score is 5 multiplied
              by the number of attempts you had before getting a matching pair
            </li>
            <li class="gameModal__instructions--listItem">
              You win when you get the all the matching logo pairs in the cards flipped up
            </li>
          </ul>
          <button class="gameModal__button" @click="showInstructionsModal = false">Close</button>
        </div>
      </section>
    </GameModal>
  </Teleport>

  <Teleport to="body">
    <GameModal v-if="showGameOverModal">
      <section>
        <div class=" gameModal__container gameModal__gameover-background">
          <div class="gameModal__container-header">
            <h1 class="gameModal__container-title">Game Over!!!</h1>
          </div>
          <p class="gameModal__container-score">Your Score: {{ totalScore }}</p>
          <button class="gameModal__button" @click="resetGame(), (showGameOverModal = false)">
            Try Again
          </button>
        </div>
      </section>
    </GameModal>
  </Teleport>

  <Teleport to="body">
    <GameModal v-if="showGameWinModal">
      <section>
        <div class=" gameModal__container gameModal__gamewin-background">
          <div class="gameModal__container-header">
            <h1 class="gameModal__container-title">CONGRATULATIONS!!!</h1>
            <p class="gameModal__container-description">You Won!</p>
          </div>
          <p class="gameModal__container-score">Your Score: {{ totalScore }}</p>
          <button class="gameModal__button" @click="resetGame(), (showGameWinModal = false)">
            Play Again
          </button>
          <button class="gameModal__button" @click="showGameWinModal = false">Close</button>
        </div>
      </section>
    </GameModal>
  </Teleport>
</template>
