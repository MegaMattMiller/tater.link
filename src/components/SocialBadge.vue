<template>
  <a :href="data.url" target="_blank" :aria-label="altText(data.icon_id)">
    <Icon class="social nodrag hvr-grow" :style="{ color: color }" :icon="iconData(data.icon_id)" />
  </a>
</template>

<script setup lang="ts">
import type { Link } from '@/types';
import { iconFactory, altTextFactory } from '@/utils/transformers';
import { Icon } from '@iconify/vue';

const props = defineProps<{
  data: Link;
  color: string;
}>();

function iconData(id: string) {
  return iconFactory(id);
}

function altText(id: string) {
  return altTextFactory(id);
}
</script>

<style scoped>
.social {
  font-size: clamp(20px, 10vw, 40px);
  text-align: center;
}
</style>
