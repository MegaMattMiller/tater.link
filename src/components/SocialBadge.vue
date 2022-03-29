<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps(['data']);

const iconData = computed(() => {
  switch (props.data.icon) {
    case 0:
      return ['fab', 'twitter'];
    case 1:
      return ['fab', 'instagram'];
    default:
      return ['fas', 'otter'];
  }
});
</script>

<template>
  <a :href="props.data.url" target="_blank">
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
