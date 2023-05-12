<template>
  <div v-if="!loading">
    <UserCard class="card" />
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

.card {
  min-height: 100vh;
}
</style>
