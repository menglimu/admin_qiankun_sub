/* eslint-disable @typescript-eslint/member-ordering */
/*
 * @Author: wenlin
 * @Date: 2020-11-17 10:59:00
 * @LastEditors: wenlin
 * @LastEditTime: 2020-11-25 14:11:14
 * @Description: 字典
 */

import Vue from 'vue';
import { getDictByType, getDeptTree } from '@/api/modules/public';
const refreshTmp = 1000 * 60 * 60 * 2; // 部门树两小时更新一次
let countTmp = null;
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
// TODO: jest test
interface DictState {
  [key: string]: {
    loadPromise: Promise<any>;
    loading: boolean;
    value: any;
  };
}
@Module
export default class Dict extends VuexModule {
  private dicts: DictState = {};

  @Mutation
  public setDict(name: string, value: any) {
    if (!name) return;
    Vue.set(this.dicts, name, { loading: false, loadPromise: null, value });
  }

  @Mutation
  private isLoading(name: string, loading: boolean, loadPromise?: Promise<any>) {
    if (this.dicts[name]) {
      this.dicts[name].loading = loading;
    } else {
      Vue.set(this.dicts, name, { loading, loadPromise, value: null });
    }
  }

  /**
   * 加载字典，已有的字典不会重新加载，当refresh为true时强制加载
   * @param name 字典名
   * @param refresh 是否强制刷新
   * @returns Promise
   */
  @Action
  public async getDict(name: string, refresh?: boolean) {
    // 正在请求的字典返回请求promise
    if (this.dicts[name]?.loading) return this.dicts[name]?.loadPromise;
    // 字典存在，并且不是强制刷新的时候，返回当前字典
    if (this.dicts[name] && !refresh) {
      return Promise.resolve(this.dicts[name].value);
    }
    let loadPromise = getDictByType(name)
      .then(data => {
        const value = data.map(item => {
          if (item.codeFieldType === 'number' && !isNaN(item.code)) {
            item.code = Number(item.code);
          }
          item.label = item.codeName;
          item.value = item.code;
          return item;
        });

        this.setDict(name, value);
        return value;
      })
      .catch(err => {
        this.isLoading(name, false);
      });
    this.isLoading(name, true, loadPromise);
    return loadPromise;
  }

  @Action
  public async getDeptTree(DictObj, refresh?: boolean) {
    const nothasTree = !DictObj.state.deptTree || !DictObj.state.deptTree[0];
    if (refresh || !countTmp || new Date().getTime() - countTmp >= refreshTmp || nothasTree) {
      const data = await getDeptTree();
      this.setDict('deptTree', data);
      countTmp = new Date().getTime();
      return Promise.resolve(data);
    }
    return Promise.resolve(DictObj.state['deptTree']);
  }
}
