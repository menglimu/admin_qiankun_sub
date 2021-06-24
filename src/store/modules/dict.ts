/*
 * @Author: wenlin
 * @Date: 2020-11-17 10:59:00
 * @LastEditors: wenlin
 * @LastEditTime: 2020-11-25 14:11:14
 * @Description: 字典
 */
import { Module } from 'vuex';
import store, { RootState } from '..';
import Vue from 'vue';
import { getDictByType, getDeptTree } from '@/api/modules/public';
const refreshTmp = 1000 * 60 * 60 * 2; // 部门树两小时更新一次
let countTmp = null;

export type Dict = AnyObj;
const dict: Module<Dict, RootState> = {
  state: {},
  getters: {},
  mutations: {
    setDict(state, payload: { name: string; value: any }) {
      if (payload.name) {
        Vue.set(state, payload.name, payload.value);
        // state[payload.name] = payload.value
      }
    },
    clearDeptTree(state) {
      state.deptTree = null;
    }
  },
  actions: {
    /**
     * TODO：同一个接口连续触发的问题
     */
    async getDict(DictObj, payload: { name: string; refresh?: boolean }) {
      const { name, refresh } = payload;
      if (name && DictObj.state.hasOwnProperty(name) && !refresh) {
        return Promise.resolve(DictObj.state[name]);
      }
      try {
        const data = (await getDictByType(name)) || [];
        const value = data.map(item => {
          if (item.codeFieldType === 'number' && !isNaN(item.code)) {
            item.code = Number(item.code);
          }
          item.label = item.codeName;
          item.value = item.code;
          return item;
        });
        this.commit('setDict', { name, value });
        return Promise.resolve(value);
      } catch (error) {
        console.log(error);
        return Promise.reject(Error(''));
      }
    },
    async getDeptTree(DictObj, refresh?: boolean) {
      const nothasTree = !DictObj.state.deptTree || !DictObj.state.deptTree[0];
      if (refresh || !countTmp || new Date().getTime() - countTmp >= refreshTmp || nothasTree) {
        const data = await getDeptTree();
        this.commit('setDict', { name: 'deptTree', value: data });
        countTmp = new Date().getTime();
        return Promise.resolve(data);
      }
      return Promise.resolve(DictObj.state['deptTree']);
    }
  }
};

export default dict;

export function getDictOptions(name: string, refresh?: boolean) {
  return async (): Promise<{ content: any[] }> => {
    try {
      const content = (await store.dispatch('getDict', { name, refresh })) || [];
      return { content };
    } catch (error) {
      console.log(error);
      return { content: [] };
    }
  };
}
