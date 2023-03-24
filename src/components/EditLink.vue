<template>
  <FormKit type="group">
    <FormKit type="text" label="Link URL" name="url" validation="required" />
  </FormKit>
</template>

<script setup lang="ts">
const props = defineProps(['linkData']);
</script>

<style lang="scss" scoped></style>
