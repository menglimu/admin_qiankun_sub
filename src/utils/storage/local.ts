/*
 * @Author: wenlin
 * @Date: 2020-07-29 16:14:09
 * @LastEditors: wenlin
 * @LastEditTime: 2020-08-03 09:32:01
 * @Description:
 */

export class Storage {
  private privatePreKey: string;
  // 所有均添加上项目私有前缀
  public constructor(name = process.env.VUE_APP_NAME || '') {
    this.privatePreKey = name ? name + '_' : '';
  }
  public get<T>(key: string): T | null | string {
    if (!key) return null;
    let value = window.localStorage.getItem(this.privatePreKey + key);
    try {
      value = JSON.parse(value!);
      return value;
    } catch (e) {
      return value;
    }
  }

  public set(key: string, value: any) {
    if (!key) return;
    if (Object.prototype.toString.call(value) === '[object Object]') {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(this.privatePreKey + key, value);
  }

  public remove(key: string) {
    if (!key) return;
    window.localStorage.removeItem(this.privatePreKey + key);
  }
}

export default new Storage();
