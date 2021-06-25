export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        name:'首页',
        path: '/welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        name: '主应用 - Ant Design Pro',
        path: '/mainOne',
        icon: 'smile',
        component: './One',
      },
      {
        name:'子应用1 - 页面一',
        path: '/childOnePageOne',
        icon: 'smile',
        microName:'app1',
        microApp:'app1'
      },
      {
        name:'子应用1(多级) ',
        icon:'smile',
        path: '/childOneMenu',
        routes:[
          {
            name:'子应用1 - 页面二',
            path: '/childOneMenu/pageTwo',
            icon: 'smile',
            microName:'app1',
          },
          {
            name:'子应用1 - 页面三',
            path: '/childOneMenu/pageThree',
            icon: 'smile',
            microName:'app1',
          },
        ]
      },
      {
        name:'子应用2 - 页面四',
        path: '/childTwoPageFour',
        icon: 'smile',
        microName:'app2',
      },
      {
        name:'子应用2',
        icon:'smile',
        path: '/childTwoMenu',
        routes:[
          {
            name:'子应用2 - 页面五',
            path: '/childTwoMenu/PageFive',
            microName:'app2',
          },
          {
            name:'子应用2 - 页面六',
            path: '/childTwoMenu/pageSix',
            microName:'app2',
          },
        ]
      },
      {
        name:'子应用3 - ',
        path: '/form',
        icon: 'smile',
        routes:[
          {
            name:'子应用3 - 页面七',
            path: '/form/index',
            microName:'app3',
          },
        ]
      },
     
    ],
  },
];
