<script lang="ts">
import { onBeforeMount, ref } from "vue";
import { linkStore } from "@/stores/linkStore";
import { useRoute } from 'vue-router'

export default {
  asyncData({ $pinia }) {
    const store = linkStore($pinia)
  },
  setup() {
    const store = linkStore()
    const route = useRoute()
    let loading = ref(true)
    onBeforeMount(() => {
      store.getData(route.params.username as string).then(() => {
        loading = false
      })
    });
    return { store }
  },
  computed: {
    imagePath() {
      return `/avatars/${this.store.data.iconGuid}.png`;
    },
  }
};
</script>

<template>
  <div v-if="!loading" class="container" :style="{backgroundColor: '#' + store.data.bgColor}">
    <img :src="imagePath" class="avatar" />
    <h1 class="username">{{ store.data.displayName }}</h1>
  </div>
</template>

<style>
.avatar {
  width: 100px;
  height: auto;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 20px;
}

.username {
  text-align: center;
  margin-top: 20px;
  color: #f9f9f9
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
</style>
