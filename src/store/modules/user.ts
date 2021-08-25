import { loginByCode, getUserDetail, login, logout, getUserDetailByToken } from "@/api/modules/login"; // 几个自定义的登录

import { staticRoutes } from "@/router/static";
import { addRoutes, MenuItem } from "@/router/permission";
import { Storage } from "@/utils/storage/local";

import { Module } from "vuex";

let storage = new Storage();
export interface UserInfo {
  functionList?: AnyObj[];
  functionTreeList?: MenuItem[];
  systemType?: string;

  group?: {
    groupId?: string;
    groupName?: string;
  };
  project?: {
    projectId?: string;
    projectName?: string;
  };

  userName?: string;
  userNo?: string;
  userId?: string;
  userLevel?: string;
  areaCode?: string;
  avatar?: string;
}

export interface UserState {
  token: string;
  userInfo: UserInfo | null;
  roles: any[];
  pointInfo: AnyObj;
  sidebarItem: AnyObj;
}

function transformFuncs(funcs, pids = []) {
  for (let i = 0; i < funcs.length; i++) {
    const info: MenuItem = {
      expanded: true,
      helpUrl: "",
      leaf: false,
      nodeType: { 101: 0, 102: 1, 103: 2, 104: 3 }[funcs[i].funType],
      openNew: false,
      systemType: 0,
      text: funcs[i].funName,
      url: funcs[i].location,
      pids: pids,
      id: funcs[i].id,
      children: funcs[i].children
    };
    Object.assign(info, funcs[i]);
    info.id = String(funcs[i].id);
    if (info.children) {
      info.children = transformFuncs(info.children, [...pids, funcs[i].id]);
    }
    funcs[i] = info;
  }
  return funcs;
}

function transformUserInfo(userInfoBase): UserInfo {
  userInfoBase.userNo = userInfoBase.userAccount;
  if (!userInfoBase.functionTreeList && userInfoBase.funcs) {
    userInfoBase.functionTreeList = transformFuncs(userInfoBase.funcs);
  }
  const userInfo = {
    functionList: [],
    functionTreeList: [],
    systemType: null,

    group: {
      groupId: null,
      groupName: null
    },
    project: {
      projectId: null,
      projectName: null
    },

    userName: null,
    userNo: null,
    userId: null,
    userLevel: null,
    areaCode: null,
    avatar: null
  };
  Object.assign(userInfo, userInfoBase);
  return userInfo;
}

const userStore: Module<UserState, {}> = {
  state: {
    token: "",
    userInfo: {},
    roles: [],
    pointInfo: {},
    sidebarItem: {}
  },
  getters: {
    token: state => state.token,
    userInfo: state => state.userInfo,
    avatar: state => state.userInfo.avatar,
    groupId: state => state.userInfo?.group?.groupId,
    groupName: state => state.userInfo?.group?.groupName,
    userName: state => state.userInfo.userName,
    userNo: state => state.userInfo?.userNo,
    userId: state => state.userInfo?.userId,
    userLevel: state => state.userInfo?.userLevel,
    projectId: state => state.userInfo?.project?.projectId,
    projectName: state => state.userInfo?.project?.projectName,
    systemType: state => state.userInfo?.systemType,
    roles: state => state.roles,
    pointInfo: state => state.pointInfo,
    menu: state => state.userInfo?.functionTreeList,
    sidebarItem: state => state.sidebarItem,
    isAdminAcount: state => state.userInfo && state.userInfo.userNo === "admin"
  },
  mutations: {
    SET_USERINFO: (state, userInfo: UserInfo) => {
      state.userInfo = userInfo;
      if (userInfo) {
        storage.set("userInfo", userInfo);
        if (userInfo.functionTreeList && userInfo.functionTreeList.length > 0) {
          // 这里直接用对象浅拷贝的特性赋值了。懒得写commit
          userInfo.functionTreeList = addRoutes(userInfo.functionTreeList);
        }
      } else {
        storage.remove("userInfo");
      }
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
      if (token) {
        storage.set("accessToken", token);
      } else {
        storage.remove("accessToken");
      }
    },
    SET_POINT_INFO: (state, pointInfo) => {
      state.pointInfo = pointInfo;
    },
    SET_SIDEBAR_ITEM: (state, sidebarItem) => {
      state.sidebarItem = sidebarItem;
    }
  },

  actions: {
    // 重新加载登录信息到store
    RE_LOADUSER: ({ commit }) => {
      const token = storage.get("accessToken");
      const userInfo = storage.get("userInfo");
      console.log(token, userInfo);
      if (!token || !userInfo) {
        return Promise.reject(Error(""));
      }
      commit("SET_TOKEN", token);
      commit("SET_USERINFO", userInfo);
      return Promise.resolve(token);
    },
    // 模拟登录
    async MockLogin({ dispatch }) {
      await dispatch("GetUserDetail", {
        userName: "虚拟登录",
        functionTreeList: staticRoutes
      });
      return Promise.resolve();
    },
    // 登录和获取用户信息分开接口，如接口合并，需重新处理逻辑
    // 登录通过code和state
    async CasLogin({ commit, dispatch }, access) {
      try {
        const { code, state } = access;
        const { data } = await loginByCode(code, state);
        if (data.code !== 200) {
          return Promise.reject(data.message);
        }
        commit("SET_TOKEN", data.data.accessToken);
        await dispatch("GetUserDetail");
        return Promise.resolve("login:success");
      } catch (error) {
        commit("SET_TOKEN", null);
        return Promise.reject(error);
      }
    },
    // 通过用户名和密码登录
    async Login({ commit, dispatch }, { username, password }) {
      try {
        const { data } = await login(username, password);
        if (data.code !== 200) {
          return Promise.reject(data.message);
        }
        commit("SET_TOKEN", data.data.accessToken);
        // await dispatch('GetUserDetail', data)
        await dispatch("GetUserDetail");
        return Promise.resolve("login:success");
      } catch (error) {
        commit("SET_TOKEN", null);
        return Promise.reject(error);
      }
    },
    // 通过token登录
    async TokenLogin({ commit, dispatch }, token) {
      commit("SET_TOKEN", token);
      await dispatch("GetUserDetail");
      return Promise.resolve("login:success");
    },
    // 通过userInfo和token登录
    async TokenUserLogin({ commit, dispatch }, { token, userInfo }) {
      commit("SET_TOKEN", token);
      await dispatch("GetUserDetail", userInfo);
      return Promise.resolve("login:success");
    },

    // 获取用户详情
    async GetUserDetail({ commit }, userInfoStatic) {
      try {
        const userInfo: UserInfo = transformUserInfo(userInfoStatic || (await getUserDetail()));
        // 使用本地static中的菜单
        const useLocalMenu = process.env.VUE_APP_LOCAL_MENU === "1";
        if (useLocalMenu) {
          userInfo.functionTreeList = staticRoutes;
        }
        commit("SET_USERINFO", userInfo);
        return Promise.resolve(userInfo);
      } catch (error) {
        commit("SET_TOKEN", null);
        commit("SET_USERINFO", null);
        return Promise.reject(error);
      }
    },
    // 退出登录
    async FedLogOut({ commit }) {
      try {
        const data = await logout();
        commit("SET_TOKEN", null);
        commit("SET_USERINFO", null);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
};

export default userStore;
