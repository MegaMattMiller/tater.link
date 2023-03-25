<template>
  <a :href="data.url" target="_blank" :aria-label="altTextFactory">
    <Icon class="social nodrag hvr-grow" :style="{ color: color }" :icon="iconData" />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Link } from '@/types';
import { SocialTypes } from '@/utils/enums';
import { Icon } from '@iconify/vue';

const props = defineProps<{
  data: Link;
  color: string;
}>();

const iconData = computed(() => {
  console.log('icon ', props.data.icon);
  switch (props.data.icon.toString()) {
    case SocialTypes.Twitter:
      return 'fa6-brands:twitter';
    case SocialTypes.Instagram:
      return 'fa6-brands:instagram';
    case SocialTypes.YouTube:
      return 'fa6-brands:youtube';
    case SocialTypes.Patreon:
      return 'fa6-brands:patreon';
    case SocialTypes.Twitch:
      return 'fa6-brands:twitch';
    case SocialTypes.Email:
      return 'fa6-regular:envelope';
    case SocialTypes.Mastodon:
      return 'fa6-brands:mastodon';
    default:
      return 'bi:globe';
  }
});

const altTextFactory = computed(() => {
  switch (props.data.icon) {
    case SocialTypes.Twitter:
      return 'Link to Twitter';
    case SocialTypes.Instagram:
      return 'Link to Instagram';
    case SocialTypes.YouTube:
      return 'Link to YouTube';
    case SocialTypes.Patreon:
      return 'Link to Patreon';
    case SocialTypes.Twitch:
      return 'Link to Twitch';
    case SocialTypes.Email:
      return 'Link to Email';
    case SocialTypes.Mastodon:
      return 'Link to Mastodon';
    default:
      return 'Link to Website';
  }
});
</script>

<style scoped>
.social {
  font-size: clamp(20px, 10vw, 40px);
  text-align: center;
}
</style>
