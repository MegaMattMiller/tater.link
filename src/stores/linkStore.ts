import { defineStore } from "pinia";
// var faunadb = require('faunadb'),
//   q = faunadb.query;


//   var client = new faunadb.Client({
//           secret: process.env.VUE_APP_APP_TOKEN,
//           domain: 'db.fauna.com',
//           scheme: 'https'
//         });

export const linkStore = defineStore({
  id: "linkStore",
  state: () => ({
    data: {},
  }),
  mutations: {
    updateData(state, value) {
      state.data = value;
    }
  },
  actions: {
  },
});
