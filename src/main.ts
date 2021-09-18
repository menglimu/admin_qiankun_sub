import "./public-path";
import casLogin from "./casLogin";
import { UserInfo } from "./store/modules/user";
import Vue from "vue";
// import StoreApp from "./store/modules/app";
// document.title = StoreApp.title || StoreApp.name || '';
// TODO 整体页面加载中的动画
let instance = null;

export interface QKProps {
  container: HTMLElement;
  appBaseurl: string;
  appName: string;
  userInfo: UserInfo;
  accessToken: string;
}

async function initial(props?: QKProps) {
  // 如果走cas认证
  try {
    await casLogin(props);
  } catch (error) {
    const page = await import("@/views/base/401");
    const container = props?.container;
    new Vue({
      render: h => h(page.default)
    }).$mount(container ? container.querySelector("#app") : "#app");
    return;
  }
  const { render } = await import("./initial");
  instance = await render(props);
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  initial();
}
export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}
export async function mount(props) {
  console.log("[vue] props from main framework", props);
  try {
    await initial(props);
  } catch (error) {
    window.appEventBus?.$emit("loadError", process.env.VUE_APP_NAME);
  }
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  // router = null
}
