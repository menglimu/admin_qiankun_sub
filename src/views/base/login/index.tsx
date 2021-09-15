import Vue from "vue";
import style from "./index.module.scss";
import Forget from "./components/forget";
import { MlForm, MlFormConfig } from "@ml/ml-components/types/form";
import StoreUser from "@/store/modules/user";
export default Vue.extend({
  name: "Login",
  data() {
    return {
      formConfig: null as MlFormConfig,
      formValue: {
        username: "",
        password: ""
      }
    };
  },
  created() {
    this.formConfig = {
      inline: false,
      size: "large",
      uiType: "line",
      labelWidth: "0",
      columns: [
        { prop: "username", placeholder: "用户名", required: true, error: "请输入注册手机号" },
        {
          prop: "password",
          placeholder: "密  码",
          type: "string",
          props: { type: "password" },
          required: true,
          error: "请输入密码"
        }
      ]
    };
  },
  methods: {
    onForget() {
      (this.$refs.forget as any).show(this.formValue?.username);
    },
    async onLogin() {
      const form = this.$refs.form as MlForm;
      await form.validate();
      try {
        await this.$store.dispatch("Login", this.formValue);
        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  },
  render() {
    return (
      <div class={style.login}>
        <div class={style.box}>
          <div class={style.name}></div>
          <div class={style.formBox}>
            <div class={style.title}>系统登录</div>
            <ml-form ref="form" config={this.formConfig} v-model={this.formValue}></ml-form>
            <el-button class={style.loginBtn} type="primary" size="large" onClick={this.onLogin}>
              登录
            </el-button>
            {false && (
              <div class="login-box-forget">
                <el-button class="login-box-forget-btn" type="text" onClick={this.onForget}>
                  忘记密码？
                </el-button>
              </div>
            )}
          </div>
        </div>
        <Forget ref="forget" phone={this.formValue?.username} />
      </div>
    );
  }
});
