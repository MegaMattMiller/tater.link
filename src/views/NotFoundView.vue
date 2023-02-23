<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const name = computed(() => {
  let username = '';
  if (route.params.username == undefined) {
    username = 'No user found';
  } else {
    username = `User ${route.params.username} not found`;
  }
  return username;
});
</script>

<template>
  <main class="container">
    <h1 class="username">{{ name }}</h1>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');

.avatar {
  width: 100px;
  height: auto;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 20px;
}

.username {
  font-family: 'Karla', sans-serif;
  text-align: center;
  margin-top: 20px;
  color: #f9f9f9;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: black;
}
</style>
