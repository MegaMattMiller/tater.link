/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import faunadb from "faunadb";
const q = faunadb.query
// var faunadb = require('faunadb'),
//   q = faunadb.query;


export const linkStore = defineStore({
  id: "linkStore",
  state: () => ({
    data: {},
  }),
  actions: {
    async getData(username: string) {
      const client = new faunadb.Client({
        secret: import.meta.env.VUE_APP_APP_TOKEN as string,
        domain: 'db.fauna.com',
        scheme: 'https',
      })
      const response = await client.query(
        q.Select('name', q.Ref(q.Collection('cards'), username))
      );
      console.log('got data');
      console.log(response)
      this.data = response
    }
  },
});
