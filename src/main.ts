import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { createProPlugin, inputs } from '@formkit/pro'
import { plugin, defaultConfig } from '@formkit/vue';
import { createAutoAnimatePlugin, createFloatingLabelsPlugin } from '@formkit/addons';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import '@formkit/themes/genesis';
import '@formkit/pro/genesis';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
/* code from our Firebase console */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID as string,
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

const pro = createProPlugin(import.meta.env.VITE_APP_FORMKIT_KEY, inputs)

const app = createApp(App);

app.use(
  plugin,
  defaultConfig({
    plugins: [
      pro,
      createAutoAnimatePlugin(),
    ],
  })
); // Formkit
app.use(autoAnimatePlugin); // FormKit AutoAnimate
app.use(createPinia()); // Pinia
app.use(router); // Vue Router
app.mount('#app');
