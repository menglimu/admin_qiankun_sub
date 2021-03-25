## adminBase

基于城云adminBase进行简化的后台管理框架

## 构建步骤

``` bash

# 1. 使用VNP连接公司内网环境，连接成功标准 ping 10.12.102.194有响应，如ping不通，请检查账号权限

# 2. 使用cci 私有仓库

npm config set registry http://10.12.102.194:4873

        #推荐使用 nrm 管理 registry

            npm install nrm -g

            nrm add cci http://10.12.102.194:4873

            nrm ls #查看registry列表

            nrm use cci #使用 cci 私有仓库


# 3. 安装依赖
npm install

        #推荐使用 yarn 安装依赖
            #安装 yarn 
            npm install yarn -g

            yarn #安装依赖


# 4. 开发模式（两种命令皆可）
npm run serve

# 5. 项目构建
npm run build


# 6. 演示
npm run build



# 7. 代码格式校验
npm run lint

```

## 技术栈

- vue-cli 4.x
- vue 2.x
- vue-router
- vuex
- cui [帮助文档](http://10.12.102.194:8070/index.html#/zh-CN/installation)
- element-ui
- scss
- axios
- typescript

## 代码结构

```text
web_template_qiankun_sub
├─ .env                     // 全局环境变量
├─ .eslintignore            // eslint忽略文件
├─ .eslintrc.js             // eslint配置文件
├─ .gitignore               // git忽略文件
├─ ansible                  // 部署相关脚本
├─ build
│  └─ release.js            // 构建打包发布前添加version.json表示当前git版本分支
├─ package.json             // npm package相关信息
├─ public                   // 静态资源
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
├─ src                      // 开发的主要源码
│  ├─ api                   // api接口相关，此处主要放公共的api。业务接口在页面模块中就行处理
│  │  ├─ modules
│  │  │  ├─ login.ts        // 登录相关接口
│  │  │  └─ public.ts       // 一些公共接口
│  │  └─ request.ts         // 接口请求的公共封装，包括拦截，token，401等的处理
│  ├─ App.vue               // vue入口
│  ├─ assets                // 项目内的资源，主要放图片等
│  ├─ components            // 公共组件文件放在这
│  ├─ directives            // 指令放在这
│  │  └─ index.ts 
│  ├─ global.d.ts           // 一些全局的ts的定义
│  ├─ icons                 // svg相关图标
│  │  ├─ index.js
│  │  └─ svg
│  ├─ layout                // 整体页面布局相关
│  │  ├─ components
│  │  │  ├─ Breadcrumb      // 面包屑
│  │  │  │  ├─ index.ts
│  │  │  │  └─ src
│  │  │  │     └─ index.vue
│  │  │  ├─ NavBar          // 顶部
│  │  │  │  ├─ index.ts
│  │  │  │  └─ src
│  │  │  │     └─ index.vue
│  │  │  ├─ Sidebar         // 左侧菜单
│  │  │  │  ├─ index.ts
│  │  │  │  └─ src
│  │  │  │     └─ index.vue
│  │  │  └─ TagsView        // 标签选项卡
│  │  │     ├─ index.ts
│  │  │     └─ src
│  │  │        └─ index.vue
│  │  └─ index.vue          // layout入口
│  ├─ main.ts               // 项目入口
│  ├─ mixins                // 全局mixin
│  │  └─ emitter.tsx
│  ├─ permission.ts         // 权限处理。添加router
│  ├─ public-path.js        // qiankun的微服务使用
│  ├─ router                // 路由相关
│  │  ├─ child.ts
│  │  ├─ index.ts
│  │  └─ static.ts
│  ├─ shims-tsx.d.ts        // ts的一些定义
│  ├─ shims-vue.d.ts        // ts的一些定义
│  ├─ store                 // 全局的一些store处理
│  │  ├─ index.ts           // store入口
│  │  └─ modules
│  │     ├─ app.ts          // 系统全局store
│  │     ├─ dict.ts         // 字典相关
│  │     ├─ table.ts        // 表格存储当前用户选择的表格显示字段相关
│  │     └─ user.ts         // 用户相关
│  ├─ styles                // 全局样式的处理
│  │  ├─ .gitignore
│  │  ├─ gulpfile.js
│  │  ├─ mixin.scss         // 全局的混入，会注入所有文件中
│  │  ├─ package.json
│  │  └─ src
│  │     ├─ base.scss
│  │     ├─ common
│  │     │  ├─ mixin.scss
│  │     │  └─ var.scss
│  │     ├─ cui.scss
│  │     ├─ index.scss
│  │     ├─ resetGlobal.scss
│  │     └─ SvgIcon.scss
│  ├─ types
│  │  └─ index.ts
│  ├─ utils                 // 全局的公共函数
│  │  ├─ index.ts
│  │  ├─ loading.js
│  │  ├─ socket
│  │  │  ├─ socket.js
│  │  │  └─ ws.js
│  │  ├─ storage
│  │  │  ├─ local.ts
│  │  │  └─ session.ts
│  │  ├─ store
│  │  │  ├─ index.js
│  │  │  ├─ jsonCode.js
│  │  │  ├─ jsonCodeConfig.js
│  │  │  ├─ proxyAjax.js
│  │  │  └─ proxyMemory.js
│  │  └─ validate.js
│  └─ views                 // 具体的页面开发文件夹
│     ├─ 404
│     │  ├─ index.ts
│     │  └─ src
│     │     └─ index.vue
│     ├─ assessmentmanagement // 当作为一个微服务的子应用时。所有的菜单都放在一个文件中方便区分
│     │  └─ home
│     │     ├─ index.ts
│     │     └─ src
│     │        ├─ api.js
│     │        ├─ assets
│     │        │  ├─ home_Ag.png
│     │        │  ├─ home_Au.png
│     │        │  └─ home_Cu.png
│     │        └─ index.vue
│     ├─ iframeTemplateEmpty
│     │  ├─ index.ts
│     │  └─ src
│     │     └─ index.vue
│     └─ login
│        ├─ index.ts
│        └─ src
│           ├─ index.module.scss
│           └─ index.tsx
├─ tsconfig.json
├─ vue.config.js
└─ 项目开发规范说明.docx
```

## 开发规范

- 代码格式规范，使用用项目中所配置的eslint进行格式化和规范

- 组件和页面结构遵循从上往下template，script，style的结构。为组件根元素设置一个class使用scss加scoped,一般所有样式放在根class下。一般不使用id，组件中使用id，首选随机id，需要外部使用的尽量外部使用ref获取组件。应尽量避免操作dom

- 组件：组件放入components中，必须命名name，文件名与组件名相同，以PascalCase(首字母大写)命名，以index.js导出组件，组件具体内容放在其下src文件夹中，具体文件结构参见components中的Editor文件。单个页面或模块中的组件，放在其目录下的components中

- 页面：页面放在views中，根据项目模块进行文件夹划分，一般根据菜单进行目录构建，使用kebab-case(短横线分割)的命名方式，每个页面中，使用index.js导出页面，页面内容放在src中进行编辑

- 样式：
  - 全局样式放入styles中。
  - 公共的scss放入styles/mixin中，mixin已全局注入，无需重复引入
  - 页面内，或组件内修改公共组件样式时，需要带上自定义的类名来增加命名空间。全局所有修改时不用添加，一般不建议全局修改
  - 父组件中修改子组件样式时，使用  `>>>`

- 注释：
  - 除开一些功能明了，过度统一的文件，所有文件头部必须添加注释，vscode中，可以使用这个插件进行注释koroFileHeader
  - data中的变量，注释一般放在其后
  - 方法的注释，需要说明方法用途，入参，出参
  - 在复杂的逻辑、临界、特殊情况的时候，需要添加注释说明
- 命名：使用英文，禁止使用中文以及拼音，js/文件名一般使用camelCase(驼峰命名),html使用kebab-case(短横线分割)
  - 组件：PascalCase(首字母大写)命名方式，导入后，在template中使用kebab-case,自闭合`<is-demo/>`
  - html：标签名使用kebab-case，class使用中横线连接
  - js：以一般使用cameCase命名变量，函数。
    - boolean类型变量使用"is"。"has","can","should"同理  例：isXxx
    - 常量使用大写加下横线
    - 事件监听函数使用 onXxxx
    - 作用域不大临时变量可以简写，比如：str，num，bol，obj，fun，arr。
    - 循环变量可以简写，比如：i，j，k 等。
- 使用箭头函数代替  let _this = this
- console.log(),debugger调试完成后要删除
- if,else，禁止使用简写，必须跟{}
- 表达式和语句应清晰、简洁，易于阅读和理解，避免使用晦涩难懂的	语句。使用圆括号明确表达式执行优先级

## git commit 规范

- type⽤于说明Commit的类型，包含以下7种类型：
  - feat：新功能（feature）
  - fix：修补bug
  - docs：文档（documentation）
  - style： 格式（不影响代码运行的变动）
  - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  - test：增加测试
  - chore：构建过程或辅助工具的变动

eg:

```bash
git commit -m "feat(views/login): 登录页功能及其接口对接"
```

## 开发说明

- 使用本地开发时，使用静态路由的方式如下
  1. env环境变量中，设置 VUE_APP_CAS="0", VUE_APP_LOCAL_MENU="1"
  2. 在router中static配置好静态路由

- 在env中配置项目名 VUE_APP_NAME 和 项目部署路径 VUE_APP_BASEURL，项目路径一般为/项目名/ ，考虑后期部署的情况不推荐使用 / 路径，在env中配置的环境变量，需要三个环境同时配置
- 在使用localStorage和sessionStorage时，key名需要在前面加上项目名和下划线，例：command_user
- layout页面布局请根据项目具体需求进行调整，可参考公司项目中的几种常见布局方式
- 调试接口时，在vue.config.js中配置代理，接口前缀路径开发，生产保持一致，上线是，能做到代理的一致性
- 所有接口放在 src/api/modules下面，进行分模块建文件，统一使用src/api/request.js作为基础请求对象，与所需业务不符时，使用axios或修改request.js
- 资源文件统一存放在src/assets中，引入的时候，尽量使用~@相对于src这种方式，能使用svg的资源，尽量使用svg
- svg文件放在src/icons/svg中，命名使用camelCase规则，禁止使用中文名

## 修订记录

| 序号 | 修改时间 | 修改人 | 版本 | 备注 |
| - |:-:|:-:|:-:|:-:|
| 1 | 2020-04-28 | 文林 | 0.1.0 | 初稿 |
