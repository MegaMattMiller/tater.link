<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { linkStore } from '@/stores/linkStore'
import { useRoute } from 'vue-router'

const store = linkStore()
const route = useRoute()
let loading = ref(true)

onBeforeMount(() => {
  store.getData(route.params.username as string).then(() => {
    loading.value = false
  })
})

const imagePath = computed(() => {
  return `/avatars/${store.data.iconGuid}.png`
})
</script>

<template>
  <div
    v-if="!loading"
    class="container"
    :style="{ backgroundColor: '#' + store.data.bgColor }"
  >
    <img :src="imagePath" class="avatar nodrag" />
    <h1 class="username nodrag">{{ store.data.displayName }}</h1>
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
