import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getFirestore, collection, query, where, getDocs, limit, doc, updateDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { UserData } from '@/types';

export const linkStore = defineStore('linkStore', () => {
  const data = ref<UserData>();
  const foundData = ref(false);
  const cardId = ref('');

  const firestore = getFirestore();

  const getDataForCardName = async (cardName: string) => {
    let foundCard: UserData | undefined = undefined;
    const cardsRef = collection(firestore, 'cards');
    const q = query(cardsRef, where("name", "==", cardName), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      foundCard = doc.data() as UserData;
    });
    console.log('foundCard', foundCard)
    data.value = foundCard;
  };

  const getDataForUserUID = async (uid: string) => {
    let foundCard: UserData = {} as UserData;
    const cardsRef = collection(firestore, 'cards');
    const q = query(cardsRef, where("user", "==", uid), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      foundCard = doc.data() as UserData;
      cardId.value = doc.id;
    });
    console.log('foundCard', foundCard)
    data.value = foundCard;
  };

  const updateCardForUserUID = async (uid: string) => {
    console.log('updateCardForUserUID', uid);
    if (uid == '' || uid == undefined) return;

    const cardRef = doc(firestore, 'cards', cardId.value);
    if (data.value != undefined)
      await setDoc(cardRef, data.value, { merge: true });
  };

  return {
    data,
    foundData,
    getDataForCardName,
    getDataForUserUID,
    updateCardForUserUID,
  };
});

class Response {
  data: object;

  constructor() {
    this.data = {};
  }
}
