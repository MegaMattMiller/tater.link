<template>
  <main>
    <NavBar />
    <UserCard v-if="!loading && isLoggedIn" class="card" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { storeToRefs } from 'pinia';
import { linkStore } from '@/stores/linkStore';
import { useRouter } from 'vue-router';

import NavBar from '@/components/NavBar.vue';
import UserCard from '@/components/UserCard.vue';

const store = linkStore();
const router = useRouter();
const loggedInUser = ref<User | null>(null);
const isLoggedIn = ref(false);
let loading = ref(true);

const { data } = storeToRefs(store);

onAuthStateChanged(getAuth(), function (user) {
  if (user) {
    isLoggedIn.value = true;
    loggedInUser.value = user;
    getDataForUser();
  } else {
    isLoggedIn.value = false;
  }
});

async function getDataForUser() {
  await store.getDataForUserUID(loggedInUser.value?.uid.toString() ?? '');
  if (data.value == null || data.value == undefined) router.push(`/`);
  loading.value = false;
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.card {
  @include drop-shadow;
  @include rounded-corners;
  max-width: 700px;
  width: 100%;
  margin: 20px auto;
  padding: 20px;
}
</style>
