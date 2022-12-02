<template>
  <div class="w-full h-full p-4 flex justify-center items-center">
    <div class="max-w-xs w-full flex flex-col">
      <div v-if="setup" data-qa="setup" class="w-3/4 p-4 rounded-2xl bg-teal-800 text-white self-start">
        {{ setup }}
      </div>
      <div
        v-if="delivery && isDeliveryVisible"
        data-qa="delivery"
        class="w-3/4 mt-2 p-4 rounded-2xl bg-red-800 text-white self-end"
      >
        {{ delivery }}
      </div>
      <button
        v-if="isDeliveryVisible"
        class="w-full bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center mx-auto mt-4"
        @click="loadJoke"
      >
        Another
      </button>
      <button
        v-else-if="setup"
        class="w-full bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center mx-auto mt-4"
        @click="showDelivery"
      >
        Tell Me!
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const setup = ref(null)
const delivery = ref(null)
const isDeliveryVisible = ref(false)

const showDelivery = () => {
  isDeliveryVisible.value = true
}

const loadJoke = async () => {
  isDeliveryVisible.value = false
  setup.value = null
  delivery.value = null

  try {
    const data = await fetch('https://v2.jokeapi.dev/joke/christmas').then(response => response.json())
    setup.value = data.setup
    delivery.value = data.delivery
  } catch (error) {
    console.error(error)
    alert('Something went wrong!')
  }
}

loadJoke()
</script>
