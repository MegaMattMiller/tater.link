<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { linkStore } from '@/stores/linkStore';

const store = linkStore();

const router = useRouter();
const isLoggedIn = ref(true);
const loggedInUser = ref<User | null>(null);

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
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');

body {
  padding: 0;
  margin: 0;
  font-family: 'Karla', sans-serif;

  background: #36d1dc; /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #5b86e5, #36d1dc); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #5b86e5,
    #36d1dc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.nodrag {
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

/* Grow */
.hvr-grow {
  display: inline-block;
  vertical-align: middle;
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  transition-duration: 0.3s;
  transition-property: transform;
}

.hvr-grow:hover,
.hvr-grow:focus,
.hvr-grow:active {
  transform: scale(1.1);
}
</style>
