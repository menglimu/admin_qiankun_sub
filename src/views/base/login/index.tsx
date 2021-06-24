import Vue from 'vue';
// import Forget from './src/components/forget.vue';
import style from './index.module.scss';
import { MlForm, MlFormConfig } from '@ml/ml-components/types/form';
export default Vue.extend({
  name: 'Login',
  data() {
    interface DataInterface {
      [key: string]: any;
      formConfig: MlFormConfig;
      formValue: AnyObj;
    }
    const data: DataInterface = {
      formConfig: {
        inline: false,
        size: 'large',
        uiType: 'line',
        columns: [
          { prop: 'username', placeholder: '用户名', required: true, error: '请输入注册手机号' },
          {
            prop: 'password',
            placeholder: '密  码',
            type: 'string',
            props: { type: 'password' },
            required: true,
            error: '请输入密码'
          }
        ]
      },
      formValue: {}
    };
    return data;
  },
  methods: {
    onForget() {
      (this.$refs.forget as any).show(this.formValue?.username);
    },
    async onLogin() {
      const form: MlForm = this.$refs.form as MlForm;
      await form.validate();
      try {
        await this.$store.dispatch('Login', this.formValue);
        this.$router.push('/');
      } catch (error) {
        this.$message.error(error);
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
            <div class="login-box-forget">
              <el-button class="login-box-forget-btn" type="text" onClick={this.onForget}>
                忘记密码？
              </el-button>
            </div>
          </div>
        </div>
        {/* <Forget ref="forget" phone={this.formValue?.username} /> */}
      </div>
    );
  }
});
