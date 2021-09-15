/**
 * action 中不能操作 数据源
 * mutation 中不能调用其他方法
 * 严格按照vuex传值， action 和 mutation 里面的参数只能有一个
 */
import store from "./root";
// 防止有人直接用getters取store的值，先引一次进行注册
import "./modules/app";
import "./modules/user";
import "./modules/dict";

export default store;
