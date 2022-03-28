<script lang="ts">
import { onBeforeMount } from "vue";
import { linkStore } from "@/stores/linkStore";

export default {
  setup() {
    onBeforeMount(() => {
      const mainStore = linkStore();
      mainStore.getData("tater");
    });
  },
};
</script>

<template>
  <div class="about">
    <h1>{{ $route.params.username }}</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
