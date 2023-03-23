<template>
  <div class="container" :style="{ backgroundColor: '#' + data?.bgColor, backgroundImage: gradientFactory }">
    <img :src="imagePath" class="avatar nodrag" alt="User Avatar" />
    <h1 class="username nodrag">{{ data?.displayName }}</h1>
    <h2 v-if="data?.desc != ''" class="desc nodrag">{{ data?.desc }}</h2>
    <div class="social-container" v-if="data?.linksOnTop">
      <SocialBadge v-for="(item, index) in data.links" v-bind:key="index" :data="item" />
    </div>
    <div class="button-container" v-if="showButtons">
      <LinkButton v-for="(item, index) in data?.buttons" v-bind:key="index" :data="item" />
    </div>
    <div class="social-container" v-if="!data?.linksOnTop">
      <SocialBadge v-for="(item, index) in data?.links" v-bind:key="index" :data="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type { UserData } from '@/types';
import SocialBadge from '@/components/SocialBadge.vue';
import LinkButton from '@/components/LinkButton.vue';
import { GradientDirections } from '@/utils/enums';

// const props = defineProps(['data']);

const props = defineProps({
  data: {
    type: Object as PropType<UserData | undefined>,
    required: true,
  },
});

const imagePath = computed(() => {
  return `/avatars/${props.data?.iconGuid}.png`;
});

const showButtons = computed(() => {
  if (props.data?.buttons.length ?? 0 > 0) return true;
  return false;
});

const gradientFactory = computed(() => {
  let direction = 'to bottom';
  switch (props.data?.gradient) {
    case GradientDirections.toBottom:
      direction = 'to bottom';
      break;
    case GradientDirections.toRight:
      direction = 'to right';
      break;
    case GradientDirections.toTop:
      direction = 'to top';
      break;
    case GradientDirections.toLeft:
      direction = 'to left';
      break;
    default:
      direction = 'to bottom';
      break;
  }
  return `linear-gradient(${direction}, #${props.data?.bgColor}, #${props.data?.bgColorAlt})`;
});
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
  width: 100%;
}

.social-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.button-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 20px;
}
</style>
