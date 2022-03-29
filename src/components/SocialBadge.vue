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
    default:
      return 'Link to Website';
  }
});
</script>

<template>
  <a :href="props.data.url" target="_blank" tabindex="0" :alt="altTextFactory">
    <font-awesome-icon class="social nodrag" :icon="iconData" />
  </a>
</template>

<style scoped>
.social {
  color: #f9f9f9;
  font-size: clamp(20px, 10vw, 40px);
  text-align: center;
}
</style>
