<template>
  <nav class="nav-bar">
    <h1 class="header" @click="navigate('/')">Tater Link</h1>
    <FormKit
      type="button"
      @click.prevent="startShare"
      v-if="isLoggedIn && isSupported && data != undefined"
      outer-class="nav-button"
      wrapper-class="share-button"
      >Share</FormKit
    >
    <FormKit type="button" @click="navigate('/edit')" v-if="isLoggedIn" outer-class="nav-button">Edit</FormKit>
    <FormKit type="button" @click="handleSignOut" v-if="isLoggedIn" outer-class="nav-button">Logout</FormKit>
    <FormKit type="button" @click="navigate('/register')" v-if="!isLoggedIn" outer-class="nav-button">Register</FormKit>
    <FormKit type="button" @click="navigate('/signin')" v-if="!isLoggedIn" outer-class="nav-button">Sign In</FormKit>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { useShare } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { Icon } from '@iconify/vue';
import { linkStore } from '@/stores/linkStore';

const store = linkStore();
const router = useRouter();
const isLoggedIn = ref(false);
const loggedInUser = ref<User | null>(null);
const { data } = storeToRefs(store);

const { share, isSupported } = useShare();

function startShare() {
  share({
    title: 'Tater Link Card',
    text: 'Check out my Tater Link Card!',
    url: `https://tater.link/${data.value?.name}`,
  });
}

// runs after firebase is initialized
onAuthStateChanged(getAuth(), function (user) {
  if (user) {
    isLoggedIn.value = true; // if we have a user
    loggedInUser.value = user;
    console.log('user is logged in ', user.uid);
  } else {
    isLoggedIn.value = false; // if we do not
  }
});

const handleSignOut = () => {
  signOut(getAuth());
  router.push('/');
};

function navigate(path: string = '/') {
  router.push(path);
}
</script>

<style lang="scss">
// .share-button button {
// background-color: transparent !important;
// border-color: transparent !important;
// color: #000 !important;
// }
</style>

<style lang="scss">
@import '@/styles/mixins.scss';

.nav-bar {
  @include drop-shadow;
  @include rounded-corners;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0 10px 10px;
  margin: 10px;
  background-color: #f9f9f9;
}

.nav-button {
  margin: 0;
}

.header {
  flex-grow: 2;
  margin: 0;
  padding-left: 10px;
  cursor: pointer;
}
</style>
