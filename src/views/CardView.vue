<template>
  <div v-if="!loading">
    <UserCard :data="data" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { linkStore } from '@/stores/linkStore';
import { useRoute, useRouter } from 'vue-router';

import UserCard from '@/components/UserCard.vue';

const store = linkStore();
const route = useRoute();
const router = useRouter();
let loading = ref(true);

const { data } = storeToRefs(store);

async function getData() {
  await store.getDataForCardName(route.params.username as string);
  if (data.value == null || data.value == undefined) router.push(`/nouser/${route.params.username}`);
  loading.value = false;
}

getData();
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');

body {
  overflow-x: hidden;
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 20px;
}

.username {
  font-family: 'Karla', sans-serif;
  text-align: center;
  color: #f9f9f9;
  margin-bottom: 10px;
}

.desc {
  font-family: 'Karla', sans-serif;
  text-align: center;
  margin-top: 0;
  color: #f9f9f9;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
}

.social-container {
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.button-container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 20px;
}
</style>
