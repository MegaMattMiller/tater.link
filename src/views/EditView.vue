<template>
  <NavBar class="nav-bar" />
  <div class="wrapper">
    <div class="editor">
      <FormKit v-if="!loading && data != undefined" id="licenseForm" type="form" @submit="submitHandler">
        <FormKit type="text" label="Display Name" name="name" validation="length:3" v-model="data.displayName" />
        <FormKit type="text" label="Description" name="desc" validation="length:3" v-model="data.desc" />
        <FormKit type="color" :value="data.bgColor" label="Select a main color" v-model="data.bgColor" />
        <FormKit type="color" :value="data.bgColorAlt" label="Select an accent color" v-model="data.bgColorAlt" />
        <FormKit type="color" :value="data.textColor" label="Select a text color" v-model="data.textColor" />
        <FormKit type="radio" label="Gradient Direction" :options="gradientOptions" v-model="data.gradient" />
        <FormKit
          type="checkbox"
          label="Links on top of buttons?"
          name="links"
          :value="data.linksOnTop"
          v-model="data.linksOnTop"
        />
        <div v-auto-animate>
          <h2>Links</h2>
          <button @click.prevent="addLink"><Icon icon="fa6-regular:square-plus" /></button>
          <div v-for="(linkData, index) in data.links" :key="index" class="link-group-wrapper">
            <select v-model="data.links[index].icon">
              <option
                v-for="(iconName, index) in Object.keys(SocialTypes).filter((key) => isNaN(Number(key)))"
                :key="index"
                :value="index"
              >
                {{ iconName }}
              </option>
            </select>
            <input type="text" v-model="linkData.url" />
            <button @click.prevent="removeLink(index)"><Icon icon="fa6-regular:trash-can" /></button>
          </div>
        </div>
        <div v-auto-animate>
          <h2>Buttons</h2>
          <button @click.prevent="addButton"><Icon icon="fa6-regular:square-plus" /></button>
          <div v-for="(buttonData, index) in data.buttons" :key="index" class="link-group-wrapper">
            <input type="text" v-model="buttonData.text" placeholder="Button Text" />
            <input type="text" v-model="buttonData.url" placeholder="Button URL" />
            <button @click.prevent="removeButton(index)"><Icon icon="fa6-regular:trash-can" /></button>
          </div>
        </div>
        <FormKit type="file" label="Icon" name="icon" accept=".jpg,.png" />
      </FormKit>
      <FormKit type="button" @click.prevent="openCard">View your card live!</FormKit>
      <FormKit type="button" @click.prevent="startShare">Share!</FormKit>
    </div>
    <UserCard v-if="!loading" class="card" />
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onBeforeUnmount, ref } from 'vue';
import { linkStore } from '@/stores/linkStore';
import { storeToRefs } from 'pinia';
import { getStorage, ref as storeRef, uploadBytes } from 'firebase/storage';
import { Icon } from '@iconify/vue';
import NavBar from '@/components/NavBar.vue';
import UserCard from '@/components/UserCard.vue';
import { SocialTypes } from '@/utils/enums';
import { useShare } from '@vueuse/core';
import EditLink from '@/components/EditLink.vue';
import EditButton from '@/components/EditButton.vue';

const store = linkStore();
const { data } = storeToRefs(store);
// const route = useRoute();
const router = useRouter();
const loggedInUser = ref<User | null>(null);
let loading = ref(true);

const gradientOptions = {
  0: 'To Bottom',
  1: 'To Right',
  2: 'To Top',
  3: 'To Left',
};

const linkIconOptions = {
  0: 'Twitter',
  1: 'Instagram',
  2: 'YouTube',
  3: 'Patreon',
  4: 'Twitch',
  5: 'Email',
  6: 'Mastodon',
};

const { share, isSupported } = useShare();

function startShare() {
  share({
    title: 'Tater Link Card',
    text: 'Check out my Tater Link Card!',
    url: `https://tater.link/${data.value?.name}`,
  });
}

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
// const storageRef = ref(storage);

function openCard() {
  router.push(`/${data.value?.name}`);
}

const submitHandler = async (newData: any) => {
  if (newData.icon.length > 0) {
    await updateImage(newData.icon[0].file as File);
  }
  await store.updateCardForUserUID(loggedInUser.value?.uid.toString() ?? '');
};

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function addLink() {
  if (data.value == undefined) return;
  console.log('add link');
  data.value.links.push({
    icon: '0',
    url: '',
  });
}

function removeLink(index: number) {
  if (data.value == undefined) return;
  console.log('remove link ', index);
  console.log('links ', data.value?.links);
  data.value.links.splice(index, 1);
  console.log('links after ', data.value?.links);
}

function addButton() {
  if (data.value == undefined) return;
  console.log('add button');
  data.value.buttons.push({
    text: '',
    url: '',
  });
}

function removeButton(index: number) {
  if (data.value == undefined) return;
  console.log('remove button ', index);
  console.log('buttons ', data.value?.buttons);
  data.value.buttons.splice(index, 1);
  console.log('buttons after ', data.value?.buttons);
}

async function updateImage(file: File) {
  console.log('file ', file);
  if (file.size > 5000000) {
    alert('file too large');
    return;
  }
  var extension = file.type.split('/')[1];
  const userImageRef = storeRef(storage, `images/${loggedInUser.value?.uid}.${extension}`);
  uploadBytes(userImageRef, file).then(() => {
    console.log('Uploaded a blob or file!');
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

function getIconName(value: string) {
  switch (value) {
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
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 300px 1fr;
}

.editor {
  background-color: #fff;
  width: 95%;
  margin: 0 auto;
}

.card {
  width: 100%;
}

.link-group-wrapper {
  border: 1px solid #000;
  border-radius: 10px;
  width: 95%;
}

.link-group {
  width: 95%;
  padding: 10px;
}
</style>
