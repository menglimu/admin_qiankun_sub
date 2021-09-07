import { createRandomId } from "@/utils";
import { FunItem } from "./permission";

export const staticRoutes: FunItem[] = [
  {
    id: createRandomId(),
    text: "外链",
    url: "https://www.baidu.com"
  },
  {
    id: createRandomId(),
    text: "首页",
    url: "/home"
  },
  {
    id: createRandomId(),
    text: "考核管理",
    url: "",
    children: [
      {
        id: createRandomId(),
        text: "cache缓存",
        url: "/cache"
      },
      {
        id: createRandomId(),
        text: "root下的菜单",
        url: "/root"
      },
      {
        id: createRandomId(),
        text: "外链",
        url: "https://www.baidu.com",
        orderNo: 3
      },
      {
        id: createRandomId(),
        text: "相对地址外链",
        url: "/http//12325",
        orderNo: 1
      },
      {
        id: createRandomId(),
        text: "iframe",
        url: "/iframe/https://www.baidu.com",
        orderNo: 2
      },
      {
        id: createRandomId(),
        text: "隐藏菜单",
        url: "/hide",
        nodeType: 3
      },
      {
        id: createRandomId(),
        text: "下面有按钮权限",
        url: "/normal",
        orderNo: 0,
        children: [
          {
            id: createRandomId(),
            text: "按钮",
            url: "add",
            nodeType: 3
          }
        ]
      },
      {
        id: createRandomId(),
        text: "嵌套菜单",
        url: "",
        children: [
          {
            id: createRandomId(),
            text: "菜单1",
            url: "/add1"
          },
          {
            id: createRandomId(),
            text: "菜单2",
            url: "/add2"
          }
        ]
      }
    ]
  },
  {
    id: "ANALYSISWARNING",
    text: "分析预警",
    leaf: false,
    expanded: true,
    url: "",
    children: [
      {
        id: "ANALYSISWARNING_01",
        text: "统计分析",
        leaf: false,
        expanded: true,
        url: "",
        children: [
          {
            children: [],
            expanded: true,
            icon: "",
            id: "ANALYSISWARNING_01.01",
            leaf: false,
            nodeType: 2,

            text: "结果研判",
            url: "/analysiswarning/resultjudge"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "ANALYSISWARNING_01.02",
            leaf: false,
            nodeType: 2,

            text: "指标考核统计",
            url: "/analysiswarning/indexassessmentstatistics"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "ANALYSISWARNING_01.03",
            leaf: false,
            nodeType: 2,

            text: "考核分数统计",
            url: "/analysiswarning/assessmentpointsort"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "ANALYSISWARNING_01.04",
            leaf: false,
            nodeType: 2,

            text: "街镇得分统计",
            url: "/analysiswarning/streetpointsort"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "ANALYSISWARNING_01.05",
            leaf: false,
            nodeType: 2,

            text: "社会治理视图",
            url: "/analysiswarning/socialgovernanceview"
          }
        ],
        icon: "nav_maincommand",
        nodeType: 0
      },
      {
        id: "ANALYSISWARNING_02",
        text: "预警管理",
        leaf: false,
        expanded: true,
        url: "",
        children: [
          {
            children: [],
            expanded: true,
            icon: "",
            id: "ANALYSISWARNING_02.01",
            leaf: false,
            nodeType: 2,

            text: "预警设置管理",
            url: "/analysiswarning/earlywarningset"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "ANALYSISWARNING_02.02",
            leaf: false,
            nodeType: 2,

            text: "预警记录查询",
            url: "/analysiswarning/earlywarningquery"
          }
        ],
        icon: "nav_maincommand",
        nodeType: 0
      },
      {
        id: "ANALYSISWARNING_03",
        text: "模板管理",
        leaf: false,
        expanded: true,
        url: "",
        children: [
          {
            children: [],
            expanded: true,
            icon: "",
            id: "ANALYSISWARNING_03.01",
            leaf: false,
            nodeType: 2,

            text: "统计模板管理",
            url: "/analysiswarning/statisticstemplateset"
          }
        ],
        icon: "nav_maincommand",
        nodeType: 0
      }
    ]
  },
  {
    id: "HANDOVERSUPERVISE",
    text: "交办督办",
    leaf: false,
    expanded: true,
    url: "",
    children: [
      {
        id: "HANDOVERSUPERVISE_01",
        text: "督办管理",
        leaf: false,
        expanded: true,
        url: "",
        children: [
          {
            children: [],
            expanded: true,
            icon: "",
            id: "HANDOVERSUPERVISE_01.01",
            leaf: false,
            nodeType: 2,

            text: "基础信息管理",
            url: "/handoversupervise/baseinfoset"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "HANDOVERSUPERVISE_01.02",
            leaf: false,
            nodeType: 2,

            text: "督办记录",
            url: "/handoversupervise/supervisionrecord"
          }
        ],
        icon: "nav_maincommand",
        nodeType: 0
      },
      {
        id: "HANDOVERSUPERVISE_02",
        text: "交办管理",
        leaf: false,
        expanded: true,
        url: "",
        children: [
          {
            children: [],
            expanded: true,
            icon: "",
            id: "HANDOVERSUPERVISE_02.01",
            leaf: false,
            nodeType: 2,

            text: "下发任务",
            url: "/handoversupervise/issuemission"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "HANDOVERSUPERVISE_02.02",
            leaf: false,
            nodeType: 2,

            text: "我的任务",
            url: "/handoversupervise/mymission"
          }
        ],
        icon: "nav_maincommand",
        nodeType: 0
      }
    ]
  },
  {
    id: "SYSTEMSETTING",
    text: "系统管理",
    leaf: false,
    expanded: true,
    url: "",
    children: [
      {
        id: "SYSTEMSETTING_01",
        text: "资料库管理",
        leaf: false,
        expanded: true,
        url: "",
        children: [
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_01.01",
            leaf: false,
            nodeType: 2,

            text: "基础信息管理",
            url: "/systemsetting/librarybaseinfoset"
          }
        ],
        icon: "nav_maincommand",
        nodeType: 0
      },
      {
        id: "SYSTEMSETTING_02",
        text: "工作交流",
        leaf: false,
        expanded: true,
        url: "",
        children: [
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_02.01",
            leaf: false,
            nodeType: 2,

            text: "基础信息管理",
            url: "/systemsetting/workcommunicationbaseinfoset"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_02.02",
            leaf: false,
            nodeType: 2,

            text: "信息采用",
            url: "/systemsetting/informationadoption"
          }
        ],
        icon: "nav_maincommand",
        nodeType: 0
      },
      {
        id: "SYSTEMSETTING_03",
        text: "消息管理",
        leaf: false,
        expanded: true,
        url: "",
        children: [
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_03.01",
            leaf: false,
            nodeType: 2,

            text: "收件箱",
            url: "/systemsetting/msginbox"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_03.02",
            leaf: false,
            nodeType: 2,

            text: "发件箱",
            url: "/systemsetting/msgsendbox"
          }
        ],
        icon: "nav_maincommand",
        nodeType: 0
      },
      {
        id: "SYSTEMSETTING_04",
        text: "通讯录管理",
        leaf: false,
        expanded: true,
        url: "",
        children: [
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_04.01",
            leaf: false,
            nodeType: 2,

            text: "基础信息管理",
            url: "/systemsetting/maillistbaseinfoset"
          }
        ],
        icon: "nav_maincommand",
        nodeType: 0
      },
      {
        id: "SYSTEMSETTING_05",
        text: "账号管理",
        leaf: false,
        expanded: true,
        url: "",
        children: [
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_05.01",
            leaf: false,
            nodeType: 2,

            text: "账号认证",
            url: "/systemsetting/accountauthentication"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_05.02",
            leaf: false,
            nodeType: 2,

            text: "找回密码",
            url: "/systemsetting/retrievepassword"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_05.03",
            leaf: false,
            nodeType: 2,

            text: "修改密码",
            url: "/systemsetting/editpassword"
          }
        ],
        icon: "nav_maincommand",
        nodeType: 0
      },
      {
        id: "SYSTEMSETTING_06",
        text: "系统设置",
        leaf: false,
        expanded: true,
        url: "",
        children: [
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_06.01",
            leaf: false,
            nodeType: 2,

            text: "菜单管理",
            url: "/systemsetting/auth/menus"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_06.02",
            leaf: false,
            nodeType: 2,

            text: "用户管理",
            url: "/systemsetting/auth/users"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_06.03",
            leaf: false,
            nodeType: 2,

            text: "角色管理",
            url: "/systemsetting/auth/roles"
          },
          {
            children: [],
            expanded: true,
            icon: "",
            id: "SYSTEMSETTING_06.04",
            leaf: false,
            nodeType: 2,

            text: "字典管理",
            url: "/systemsetting/dict"
          }
        ],
        icon: "nav_maincommand",
        nodeType: 0
      }
    ]
  }
];
