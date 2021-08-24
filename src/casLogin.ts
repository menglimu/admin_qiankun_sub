import store from "@/store";
import { GetQueryString } from "./utils";

/* 单点登录未完成 */

// 是否使用 cas 认证
const isCasLogin = process.env.VUE_APP_CAS === "1";

export default async function casLogin(props) {
  if (window.location.href.includes("/login")) {
    return;
  }

  // 模拟登录
  if (!isCasLogin) {
    store.dispatch("MockLogin");
    return;
  }

  try {
    if (window.__POWERED_BY_QIANKUN__) {
      store.commit("SET_USERINFO_TOKEN", props);
      return;
    }

    // 不是qiankun的时候。在进行浏览器上参数的处理
    // 如果有初始链接中有code,则去取用户信息,如果没有则读取本地
    const code = GetQueryString("code");
    const username = GetQueryString("username");
    const password = GetQueryString("password");
    const accessToken = GetQueryString("access_token") || GetQueryString("accessToken");
    if (code) {
      const state = GetQueryString("state");
      await store.dispatch("CasLogin", { code, state });
      location.href = location.origin + process.env.BASE_URL + "#/";
      return;
    } else if (username && password) {
      await store.dispatch("Login", { username, password });
      location.href = location.origin + process.env.BASE_URL + "#/";
      return;
    } else if (accessToken) {
      await store.dispatch("TokenLogin", accessToken);
      location.href = location.origin + process.env.BASE_URL + "#/";
      return;
    }

    let token = store.getters.token;
    if (!token) {
      token = await store.dispatch("RE_LOADUSER");
    }
    // TODO: 调用后台接口校验token是否已失效
    // }
  } catch (error) {
    return Promise.reject(Error("登录校验失败"));
    // console.log(error)
    // const canLogin = false //默认去到登录页
    // if (process.env.NODE_ENV === 'development' || canLogin) {
    //   next('/login')
    //   return Promise.resolve()
    // }
  }
}
