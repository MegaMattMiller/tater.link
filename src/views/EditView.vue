<template>
  <NavBar class="nav-bar" />
  <div class="wrapper">
    <div class="editor">
      <input placeholder="username" v-model="newDisplayName" />
      <input placeholder="desc" v-model="newDesc" />
      <button @click="handleTestSave">test save</button>
    </div>
    <UserCard v-if="!loading" :data="data" class="card" />
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { useRouter, useRoute } from 'vue-router';
import { onBeforeUnmount, ref, watch } from 'vue';
import { linkStore } from '@/stores/linkStore';
import { storeToRefs } from 'pinia';

import NavBar from '@/components/NavBar.vue';
import UserCard from '@/components/UserCard.vue';

const store = linkStore();
const route = useRoute();
const router = useRouter();
const loggedInUser = ref<User | null>(null);
let loading = ref(true);

let newDisplayName = ref('');
let newDesc = ref('');

watch(newDisplayName, (newVal) => {
  if (data.value != undefined) {
    data.value.displayName = newVal;
  }
});

watch(newDesc, (newVal) => {
  if (data.value != undefined) {
    data.value.desc = newVal;
  }
});

const { data } = storeToRefs(store);

async function getData() {
  await store.getDataForUserUID(loggedInUser.value?.uid.toString() ?? '');
  if (data.value == null || data.value == undefined) router.push(`/`);

  newDisplayName.value = data.value?.displayName ?? '';
  newDesc.value = data.value?.desc ?? '';
  loading.value = false;
}

const authListener = onAuthStateChanged(getAuth(), function (user) {
  loggedInUser.value = user;
  if (!user) {
    // not logged in
    alert('you must be logged in to view this. redirecting to the home page');
    router.push('/');
  }
  getData();
});

onBeforeUnmount(() => {
  // clear up listener
  authListener();
});

async function handleTestSave() {
  await store.updateCardForUserUID(loggedInUser.value?.uid.toString() ?? '');
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 300px 1fr;
}

.editor {
  background-color: gray;
}

.card {
  width: 100%;
}
</style>
