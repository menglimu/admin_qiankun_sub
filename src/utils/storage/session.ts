class SessionStorage {
  private privatePreKey: string;
  // 所有均添加上项目私有前缀
  public constructor(name?: string) {
    this.privatePreKey = name ? name + '_' : process.env.VUE_APP_NAME ? process.env.VUE_APP_NAME + '_' : '';
  }
  public get<T>(key: string): T | null | string {
    if (!key) return null;
    let value = window.sessionStorage.getItem(this.privatePreKey + key);
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
    window.sessionStorage.setItem(this.privatePreKey + key, value);
  }

  public remove(key: string) {
    if (!key) return;
    window.sessionStorage.removeItem(this.privatePreKey + key);
  }
}

export default new SessionStorage();
