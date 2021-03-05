import Vue from 'vue'
import Vuex, { Module } from 'vuex'
// import app from './modules/app'
import user, { UserState } from './modules/user'
import table from './modules/table'
import dict, { Dict } from './modules/dict'

export interface RootState {
  dict: Dict
  user: Module<UserState, {}>
}

Vue.use(Vuex)

const store = new Vuex.Store<RootState>({
  modules: {
    // app,
    user,
    table,
    dict
  }
})

export default store
