<template>
  <nav class="nav-bar">
    <router-link to="/"> Home </router-link>
    <router-link to="/edit"> Edit </router-link>
    <a v-if="isLoggedIn" @click.prevent="handleSignOut">Logout</a>
    <router-link v-if="!isLoggedIn" to="/register">Register </router-link>
    <router-link v-if="!isLoggedIn" to="/sign-in">Login </router-link>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut, type User } from 'firebase/auth';

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
.nav-bar {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: flex-start;
}
</style>
