<template>
  <div class="form-wrapper">
    <h1>Login to Your Account</h1>
    <p v-if="errMsg" class="error">{{ errMsg }}</p>
    <FormKit type="form" @submit="signIn" submit-label="Login">
      <FormKit type="text" name="email" id="email" label="Email" validation="required|email" v-model="email" />
      <FormKit
        type="password"
        name="password"
        id="password"
        label="Password"
        validation="required"
        v-model="password"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errMsg = ref();

const router = useRouter();

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Successfully logged in!');
      router.push('/edit');
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        default:
          errMsg.value = 'Email or password was incorrect';
          break;
      }
    });
};
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 80%;
  margin: 0 auto;
}

.form-wrapper h1 {
  text-align: left;
}

.form-wrapper p {
  text-align: left;
}

.error {
  color: red;
}
</style>
