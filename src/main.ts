import "./public-path";
import casLogin from "./casLogin";
import StoreApp from "./store/modules/app";
// TODO 整体页面加载中的动画
let instance = null;
// document.title = StoreApp.title || StoreApp.name || '';

async function initial(props: any = {}) {
  // 如果走cas认证
  try {
    await casLogin(props);
  } catch (error) {
    alert("登录失效，请重新登录");
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
