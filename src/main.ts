import "./public-path";
import casLogin from "./casLogin";

let instance = null;

async function initial(props: any = {}) {
  // 如果走cas认证
  try {
    await casLogin(props);
  } catch (error) {
    alert("登录失效，请重新登录");
    return;
  }
  import("./initial").then(({ render }) => {
    instance = render(props);
  });
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
