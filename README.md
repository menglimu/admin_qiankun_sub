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
├── ansible/                             // 自动化相关脚本
│
├── build/                               // 构建目录
│   ├── bin/                                // 构建脚本目录
│   │   └── route.js                        // 根据 views 目录文件自动生成路由配置脚本
│   └── mock.js                             // 无需重启自动加载 mock 数据脚本
│
├── docs/                                // 公司一些公共组件和mixin的使用说明，需要自己引入组件
│
├── env                                 // 环境变量配置
│   
├── public/                              // vue-cli 静态页面模板目录
│   ├── favicon.ico                         // 站点图标
│   └── index.html                          // 站点主页模板
│
├── src/                                 // 源码目录
│   ├── main.js                             // 项目入口 js 文件
│   ├── permission.js                       // 进入路由权限判断
│   ├── App.vue                             // 入口页面组件
│   ├── api/                                // api 接口目录
│   │   ├── request.js                      // 基于axios进行请求的二次封装
│   │   ├── login.js                        // 封装 login 相关接口请求
│   │   └── modules/                        // 业务请求分模块放入其中
│   │ 
│   ├── assets/                          // 静态资源目录
│   │ 
│   ├── components/                      // 静态资源目录
│   │   ├── Editor                          // 组件结构demo
│   
│   ├── icons/                           // icon 目录
│   │   ├── index.js                        // 全局注册 svg icon 组件
│   │   └── svg/                            // svg 文件目录
│   │       ├── example.svg
│   │       ├── ...
│   │ 
│   ├── layout/                          // 页面框架目录
│   │    ├── LayoutComponents/              // 公司封装的布局组件，具体使用参考其文档
│   │    ├── Message/                       // 消息通知，目前好像没有使用
│   │    ├── Header.vue                     // 顶部
│   │    ├── index.vue                      // 入口布局框架入口
│   │    ├── Sidebar.vue                    // 左侧菜单
│   │    └── store.js                       // 消息相关store
│   │
│   ├── router/                          // 路由目录
│   │   ├── child.js                        // 二级页面，不需后台权限配置，直接注入
│   │   ├── index.js                        // 生成路由配置，并导出 router 实例
│   │   └── static.js                       // 静态路由，不使用后台配置权限的时候使用本地静态路由
│   │
│   ├── components/                      // 组件目录
│   │   ├── Tree                            // tree 视图业务组件目录
│   │   │   └── TreeRender.vue              // tree 操作菜单项渲染组件
│   │   ├── ScrollBar/                      // 左侧边栏滚动组件目录
│   │   │   └── index.vue                   // 左侧边栏滚动组件
│   │   ├── ScrollPane/                     // 顶部标签切换滚动组件目录
│   │   │   └── index.vue                   // 顶部标签切换滚动组件
│   │   └── SvgIcon/                        // svg icon 组件目录
│   │       └── index.vue                   // svg icon 组件
│   │ 
│   ├── store/                           // vuex
│   │   ├── index.js                        // 导出 vuex 实例
│   │   └── modules/                        // modules 目录
│   │       ├── app.js                      // app 模块
│   │       ├── user.js                     // user 模块
│   │       ├── tagsView.js                 // tagsView 模块
│   │       └── ...
│   │ 
│   ├── styles/                          // 样式目录
│   │   ├── cui.scss                        // 针对 cui 库样式
│   │   ├── index.scss                      // 一些全局样式
│   │   ├── mixin.scss                      // 框架mixin
│   │   ├── _mixin.scss                     // 自定义的一些
│   │   ├── sidebar.scss                    // 针对 sidebar 样式
│   │   ├── transition.scss                 // transition
│   │   └── variables.scss                  // 定义项目中使用的样式变量
│   │ 
│   ├── utils/                           // 工具函数目录
│   │   ├── map/                            // 地图相关
│   │   │    ├── mapconfig.js                   // 地图初始化参数
│   │   │    ├── mapHelper.js                   // 地图实例化工具
│   │   │    └── markerRotate.js                // marker旋转插件
│   │   │
│   │   ├── socket/                         // websocket相关
│   │   │    ├── socket.js                      // websocket封装
│   │   │    └── ws.js                          // websocket使用类
│   │   │
│   │   ├── storage/                         // 浏览器存储相关
│   │   │    ├── local.js                      // localStorage
│   │   │    └── session.js                    // sessionStorage
│   │   │
│   │   ├── auth.js                         // 操作 cookie 相关函数
│   │   ├── createRoutes.js                 // 根据目录文件生成路由配置函数
│   │   ├── index.js                        // 常规工具函数
│   │   └── validate.js                     // 常见正则验证
│   │ 
│   ├── views/                           // 页面目录
│   │   ├── 404.vue                         // 404页面
│   │   ├── iframeTemplateEmpty.vue         // 插入iframe异常的默认文件
│   │
│   ├── App.vue                          // vue入口
│   ├── main.js                          // 项目入口
│   └── permission.js                    // 权限相关处理以及拦截
│   
├── package.json                            // 项目依赖文件
└── vue.config.js                           // 项目 vue webpack 配置文件

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