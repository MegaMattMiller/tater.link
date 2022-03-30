import { ref } from 'vue';
import { defineStore } from 'pinia';
import faunadb, { query as q } from 'faunadb';

export const linkStore = defineStore('linkStore', () => {
  const data = ref({});
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
      data.value = retData.data;
      foundData.value = true;
    } catch (e) {
      console.log('error', e);
      data.value = {};
      foundData.value = false;
    }
  };

  return {
    data,
    foundData,
    getData,
  };
});

class Response {
  data: object;

  constructor() {
    this.data = {};
  }
}
