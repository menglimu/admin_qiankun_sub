import store from "./root";
// 防止有人直接用getters取store的值，先引一次进行注册
import "./modules/app";
import "./modules/user";
import "./modules/dict";

export default store;
