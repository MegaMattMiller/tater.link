<script setup lang="ts">
import { onMounted } from 'vue';
import { linkStore } from '@/stores/linkStore';
import netlifyIdentity from 'netlify-identity-widget';

const store = linkStore();

netlifyIdentity.init();
netlifyIdentity.on('init', (user) => console.log('init', user));
netlifyIdentity.on('login', (user) => {
  const currentUser = netlifyIdentity.currentUser();
  console.log('login', user);
  console.dir(currentUser);
});
netlifyIdentity.on('logout', () => console.log('Logged out'));
netlifyIdentity.on('error', (err) => console.error('Error', err));
netlifyIdentity.on('open', () => console.log('Widget opened'));
netlifyIdentity.on('close', () => console.log('Widget closed'));

function triggerNetlifyIdentityAction(action: string) {
  if (action == 'login' || action == 'signup') {
    netlifyIdentity.open(action);
    netlifyIdentity.on(action, (user) => {
      this.currentUser = {
        username: user.user_metadata.full_name,
        email: user.email,
        access_token: user.token.access_token,
        expires_at: user.token.expires_at,
        refresh_token: user.token.refresh_token,
        token_type: user.token.token_type,
      };
      this.updateUser({
        currentUser: this.currentUser,
      });
      netlifyIdentity.close();
    });
  } else if (action == 'logout') {
    this.currentUser = null;
    this.updateUser({
      currentUser: this.currentUser,
    });
    netlifyIdentity.logout();
    this.$router.push({ name: 'Home' });
  }
}

onMounted(() => {
  netlifyIdentity.open();
});
</script>

<template>
  <div>
    <h1>Account View</h1>
    <div v-if="isLoggedIn">
      <p>Hello {{ username }}</p>
      <p>
        <button @click="triggerNetlifyIdentityAction('logout')">Log Out</button>
      </p>
    </div>
    <div v-else>
      <p>You are not logged in.</p>
      <p>
        <button @click="triggerNetlifyIdentityAction('login')">Log In</button>
        <button @click="triggerNetlifyIdentityAction('signup')">Sign Up</button>
      </p>
    </div>
  </div>
</template>
