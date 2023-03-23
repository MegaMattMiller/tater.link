import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getFirestore, collection, query, where, getDocs, limit } from "firebase/firestore";

export const linkStore = defineStore('linkStore', () => {
  const data = ref<UserData>();
  const foundData = ref(false);

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
    let foundCard: UserData | undefined = undefined;
    const cardsRef = collection(firestore, 'cards');
    const q = query(cardsRef, where("user", "==", uid), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      foundCard = doc.data() as UserData;
    });
    console.log('foundCard', foundCard)
    data.value = foundCard;
  };

  return {
    data,
    foundData,
    getDataForCardName,
  };
});

interface UserData {
  readonly active: boolean;
  readonly name: string;
  readonly displayName: string;
  readonly desc: string;
  readonly bgColor: string;
  readonly bgColorAlt: string;
  readonly gradient: number;
  readonly iconGuid: string;
  readonly linksOnTop: boolean;
  readonly links: Array<Link>;
  readonly buttons: Array<Button>;
}

interface Link {
  readonly url: string;
  readonly icon: number;
}

interface Button {
  readonly url: string;
  readonly text: string;
}

export { type UserData, type Link, type Button };

class Response {
  data: object;

  constructor() {
    this.data = {};
  }
}
