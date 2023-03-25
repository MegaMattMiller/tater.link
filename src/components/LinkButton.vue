<template>
  <a :href="data.url" target="_blank" tabindex="0" :alt="data.text" :style="{ color: color }" class="hvr-grow">
    <div class="button-wrapper">
      <p class="button-text">
        {{ data.text }}
      </p>
    </div>
  </a>
</template>

<script setup lang="ts">
import type { Button } from '@/types';
defineProps<{
  data: Button;
  color: string;
}>();
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');

a {
  text-decoration: none;
}

p {
  margin: 0;
}

.button-wrapper {
  vertical-align: middle;
  width: 80vw;
  max-width: 500px;
  height: auto;
  min-height: 50px;
  max-height: 80px;
  border-style: solid;
  border-color: #f9f9f9;
  position: relative;
}

.button-wrapper p {
  width: 100%;
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
.button-text {
  font-family: 'Karla', sans-serif;
  text-align: center;
  color: #f9f9f9;
  font-size: clamp(20px, 8vw, 30px);
  vertical-align: baseline;
}
</style>
