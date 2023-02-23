<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';
import { linkStore } from '@/stores/linkStore';
import { useRoute, useRouter } from 'vue-router';
import SocialBadge from '@/components/SocialBadge.vue';
import LinkButton from '@/components/LinkButton.vue';

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
  return `/avatars/${store.data?.iconGuid}.png`;
});

const showButtons = computed(() => {
  if (store.data?.buttons.length ?? 0 > 0) return true;
  return false;
});

const gradientFactory = computed(() => {
  let direction = 'to bottom';
  switch (store.data?.gradient) {
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
  return `linear-gradient(${direction}, #${store.data?.bgColor}, #${store.data?.bgColorAlt})`;
});
</script>

<template>
  <div
    v-if="!loading"
    class="container"
    :style="{ backgroundColor: '#' + store.data?.bgColor, backgroundImage: gradientFactory }"
  >
    <img :src="imagePath" class="avatar nodrag" alt="User Avatar" />
    <h1 class="username nodrag">{{ store.data?.displayName }}</h1>
    <h2 v-if="store.data?.desc != ''" class="desc nodrag">{{ store.data?.desc }}</h2>
    <div class="social-container" v-if="store.data?.linksOnTop">
      <SocialBadge v-for="(item, index) in store.data.links" v-bind:key="index" :data="item" />
    </div>
    <div class="button-container" v-if="showButtons">
      <LinkButton v-for="(item, index) in store.data?.buttons" v-bind:key="index" :data="item" />
    </div>
    <div class="social-container" v-if="!store.data?.linksOnTop">
      <SocialBadge v-for="(item, index) in store.data?.links" v-bind:key="index" :data="item" />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');

body {
  overflow-x: hidden;
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
