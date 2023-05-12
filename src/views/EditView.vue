<template>
  <div v-auto-animate>
    <NavBar class="nav-bar" />
    <div class="wrapper">
      <div class="editor">
        <h2>Editor</h2>
        <FormKit
          v-if="!loading && data != undefined"
          id="cardForm"
          type="form"
          @submit="submitHandler"
          @input="inputHandler"
          name="data"
          :submit-attrs="{
            wrapperClass: 'submit-button-wrapper',
            inputClass: 'submit-button',
          }"
        >
          <FormKit type="text" label="Display Name" name="name" validation="length:3" v-model="data.displayName" />
          <FormKit type="text" label="Description" name="desc" validation="length:3" v-model="data.desc" />
          <FormKit type="color" :value="data.bgColor" label="Select a main color" v-model="data.bgColor" />
          <FormKit type="color" :value="data.bgColorAlt" label="Select an accent color" v-model="data.bgColorAlt" />
          <FormKit type="color" :value="data.textColor" label="Select a text color" v-model="data.textColor" />
          <FormKit type="radio" label="Gradient Direction" :options="gradientOptions" v-model="data.gradient" />
          <FormKit
            type="checkbox"
            label="Links on top of buttons?"
            name="linksOnTop"
            :value="data.linksOnTop"
            v-model="data.linksOnTop"
          />

          <FormKit id="repeater" name="links" type="repeater" label="Badges" :value="data.links" min="0" max="10">
            <FormKit type="select" label="Icon" name="icon_id" :options="linkIconOptions" />
            <FormKit type="url" label="URL" name="url" validation="required|url" placeholder="Add site address" />
          </FormKit>

          <FormKit id="repeater" name="buttons" type="repeater" label="Buttons" :value="data.buttons" min="0" max="10">
            <FormKit
              type="text"
              label="Text"
              name="text"
              validation="required|length:3"
              placeholder="Add button name"
            />
            <FormKit type="url" label="URL" name="url" validation="required|url" placeholder="Add site address" />
          </FormKit>

          <FormKit
            type="file"
            label="Icon"
            name="icon"
            accept=".jpg,.png"
            help="A .jpg or .png no larger than 2MB. A square image works best!"
            validation="sizeMB:2"
            :validation-rules="{ sizeMB }"
            :validation-messages="{
              sizeMB: sizeMessage,
            }"
            validation-visibility="live"
          />
        </FormKit>
        <div class="preview-buttons">
          <FormKit
            input-class="submit-button"
            wrapper-class="preview-button-wrapper"
            type="button"
            @click.prevent="openCard"
            >View</FormKit
          >
          <FormKit
            input-class="submit-button"
            wrapper-class="preview-button-wrapper"
            type="button"
            @click.prevent="startShare"
            v-if="isSupported"
            >Share</FormKit
          >
        </div>
      </div>
      <div class="card-wrapper">
        <UserCard v-if="!loading" class="card" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onBeforeUnmount, ref, computed } from 'vue';
import { linkStore } from '@/stores/linkStore';
import { storeToRefs } from 'pinia';
import { getStorage, ref as storeRef, uploadBytes } from 'firebase/storage';
import NavBar from '@/components/NavBar.vue';
import UserCard from '@/components/UserCard.vue';
import { SocialTypes, GradientDirections } from '@/utils/enums';
import { useShare } from '@vueuse/core';
import { gradientNameFactory, iconNameFactory } from '@/utils/transformers';
import type { UserData } from '@/types';

const store = linkStore();
const { data, previewIcon } = storeToRefs(store);
// const route = useRoute();
const router = useRouter();
const loggedInUser = ref<User | null>(null);
let loading = ref(true);

const gradientOptions = computed(() => {
  let options: any = {};
  // console.log('directions', GradientDirections);
  for (let i = 0; i < Object.keys(GradientDirections).length; i++) {
    // console.log('directions', options);
    options[i] = gradientNameFactory(i);
  }
  return options;
});

