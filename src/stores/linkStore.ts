import { defineStore } from 'pinia';
import faunadb, { query as q } from 'faunadb';

class Response {
  data: object;

  constructor() {
    this.data = {};
  }
}

export const linkStore = defineStore({
  id: 'linkStore',
  state: () => ({
    data: {},
  }),
  actions: {
    async getData(username: string) {
      console.log('username', username);
      const adminClient = new faunadb.Client({
        secret: import.meta.env.VITE_APP_APP_TOKEN as string,
        domain: 'db.us.fauna.com',
        scheme: 'https',
      });
      const retData: Response = await adminClient.query(q.Get(q.Match(q.Index('cards_by_name'), username)));
      this.data = retData.data;
    },
  },
});
