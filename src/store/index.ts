import Vue from 'vue';
import Vuex, { Module } from 'vuex';
// import app from './modules/app'
import user, { UserState } from './modules/user';
import dict, { Dict } from './modules/dict';
export interface RootState {
  dict: Dict;
  user: Module<UserState, {}>;
}

Vue.use(Vuex);

// const vuexLocal = new VuexPersistence({
//   key: 'App_chat',
//   storage: window.localStorage
// })

const store = new Vuex.Store<RootState>({
  // plugins: [vuexLocal.plugin],
  modules: {
    // app,
    user,
    dict
  }
});

export default store;
