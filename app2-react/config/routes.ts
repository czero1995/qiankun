export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes:[
      {
        name:'一级页面(页面4)',
        path: '/childTwoPageFour',
        icon: 'smile',
        component: './Four',
      }, 
      {
        name: '多级菜单',
        path: '/childTwoMenu',
        routes:[
          {
            name: '页面5',
            path: '/childTwoMenu/pageFive',
            component: './Five',
          },
          {
            name: '页面6',
            path: '/childTwoMenu/pageSix',
            component: './Six',
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
