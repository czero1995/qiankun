
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
  }