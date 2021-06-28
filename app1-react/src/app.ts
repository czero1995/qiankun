
const isQiankun = window.__POWERED_BY_QIANKUN__

export const qiankun = {
    // 应用加载之前
    async bootstrap(props) {
      console.log('app1 bootstrap', props);
    },
    // 应用 render 之前触发
    async mount(props) {
      console.log('app1 mount', props);
    },
    // 应用卸载之后触发
    async unmount(props) {
      console.log('app1 unmount', props);
    },
  };


  export async function patchRoutes({routes}) {
    if(isQiankun){
      routes[0]['component'] = require('@/layouts/BlankLayout').default
    }
    // if( isQiankun ){
    // }else{
    //   const authRoutes = Auth.authRoutes
    //   const homeRoutes = findHomeRoute(routes)
    //   if (authRoutes.length) {
    //     let routesTree = generateRoutesTree(uniqBy(authRoutes,'resourceId'),'resourceCode','parentResourceCode')
    //     routesTree = createNewRoutes(routesTree, homeRoutes)
    //     console.log('routesTree', routesTree)
    //     // routes.push({ path: '/test', name: 'test', component: './404' })
    //     homeRoutes['routes'] = routesTree
    //   } else {
    //     homeRoutes['routes'] = []
    //     message.error('账号未开通权限！')
    //   }
    // }
  }