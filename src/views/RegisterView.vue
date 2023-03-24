<template>
  <div class="form-wrapper">
    <h1>Create an Account</h1>
    <p v-if="errMsg" class="error">{{ errMsg }}</p>
    <FormKit type="form" @submit="register" submit-label="Create Account">
      <FormKit
        type="text"
        name="email"
        id="email"
        label="Email"
        validation="required|email"
        v-model="email"
        help="So we can reset your password!"
      />
      <FormKit
        type="text"
        name="username"
        id="username"
        label="Username"
        validation="required|length:4"
        v-model="username"
        help="This will be your special URL!"
      />
      <FormKit
        type="password"
        name="password"
        id="password"
        label="Password"
        help="Enter a new password, don't use a password you use anywhere else!"
        validation="required|length:12,64"
        maxlength="64"
        v-model="password"
      />
      <FormKit
        type="password"
        name="password_confirm"
        id="password_confirm"
        label="Confirm password"
        help="Confirm your new password!"
        validation="required|confirm"
        validation-label="Password confirmation"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { linkStore } from '@/stores/linkStore';

const store = linkStore();
const email = ref('');
const password = ref('');
const username = ref('');
const errMsg = ref(); // ERROR MESSAGE

const router = useRouter(); // get a reference to our vue router
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value) // need .value because ref()
    .then((data) => {
      console.log('Successfully registered!');
      store.createNewCard(data.user.uid, username.value.toLowerCase()).then(() => {
        router.push('/edit'); // redirect to the edit view
      });
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/email-already-in-use':
        default:
          errMsg.value = 'An account with that email already exists.';
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

.error {
  color: red;
}
</style>
