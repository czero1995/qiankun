export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        name:'主应用-React-首页',
        path: '/welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        name: '主应用-React-多级)',
        path: '/main',
        icon: 'smile',
        component: './One',
         routes:[
          {
            name:'主应用(main)-页面',
            path: '/main/one',
            icon: 'smile',
            component: './One',
          },
        ]
      },
      {
        name:'子应用1-React-页面一',
        path: '/childOnePageOne',
        icon: 'check-circle',
        microName:'app1',
        microApp:'app1'
      },
      {
        name:'子应用1-React-多级',
        icon:'check-circle',
        path: '/childOneMenu',
        routes:[
          {
            name:'app1-React-页面二',
            path: '/childOneMenu/pageTwo',
            microName:'app1',
          },
          {
            name:'app1-React-页面三',
            path: '/childOneMenu/pageThree',
            microName:'app1',
          },
        ]
      },
      {
        name:'子应用2-React-页面四',
        path: '/childTwoPageFour',
        icon: 'profile',
        microName:'app2',
      },
      {
        name:'子应用2-React-多级',
        icon:'profile',
        path: '/childTwoMenu',
        routes:[
          {
            name:'子应用2-React-页面五',
            path: '/childTwoMenu/pageFive',
            microName:'app2',
          },
          {
            name:'子应用2-React-页面六',
            path: '/childTwoMenu/pageSix',
            microName:'app2',
          },
        ]
      },
      {
        name:'子应用3-Vue-页面七',
        path: '/childThreePageSeven/index',
        icon: 'message',
        microName:'app3',
        microApp:'app3'
      }
    ],
  },
];