const linkIconOptions = computed(() => {
  let options: any = {};
  for (let i = 0; i < Object.keys(SocialTypes).length; i++) {
    options[i] = iconNameFactory(i);
  }
  // console.log('icons', options);
  return options;
});

const { share, isSupported } = useShare();

function startShare() {
  share({
    title: 'Tater Link Card',
    text: 'Check out my Tater Link Card!',
    url: getCardUrl(),
  });
}

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
// const storageRef = ref(storage);

function openCard() {
  window.open(getCardUrl(), '_blank');
}

function getCardUrl() {
  let url = `https://tater.link/${data.value?.name}`;
  return url;
}

const submitHandler = async (newData: any) => {
  if (newData.icon.length > 0) {
    await updateImage(newData.icon[0].file as File);
  }
  await store.updateCardForUserUID(loggedInUser.value?.uid.toString() ?? '');
};

function inputHandler(newData: any) {
  // console.log('newData ', newData);
  if (newData == undefined || newData.icon == undefined) {
    previewIcon.value = undefined;
    return;
  }
  if (newData.icon.length > 0) {
    previewIcon.value = newData.icon[0].file;
  } else {
    previewIcon.value = undefined;
  }
  if (data.value != undefined) {
    data.value.links = [...newData.links];
    data.value.buttons = [...newData.buttons];
    // console.log('data.value.links ', data.value.links);
  }
}

async function updateImage(file: File) {
  if (file.size > 5000000) {
    alert('file too large');
    return;
  }
  var extension = file.type.split('/')[1];
  const userImageRef = storeRef(storage, `images/${loggedInUser.value?.uid}.${extension}`);
  uploadBytes(userImageRef, file).then(() => {
    // console.log('Uploaded a blob or file!');
    if (data.value != undefined) {
      data.value.iconGuid = `images/${loggedInUser.value?.uid}.${extension}`;
      store.updateCardForUserUID(data.value.user);
    }
  });
}

async function getData() {
  await store.getDataForUserUID(loggedInUser.value?.uid.toString() ?? '');
  if (data.value == null || data.value == undefined) router.push(`/`);
  loading.value = false;
}

const authListener = onAuthStateChanged(getAuth(), function (user) {
  loggedInUser.value = user;
  if (!user) {
    // not logged in
    alert('you must be logged in to view this. redirecting to the home page');
    router.push('/');
  }
  getData();
});

onBeforeUnmount(() => {
  // clear up listener
  authListener();
});

function sizeMB(node: any, group: string = '5') {
  let maxSize = parseInt(group);
  if (Number.isNaN(maxSize)) return false;
  if (node.value.length == 0) return true;
  return node.value[0].file.size < maxSize * 1024 * 1024;
}

function sizeMessage({ args }: any) {
  return `File size must be less than ${args[0]}MB`;
}
</script>

<style lang="scss">
.submit-button {
  width: 100% !important;
  margin: 0 auto !important;
}

.submit-button-wrapper {
  width: 80% !important;
  margin: 0 auto !important;
}

.preview-button-wrapper {
  width: 100% !important;
  margin: 0 auto !important;
}
</style>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: stretch;
}

.editor {
  @include drop-shadow;
  @include rounded-corners;
  background-color: #fff;
  width: 50%;
  margin: 10px;
  padding: 10px;
}

.card-wrapper {
  position: relative;
  width: 100%;
  margin: 10px;
  padding: 10px;
}

.card {
  @include drop-shadow;
  @include rounded-corners;
  position: fixed;
  width: 65%;
  height: 88vh;
  right: 0;
  top: 11vh;
}

.link-group-wrapper {
  border: 1px solid #000;
  width: 95%;
}

.link-group {
  width: 95%;
  padding: 10px;
}

.preview-buttons {
  width: 80%;
  max-width: var(--fk-max-width-input);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
  gap: 15px;
}
</style>
