export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes:[
      {
        name:'一级页面(页面4)',
        path: '/childTwoPageFour',
        icon: 'smile',
        component: './One',
      }, 
      {
        name: '多级菜单',
        path: '/childTwoMenu',
        routes:[
          {
            name: '页面5',
            path: '/childTwoMenu/pageFive',
            component: './Two',
          },
          {
            name: '页面6',
            path: '/childTwoMenu/pageSix',
            component: './Three',
          },
        ]
      },
         
      {
        path: '/welcome',
        icon: 'smile',
        component: './Welcome',
      },      
    ]
  },
 
];
