import { MenuAsync } from '@/types'
export const staticRoutes: MenuAsync[] = [
  {
    id: 'ASSESSMENTMANAGEMENT',
    text: '考核管理',
    leaf: false,
    expanded: true,
    url: '',
    children: [
      {
        id: 'ASSESSMENTMANAGEMENT_01',
        text: '首页',
        leaf: false,
        expanded: true,
        url: '/assessmentmanagement/home',
        children: [],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'ASSESSMENTMANAGEMENT_02',
        text: '考核指标概览',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_02.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '考核指标查询',
            url: '/assessmentmanagement/targetquery',
            pids: ['ASSESSMENTMANAGEMENT_02', 'ASSESSMENTMANAGEMENT_02.01']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'ASSESSMENTMANAGEMENT_03',
        text: '考核指标管理',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_03.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '考核指标设置',
            url: '/assessmentmanagement/targetmanage',
            pids: ['ASSESSMENTMANAGEMENT_03', 'ASSESSMENTMANAGEMENT_03.01']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_03.02',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '考核指标列表',
            url: '/assessmentmanagement/targetproject',
            pids: ['ASSESSMENTMANAGEMENT_03', 'ASSESSMENTMANAGEMENT_03.02']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'ASSESSMENTMANAGEMENT_04',
        text: '考核指标填报',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_04.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '考核指标填报',
            url: '/assessmentmanagement/targetfillin',
            pids: ['ASSESSMENTMANAGEMENT_04', 'ASSESSMENTMANAGEMENT_04.01']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_04.02',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '逾期指标概览',
            url: '/assessmentmanagement/targetoverview',
            pids: ['ASSESSMENTMANAGEMENT_04', 'ASSESSMENTMANAGEMENT_04.02']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'ASSESSMENTMANAGEMENT_05',
        text: '考核分数管理',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_05.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '考核指标评估',
            url: '/assessmentmanagement/targetassessment',
            pids: ['ASSESSMENTMANAGEMENT_05', 'ASSESSMENTMANAGEMENT_05.01']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'ASSESSMENTMANAGEMENT_06',
        text: '专项工作管理',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_06.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '难点任务',
            url: '/assessmentmanagement/difficulttask',
            pids: ['ASSESSMENTMANAGEMENT_06', 'ASSESSMENTMANAGEMENT_06.01']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_06.02',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '难点任务概览',
            url: '/assessmentmanagement/difficulttaskview',
            pids: ['ASSESSMENTMANAGEMENT_06', 'ASSESSMENTMANAGEMENT_06.02']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_06.03',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '示范性突破项目申报',
            url: '/assessmentmanagement/exampleprojectapply',
            pids: ['ASSESSMENTMANAGEMENT_06', 'ASSESSMENTMANAGEMENT_06.03']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_06.04',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '示范性突破项目概览',
            url: '/assessmentmanagement/exampleprojectview',
            pids: ['ASSESSMENTMANAGEMENT_06', 'ASSESSMENTMANAGEMENT_06.04']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_06.05',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '重点项目',
            url: '/assessmentmanagement/keyproject',
            pids: ['ASSESSMENTMANAGEMENT_06', 'ASSESSMENTMANAGEMENT_06.05']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ASSESSMENTMANAGEMENT_06.06',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '重点项目概览',
            url: '/assessmentmanagement/keyprojectview',
            pids: ['ASSESSMENTMANAGEMENT_06', 'ASSESSMENTMANAGEMENT_06.06']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      }
    ]
  },
  {
    id: 'ANALYSISWARNING',
    text: '分析预警',
    leaf: false,
    expanded: true,
    url: '',
    children: [
      {
        id: 'ANALYSISWARNING_01',
        text: '统计分析',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ANALYSISWARNING_01.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '结果研判',
            url: '/analysiswarning/resultjudge',
            pids: ['ANALYSISWARNING_01', 'ANALYSISWARNING_01.01']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ANALYSISWARNING_01.02',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '指标考核统计',
            url: '/analysiswarning/indexassessmentstatistics',
            pids: ['ANALYSISWARNING_01', 'ANALYSISWARNING_01.02']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ANALYSISWARNING_01.03',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '考核分数统计',
            url: '/analysiswarning/assessmentpointsort',
            pids: ['ANALYSISWARNING_01', 'ANALYSISWARNING_01.03']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ANALYSISWARNING_01.04',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '街镇得分统计',
            url: '/analysiswarning/streetpointsort',
            pids: ['ANALYSISWARNING_01', 'ANALYSISWARNING_01.04']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ANALYSISWARNING_01.05',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '社会治理视图',
            url: '/analysiswarning/socialgovernanceview',
            pids: ['ANALYSISWARNING_01', 'ANALYSISWARNING_01.05']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'ANALYSISWARNING_02',
        text: '预警管理',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ANALYSISWARNING_02.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '预警设置管理',
            url: '/analysiswarning/earlywarningset',
            pids: ['ANALYSISWARNING_02', 'ANALYSISWARNING_02.01']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ANALYSISWARNING_02.02',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '预警记录查询',
            url: '/analysiswarning/earlywarningquery',
            pids: ['ANALYSISWARNING_02', 'ANALYSISWARNING_02.02']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'ANALYSISWARNING_03',
        text: '模板管理',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'ANALYSISWARNING_03.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '统计模板管理',
            url: '/analysiswarning/statisticstemplateset',
            pids: ['ANALYSISWARNING_03', 'ANALYSISWARNING_03.01']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      }
    ]
  },
  {
    id: 'HANDOVERSUPERVISE',
    text: '交办督办',
    leaf: false,
    expanded: true,
    url: '',
    children: [
      {
        id: 'HANDOVERSUPERVISE_01',
        text: '督办管理',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'HANDOVERSUPERVISE_01.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '基础信息管理',
            url: '/handoversupervise/baseinfoset',
            pids: ['HANDOVERSUPERVISE_01', 'HANDOVERSUPERVISE_01.01']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'HANDOVERSUPERVISE_01.02',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '督办记录',
            url: '/handoversupervise/supervisionrecord',
            pids: ['HANDOVERSUPERVISE_01', 'HANDOVERSUPERVISE_01.02']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'HANDOVERSUPERVISE_02',
        text: '交办管理',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'HANDOVERSUPERVISE_02.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '下发任务',
            url: '/handoversupervise/issuemission',
            pids: ['HANDOVERSUPERVISE_02', 'HANDOVERSUPERVISE_02.01']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'HANDOVERSUPERVISE_02.02',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '我的任务',
            url: '/handoversupervise/mymission',
            pids: ['HANDOVERSUPERVISE_02', 'HANDOVERSUPERVISE_02.02']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      }
    ]
  },
  {
    id: 'SYSTEMSETTING',
    text: '系统管理',
    leaf: false,
    expanded: true,
    url: '',
    children: [
      {
        id: 'SYSTEMSETTING_01',
        text: '资料库管理',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_01.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '基础信息管理',
            url: '/systemsetting/librarybaseinfoset',
            pids: ['SYSTEMSETTING_01', 'SYSTEMSETTING_01.01']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'SYSTEMSETTING_02',
        text: '工作交流',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_02.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '基础信息管理',
            url: '/systemsetting/workcommunicationbaseinfoset',
            pids: ['SYSTEMSETTING_02', 'SYSTEMSETTING_02.01']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_02.02',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '信息采用',
            url: '/systemsetting/informationadoption',
            pids: ['SYSTEMSETTING_02', 'SYSTEMSETTING_02.02']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'SYSTEMSETTING_03',
        text: '消息管理',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_03.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '收件箱',
            url: '/systemsetting/msginbox',
            pids: ['SYSTEMSETTING_03', 'SYSTEMSETTING_03.01']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_03.02',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '发件箱',
            url: '/systemsetting/msgsendbox',
            pids: ['SYSTEMSETTING_03', 'SYSTEMSETTING_03.02']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'SYSTEMSETTING_04',
        text: '通讯录管理',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_04.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '基础信息管理',
            url: '/systemsetting/maillistbaseinfoset',
            pids: ['SYSTEMSETTING_04', 'SYSTEMSETTING_04.01']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'SYSTEMSETTING_05',
        text: '账号管理',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_05.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '账号认证',
            url: '/systemsetting/accountauthentication',
            pids: ['SYSTEMSETTING_05', 'SYSTEMSETTING_05.01']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_05.02',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '找回密码',
            url: '/systemsetting/retrievepassword',
            pids: ['SYSTEMSETTING_05', 'SYSTEMSETTING_05.02']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_05.03',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '修改密码',
            url: '/systemsetting/editpassword',
            pids: ['SYSTEMSETTING_05', 'SYSTEMSETTING_05.03']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      },
      {
        id: 'SYSTEMSETTING_06',
        text: '系统设置',
        leaf: false,
        expanded: true,
        url: '',
        children: [
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_06.01',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '菜单管理',
            url: '/systemsetting/auth/menus',
            pids: ['SYSTEMSETTING_06', 'SYSTEMSETTING_06.01']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_06.02',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '用户管理',
            url: '/systemsetting/auth/users',
            pids: ['SYSTEMSETTING_06', 'SYSTEMSETTING_06.02']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_06.03',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '角色管理',
            url: '/systemsetting/auth/roles',
            pids: ['SYSTEMSETTING_06', 'SYSTEMSETTING_06.03']
          },
          {
            children: [],
            expanded: true,
            icon: '',
            id: 'SYSTEMSETTING_06.04',
            leaf: false,
            nodeType: 2,
            systemType: 0,
            text: '字典管理',
            url: '/systemsetting/dict',
            pids: ['SYSTEMSETTING_06', 'SYSTEMSETTING_06.04']
          }
        ],
        icon: 'nav_maincommand',
        nodeType: 0,
        systemType: 0,
        pids: []
      }
    ]
  }
]
