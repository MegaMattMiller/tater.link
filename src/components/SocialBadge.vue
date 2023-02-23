<template>
  <a :href="data.url" target="_blank" :aria-label="altTextFactory">
    <font-awesome-icon class="social nodrag hvr-grow" :icon="iconData" />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Link } from '../stores/linkStore';
import { SocialTypes } from '../utils/enums';

const props = defineProps<{
  data: Link;
}>();

const iconData = computed(() => {
  switch (props.data.icon) {
    case SocialTypes.Twitter:
      return ['fab', 'twitter'];
    case SocialTypes.Instagram:
      return ['fab', 'instagram'];
    case SocialTypes.YouTube:
      return ['fab', 'youtube'];
    case SocialTypes.Patreon:
      return ['fab', 'patreon'];
    case SocialTypes.Twitch:
      return ['fab', 'twitch'];
    case SocialTypes.Email:
      return ['fas', 'envelope'];
    default:
      return ['fas', 'otter'];
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
    default:
      return 'Link to Website';
  }
});
</script>

<style scoped>
.social {
  color: #f9f9f9;
  font-size: clamp(20px, 10vw, 40px);
  text-align: center;
}
</style>
