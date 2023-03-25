import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  limit,
  doc,
  addDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import type { UserData } from '@/types';

export const linkStore = defineStore('linkStore', () => {
  const data = ref<UserData>();
  const foundData = ref(false);
  const cardId = ref('');

  const firestore = getFirestore();

  const collectionName = 'cards';

  const getDataForCardName = async (cardName: string) => {
    let foundCard: UserData | undefined = undefined;
    const cardsRef = collection(firestore, collectionName);
    const q = query(cardsRef, where('name', '==', cardName), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      foundCard = doc.data() as UserData;
    });
    console.log('foundCard', foundCard);
    data.value = foundCard;
  };

  const getDataForUserUID = async (uid: string) => {
    let foundCard: UserData = {} as UserData;
    let didFindCard = false;
    const cardsRef = collection(firestore, collectionName);
    const q = query(cardsRef, where('user', '==', uid), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      foundCard = doc.data() as UserData;
      cardId.value = doc.id;
      didFindCard = true;
    });
    console.log('foundCard', foundCard);
    data.value = foundCard;
    return didFindCard;
  };

  const checkIfUsernameExists = async (username: string) => {
    let foundCard: UserData = {} as UserData;
    let didFindCard = false;
    const cardsRef = collection(firestore, collectionName);
    const q = query(cardsRef, where('name', '==', username), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      foundCard = doc.data() as UserData;
      didFindCard = true;
    });
    console.log('foundCard', foundCard);
    return didFindCard;
  };

  const updateCardForUserUID = async (uid: string) => {
    console.log('updateCardForUserUID', uid);
    if (uid == '' || uid == undefined) return;

    const cardRef = doc(firestore, collectionName, cardId.value);
    if (data.value != undefined) await setDoc(cardRef, data.value, { merge: true });
  };

  const createNewCard = async (uid: string, username: string) => {
    const docRef = await addDoc(collection(firestore, collectionName), createDefaultCard(uid, username));
    console.log('Document written with ID: ', docRef.id);
    return docRef;
  };

  const createDefaultCard = (uid: string, username: string) => {
    const newCard: UserData = {
      active: true,
      name: username,
      displayName: '',
      desc: '',
      bgColor: '#ffffff',
      bgColorAlt: '#ffffff',
      gradient: 0,
      iconGuid: '',
      linksOnTop: false,
      links: [],
      buttons: [],
      user: uid,
      textColor: '#000000',
    } as UserData;
    return newCard;
  };

  return {
    data,
    foundData,
    getDataForCardName,
    getDataForUserUID,
    updateCardForUserUID,
    createNewCard,
    checkIfUsernameExists,
  };
});

class Response {
  data: object;

  constructor() {
    this.data = {};
  }
}
