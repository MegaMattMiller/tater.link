import { ref } from 'vue';
import { defineStore } from 'pinia';
import faunadb, { query as q } from 'faunadb';

export const linkStore = defineStore('linkStore', () => {
  const data = ref<UserData>();
  const foundData = ref(false);

  const getData = async (username: string) => {
    console.log('username', username);
    const adminClient = new faunadb.Client({
      secret: import.meta.env.VITE_APP_APP_TOKEN as string,
      domain: 'db.us.fauna.com',
      scheme: 'https',
    });
    try {
      const retData: Response = await adminClient.query(q.Get(q.Match(q.Index('cards_by_name'), username)));
      data.value = retData.data as UserData;
      foundData.value = true;
    } catch (e) {
      console.log('error', e);
      data.value = undefined;
      foundData.value = false;
    }
  };

  return {
    data,
    foundData,
    getData,
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
