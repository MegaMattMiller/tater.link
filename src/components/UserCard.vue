<template>
  <div
    class="container"
    :style="{ backgroundColor: data?.bgColor, backgroundImage: gradientFactory, color: data?.textColor }"
    v-if="data != undefined"
  >
    <img :src="imagePathOrLocal" class="avatar nodrag" alt="User Avatar" />
    <h1 class="username nodrag">{{ data.displayName }}</h1>
    <h2 v-if="data?.desc != ''" class="desc nodrag">{{ data.desc }}</h2>
    <div class="social-container" v-if="data.linksOnTop">
      <SocialBadge v-for="(item, index) in data.links" v-bind:key="index" :data="item" :color="data.textColor" />
    </div>
    <div class="button-container" v-if="showButtons">
      <LinkButton v-for="(item, index) in data.buttons" v-bind:key="index" :data="item" :color="data.textColor" />
    </div>
    <div class="social-container" v-if="!data.linksOnTop">
      <SocialBadge v-for="(item, index) in data.links" v-bind:key="index" :data="item" :color="data.textColor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, ref } from 'vue';
import SocialBadge from '@/components/SocialBadge.vue';
import LinkButton from '@/components/LinkButton.vue';
import { GradientDirections } from '@/utils/enums';
import { getStorage, ref as fileRef, getDownloadURL } from 'firebase/storage';
import { identicon } from 'minidenticons';
import { storeToRefs } from 'pinia';
import { linkStore } from '@/stores/linkStore';

const storage = getStorage();

const store = linkStore();
const { data, previewIcon } = storeToRefs(store);

let imagePath = ref('');

function setupImage() {
  if (data.value?.iconGuid == undefined || data.value?.iconGuid == '') {
    console.log('no image found, using identicon');
    let svg = identicon(data.value?.user ?? 'default');
    let blob = new Blob([svg], { type: 'image/svg+xml' });
    imagePath.value = URL.createObjectURL(blob);
  } else {
    getDownloadURL(fileRef(storage, data.value?.iconGuid))
      .then((url) => {
        imagePath.value = url;
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error.code);
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            console.log('file not found');
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log('unauthorized');
            break;
          case 'storage/canceled':
            // User canceled the upload
            console.log('canceled');
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            console.log('unknown error');
            break;
        }
      });
  }
}

const showButtons = computed(() => {
  if (data.value?.buttons.length ?? 0 > 0) return true;
  return false;
});

const imagePathOrLocal = computed(() => {
  if (previewIcon.value == undefined) return imagePath.value;
  return URL.createObjectURL(previewIcon.value);
});

const gradientFactory = computed(() => {
  let direction = 'to bottom';
  console.log('gradient: ' + data.value?.gradient);
  console.log(typeof data.value?.gradient);
  switch (parseInt(data.value?.gradient.toString() ?? '0')) {
    case GradientDirections.toBottom:
      direction = 'to bottom';
      break;
    case GradientDirections.toRight:
      direction = 'to right';
      break;
    case GradientDirections.toTop:
      direction = 'to top';
      break;
    case GradientDirections.toLeft:
      direction = 'to left';
      break;
    default:
      console.log('default');
      direction = 'to bottom';
      break;
  }
  console.log('direction: ' + direction);
  return `linear-gradient(${direction}, ${data.value?.bgColor}, ${data.value?.bgColorAlt})`;
});

setupImage();
</script>

<style lang="scss" scoped>
body {
  overflow-x: hidden;
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 20px;
}

.username {
  font-family: 'Karla', sans-serif;
  text-align: center;
  margin-bottom: 10px;
}

.desc {
  font-family: 'Karla', sans-serif;
  text-align: center;
  margin-top: 0;
  margin-bottom: 10px;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.social-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.button-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
