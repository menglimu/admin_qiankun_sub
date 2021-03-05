import { Vue, Component } from 'vue-property-decorator'
import styles from './index.module.scss'
interface LoginForm {
  username: string
  password: string
}
@Component({
  name: 'Login'
})
export default class Login extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
    }
  }
  private loginForm: LoginForm = {
    username: '',
    password: ''
  }
  private loginRules = {
    username: [{ required: true, trigger: 'blur', validator: this.validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: this.validatePassword }]
  }
  private loading = false
  private async login() {
    try {
      await this.$store.dispatch('Login', this.loginForm)
      this.$router.push({ path: '/' })
    } catch (error) {
      this.$message.error(error)
    }
  }
  render() {
    return (
      <div class={styles.container}>
        <div class={styles.box}>
          <div class={styles.title}>合川区市域社会治理现代化综合管理考核系统</div>
          <c-form class={styles['login-form']}>
            <div class={styles['title-login']}>系统登录</div>
            <c-form-item prop="username" class={styles['form-item']}>
              <c-input
                ref="username"
                class={styles.input}
                v-model={this.loginForm.username}
                placeholder="username"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on">
                <svg-icon icon-class="user" class={styles.user} slot="prefix" />
              </c-input>
            </c-form-item>
            <c-form-item prop="password" class={styles['form-item']}>
              <c-input
                ref="password"
                class={styles.input}
                v-model={this.loginForm.password}
                type="password"
                placeholder="Password"
                name="password"
                tabindex="2"
                autocomplete="on">
                <svg-icon icon-class="password" class={styles.password} slot="prefix" />
              </c-input>
            </c-form-item>
            <c-button loading={this.loading} type="primary" class={styles['login-btn']} on-click={this.login}>
              确 定
            </c-button>
          </c-form>
        </div>
        <div class={styles.copyright}>copyright 2020 城云科技</div>
      </div>
    )
  }
}
