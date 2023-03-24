<template>
  <NavBar class="nav-bar" />
  <div class="wrapper">
    <div class="editor">
      <FormKit v-if="!loading && data != undefined" id="licenseForm" type="form" @submit="submitHandler">
        <FormKit type="text" label="Display Name" name="name" validation="length:3" v-model="newDisplayName" />
        <FormKit type="text" label="Description" name="desc" validation="length:3" v-model="newDesc" />
        <FormKit type="color" :value="newColor" label="Select a main color" v-model="newColor" />
        <FormKit type="color" :value="newAltColor" label="Select an accent color" v-model="newAltColor" />
        <FormKit type="color" :value="newTextColor" label="Select a text color" v-model="newTextColor" />
        <FormKit type="radio" label="Gradient Direction" :options="gradientOptions" v-model="newGradient" />
        <FormKit
          type="checkbox"
          label="Links on top of buttons?"
          name="links"
          :value="newLinksOnTop"
          v-model="newLinksOnTop"
        />
        <div v-for="(linkData, index) in newLinks" :key="index" class="link-group-wrapper">
          <FormKit type="group" v-model="newLinks[index]" class="link-group">
            <FormKit type="select" label="Icon" name="icon">
              <option
                v-for="(iconName, index) in Object.keys(SocialTypes).filter((key) => isNaN(Number(key)))"
                :key="index"
                :value="index"
              >
                {{ iconName }}
              </option>
            </FormKit>
            <FormKit type="text" label="Link URL" name="url" validation="required" />
          </FormKit>
        </div>
        <FormKit type="file" label="Icon" name="icon" accept=".jpg,.png" />
      </FormKit>
    </div>
    <UserCard v-if="!loading" :data="data" class="card" />
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onBeforeUnmount, ref, watch } from 'vue';
import { linkStore } from '@/stores/linkStore';
import { storeToRefs } from 'pinia';
import { getStorage, ref as storeRef, uploadBytes } from 'firebase/storage';
import { Icon } from '@iconify/vue';
import { setErrors } from '@formkit/vue';
import type { Link, Button } from '@/types';
import NavBar from '@/components/NavBar.vue';
import UserCard from '@/components/UserCard.vue';
import { SocialTypes } from '@/utils/enums';
import EditLink from '@/components/EditLink.vue';
import EditButton from '@/components/EditButton.vue';

const store = linkStore();
const { data } = storeToRefs(store);
// const route = useRoute();
const router = useRouter();
const loggedInUser = ref<User | null>(null);
let loading = ref(true);

let newDisplayName = ref('');
let newDesc = ref('');
let newColor = ref('#ffffff');
let newAltColor = ref('#ffffff');
let newGradient = ref(0);
let newLinksOnTop = ref(false);
let newLinks = ref<Link[]>([]);
let newButtons = ref<Button[]>([]);
let newTextColor = ref('#000000');

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

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
// const storageRef = ref(storage);

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

watch(newDisplayName, (newVal) => {
  if (data.value != undefined) {
    data.value.displayName = newVal;
  }
});

watch(newDesc, (newVal) => {
  if (data.value != undefined) {
    data.value.desc = newVal;
  }
});

watch(newColor, (newVal) => {
  console.log('new color ', newVal);
  if (data.value != undefined) {
    data.value.bgColor = newVal;
  }
});

watch(newAltColor, (newVal) => {
  console.log('new alt color ', newVal);
  if (data.value != undefined) {
    data.value.bgColorAlt = newVal;
  }
});

watch(newGradient, (newVal: any) => {
  console.log('new gradient ', newVal);
  if (data.value != undefined) {
    data.value.gradient = parseInt(newVal);
  }
});

watch(newLinksOnTop, (newVal) => {
  console.log('new links on top ', newVal);
  if (data.value != undefined) {
    data.value.linksOnTop = newVal;
  }
});

watch(newLinks, (newVal: Array<Link>) => {
  console.log('new links ', newVal);
  if (data.value != undefined) {
    data.value.links = newVal;
  }
});

watch(newButtons, (newVal: Array<Button>) => {
  console.log('new buttons ', newVal);
  if (data.value != undefined) {
    data.value.buttons = newVal;
  }
});

watch(newTextColor, (newVal) => {
  console.log('new text color ', newVal);
  if (data.value != undefined) {
    data.value.textColor = newVal;
  }
});

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

  newDisplayName.value = data.value?.displayName ?? '';
  newDesc.value = data.value?.desc ?? '';
  newColor.value = data.value?.bgColor ?? '#ffffff';
  newAltColor.value = data.value?.bgColorAlt ?? '#ffffff';
  newGradient.value = data.value?.gradient ?? 0;
  newLinksOnTop.value = data.value?.linksOnTop ?? false;
  newLinks.value = data.value?.links ?? [];
  newButtons.value = data.value?.buttons ?? [];
  newTextColor.value = data.value?.textColor ?? '#000000';
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

function getIconForValue(value: number): string {
  console.log('value ', value);
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
}
</style>
