<template>
  <div class="form-wrapper">
    <FormKit
      type="form"
      @submit="register"
      submit-label="Create Account"
      :submit-attrs="{
        inputClass: 'submit-button',
      }"
    >
      <h1>Create an Account</h1>
      <p v-if="errMsg" class="error">{{ errMsg }}</p>
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
        label="Unique Url"
        validation="required|alpha|length:4"
        v-model="username"
        help="This will be your special URL! You can't change this later!"
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
      <FormKit type="checkbox" label="I Accept the Terms of Service" validation="accepted" />
    </FormKit>
    <h2 v-if="username != ''">Your card will be available at</h2>
    <h2 v-if="username != ''">https://tater.link/{{ username }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { linkStore } from '@/stores/linkStore';
import { getStorage, ref as storeRef, uploadBytes } from 'firebase/storage';

const store = linkStore();
const email = ref('');
const password = ref('');
const username = ref('');
const errMsg = ref(); // ERROR MESSAGE
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);

const router = useRouter(); // get a reference to our vue router
const register = () => {
  store.checkIfUsernameExists(username.value.toLowerCase()).then((exists) => {
    if (exists) {
      errMsg.value = 'That username is already taken.';
      return;
    }
    createUserWithEmailAndPassword(getAuth(), email.value, password.value) // need .value because ref()
      .then((data) => {
        // console.log('Successfully registered!');
        store.createNewCard(data.user.uid, username.value.toLowerCase()).then(() => {
          router.push('/edit'); // redirect to the edit view
        });
      })
      .catch((error) => {
        // console.log(error.code);
        switch (error.code) {
          case 'auth/email-already-in-use':
          default:
            errMsg.value = 'An account with that email already exists.';
            break;
        }
      });
  });
};
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.form-wrapper form {
  @include drop-shadow;
  @include rounded-corners;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 20px;
  max-width: 25em;
  background-color: #fff;
}
.submit-button {
  width: 100% !important;
}

.submit-button {
  width: 100% !important;
}
</style>

<style lang="scss" scoped>
.form-wrapper {
  width: 80%;
  margin: 0 auto;
}

.form-wrapper h1 {
  width: 100%;
  text-align: center;
  margin-top: 0;
}

.error {
  color: red;
}
</style>
