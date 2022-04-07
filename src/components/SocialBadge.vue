<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps(['data']);

const iconData = computed(() => {
  switch (props.data.icon) {
    case 0:
      return ['fab', 'twitter'];
    case 1:
      return ['fab', 'instagram'];
    case 2:
      return ['fab', 'youtube'];
    case 3:
      return ['fab', 'patreon'];
    case 4:
      return ['fab', 'twitch'];
    case 5:
      return ['fas', 'envelope'];
    default:
      return ['fas', 'otter'];
  }
});

const altTextFactory = computed(() => {
  switch (props.data.icon) {
    case 0:
      return 'Link to Twitter';
    case 1:
      return 'Link to Instagram';
    case 2:
      return 'Link to YouTube';
    case 3:
      return 'Link to Patreon';
    case 4:
      return 'Link to Twitch';
    case 5:
      return 'Link to Email';
    default:
      return 'Link to Website';
  }
});
</script>

<template>
  <a :href="props.data.url" target="_blank">
    <font-awesome-icon class="social nodrag hvr-grow" :icon="iconData" />
  </a>
</template>

<style scoped>
.social {
  color: #f9f9f9;
  font-size: clamp(20px, 10vw, 40px);
  text-align: center;
}
</style>
