<template>
  <div class="close-icon" :style="iconStyle">
    <span></span>
    <span></span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

interface Props {
  size?: number
  color?: string
  darkColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
  color: '#d3531a',
  darkColor: '#FEFEFE' // default dark mode color
})

const isDarkMode = ref(false)

onMounted(() => {
  // Automatically detect system dark mode setting
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  isDarkMode.value = mediaQuery.matches

  // Listen for changes to dark mode setting
  mediaQuery.addEventListener('change', (e) => {
    isDarkMode.value = e.matches
  })
})

const iconStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`
}))

const currentColor = computed(() => isDarkMode.value ? props.darkColor : props.color)
</script>

<style scoped>
.close-icon {
  position: relative;
  margin: 50px auto;
}

.close-icon span {
  display: block;
  position: absolute;
  height: 10%;
  width: 100%;
  background: v-bind(currentColor);
  border-radius: 2px;
  opacity: 1;
  left: 0;
  top: 50%;
  transform-origin: center;
  transition: transform 0.5s ease-in-out;
}

.close-icon span:nth-child(1) {
  transform: translateY(-50%) rotate(0deg);
  animation: rotateFirst 0.3s forwards;
  animation-delay: 0.3s;
}

.close-icon span:nth-child(2) {
  transform: translateY(-50%) rotate(0deg);
  animation: rotateSecond 0.3s forwards;
  animation-delay: 0.3s;
}

@keyframes rotateFirst {
  to { transform: translateY(-50%) rotate(45deg); }
}

@keyframes rotateSecond {
  to { transform: translateY(-50%) rotate(-45deg); }
}
</style>
