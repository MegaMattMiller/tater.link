<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';
import { linkStore } from '@/stores/linkStore';
import { useRoute, useRouter } from 'vue-router';
import SocialBadge from '@/components/SocialBadge.vue';

const store = linkStore();
const route = useRoute();
const router = useRouter();
let loading = ref(true);

onBeforeMount(() => {
  store.getData(route.params.username as string).then(() => {
    if (store.data == undefined) router.push('/nouser');
    loading.value = false;
  });
});

const imagePath = computed(() => {
  return `/avatars/${store.data.iconGuid}.png`;
});

const gradientFactory = computed(() => {
  let direction = 'to bottom'
  switch(store.data.gradient) {
    case 0:
      direction = 'to bottom';
      break;
    case 1:
      direction = 'to right';
      break;
    case 2:
      direction = 'to top';
      break;
    case 3:
      direction = 'to left';
      break;
    default:
      direction = 'to bottom';
      break;
  }
  return `linear-gradient(${direction}, #${store.data.bgColor}, #${store.data.bgColorAlt})`;
});
</script>

<template>
  <div v-if="!loading" class="container" :style="{ backgroundColor: '#' + store.data.bgColor, backgroundImage: gradientFactory }">
    <img :src="imagePath" class="avatar nodrag" alt="User Avatar" />
    <h1 class="username nodrag">{{ store.data.displayName }}</h1>
    <div class="social-container">
      <SocialBadge v-for="(item, index) in store.data.links" v-bind:key="index" :data="item" />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');

.nodrag {
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

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
}

.social-container {
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
