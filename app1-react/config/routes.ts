export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes:[
      {
        name:'一级页面(页面1)',
        path: '/childOnePageOne',
        icon: 'smile',
        component: './One',
      }, 
      {
        name: '多级菜单',
        path: '/childOneMenu',
        routes:[
          {
            name: '页面2',
            path: '/childOneMenu/pageTwo',
            component: './Two',
          },
          {
            name: '页面3',
            path: '/childOneMenu/pageThree',
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
