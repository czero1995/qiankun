# qiankun项目实践和优化(React+Vue)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/627878d9529042fd85a577fdf59ad6b5~tplv-k3u1fbpfcp-zoom-1.image)
## 前言
qiankun微服务,将多个不同技术栈的系统(React,Vue,Angular,jQuery)等聚合成一个系统,各个系统又能各自独立部署运行,适用于大型团队和大型前端项目。

### 实现功能:

   * 引入多技术栈(React + Vue)
   * 后台管理系统(Ant Design Pro)多标签页在qiankun环境缓存的实践
   * 依赖共享 --- 主子应用公共的包react,react-dom,moment,antd等)的共享
   * 资源公用 --- 共用的工具util, 组件，配置在多个项目同步


基于qiankun微服务的在线预览:

[点击预览效果](http://qiankun.fancystore.cn) 

## 项目架构

|            项目            |        技术栈        | 端口 |                  访问地址                   |
| :------------------------: | :------------------: | :--: | :-----------------------------------------: |
|     主项目(main-react)     |    Ant Design Pro    | 5000 |        http://qiankun.fancystore.cn         |
|    子项目1(app1-react)     |    Ant Design Pro    | 5001 |          http://app1.fancystore.cn          |
|    子项目2(app2-react)     |    Ant Design Pro    | 5002 |          http://app2.fancystore.cn          |
|     子项目3(app3-vue)      | Vue Element Template | 5003 |          http://app3.fancystore.cn          |
| 公共资源库(qiankun-common) |      TypeScript      |      | https://github.com/czero1995/qiankun-common |



## 项目改造

### 1. 主应用(基座)

#### 1.1 安装qiankun

       npm install @umi/qiankun --save   
       or
       yarn add @umi/qiankun --save    
#### 1.2 注册子应用
      // 在config/config.ts加入
        qiankun: {
          master: {
            apps: [
               {
                  name:'app1',
                  entry: process.env.NODE_ENV === 'production' ? '//app1.fancystore.cn' : '//localhost:5001',
                },
                {
                  name:'app2',
                  entry: process.env.NODE_ENV === 'production' ? '//app2.fancystore.cn:' : '//localhost:5002',
                },
                {
                  name:'app3',
                  entry: process.env.NODE_ENV === 'production' ? '//app3.fancystore.cn:' : '//localhost:5003',
                },
            ],
            sandbox: true,  //是否启用沙箱
            prefetch: true, //是否启用prefetch特性
          }
        }
#### 1.3 修改根节点 
        // src/pages/document.ejs
        id=root-master
#### 1.4 新建子应用装载布局MicroAppLayout
        // src/layouts/MicroAppLayout
        import BasicLayout from '@ant-design/pro-layout';
        import { KeepAlive, Provider } from 'react-keep-alive';
        import { MicroAppWithMemoHistory } from 'umi';
        import allRoutes from '../../config/routes';
    
        function MicroAppLayout(props) {
          let targetMicro = ''
          const transRoutes = (routes, pathname) => {
            routes.map(item => {
              if (item.routes) {
                return transRoutes(item.routes, pathname)
              }
              if (item.path === pathname) {
                targetMicro = item.microName
              }
            })
            return targetMicro
          }
          return <Provider>
            <KeepAlive name={props.location.pathname}>
              {
                targetMicro ? <MicroAppWithMemoHistory name={transRoutes(allRoutes[0].routes, props.location.pathname)} url={props.location.pathname} /> :
                  <BasicLayout></BasicLayout>
              }
            </KeepAlive>
          </Provider>
        }
    
        export default MicroAppLayout;
### 1.5 在src目录下新建app.ts,判断如果是子应用，需要用MicroAppLayout装载
        // src/app.ts
        import LoadingComponent from '@/components/PageLoading';
        import { dynamic } from 'umi';
        const transRoutes = (routes) => {
          routes.forEach(item => {
            if(item.routes){
              return transRoutes(item.routes)
            }
            if(item.microName){
              item.component = dynamic({
                loader: (a) => import(/* webpackChunkName: 'layouts__MicroAppLayout' */ '@/layouts/MicroAppLayout'),
                loading: LoadingComponent,
              })
            }
          })
        }
    
        export function patchRoutes({ routes }) {
          transRoutes(routes[0].routes)
        }

 ### 2. 子应用React(Ant Desin Pro)

 #### 2.1 安装qiankun

        npm install @umi/qiankun --save   
        or
        yarn add @umi/qiankun --save

 #### 2.2 子项目注册qiankun,在config/config.ts加入

        qiankun: {
            slave: {}
        }
 #### 2.3  修改根节点 src/pages/document.ejs

        id=root-slave
 #### 2.4 在src目录下新建app.ts,导出相应的生命周期钩子,子项目需要去区分好是qiankun环境还是当前环境,如果是qiankun环境,使用空白的模板(src/layouts/BlankLayout),如果是当前环境，使用默认的模板(src/layouts/BasicLayout),这样能内嵌到qiankun环境下运行也能独立开发部署

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
### 3. 子应用Vue(Vue-Element-Template) 
#### 3.1 在vue.config.js下的configureWebpack中加入
         output: {
          // 把子应用打包成 umd 库格式(必须)
          library: `${name}-[name]`,
          libraryTarget: 'umd',
          jsonpFunction: `webpackJsonp_${name}`,
         }

#### 3.2 在vue.config.js下的devServer中加入:
         headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
              "Access-Control-Allow-Headers": "*"
         }
#### 3.3 在main.js中暴露qiankun的生命周期:
        let install = null;
        function render(props) {
          install = new Vue({
            router,
            store,
            render: h => h(App)
          }).$mount('#app3')
        }
        if (window.__POWERED_BY_QIANKUN__) {
          __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
        } else {
          render();
        }
        export async function bootstrap(props) {
        }
        export async function mount(props) {
          render(props);
        }
        export async function unmount(props) {
          install.$destroy();
          install = null
        }

### 项目总结

   1. 主应用装载子应用有两种形式 使用路由绑定的方式 和 使用 **<MicroApp '/>** 组件的方式，如果要支持**Ant Design Pro多标签页**，需要使用 **<MicroApp '/>** 这种形式，因为动态的显示插入Tab，绑定死路由的话会造成qiankun加载不到对应的页面。
   
   2. **Ant Design Pro多标签页**,点击标签页的展示不同的应用页面会导致被销毁,内容数据被初始化和丢失,在src/layouts/MicroAppLayout下:
   
          引入 react-keep-alive 包
          主应用须使用  MicroAppWithMemoHistory,  若使用 MicroApp 无效果。
      
   3. qiankun环境下页面跳转404
   
          在qiankun环境下,所有的路由改动都会涉会触发qiankun的路由监听,需要对环境做出判断:
          export const qiankunJump = (url:string,name='页面名称',params = null) =>{
                window.__POWERED_BY_QIANKUN__ ? history.pushState(params,name,url): umiHistory.push(url)
          }
          qiankunJump('/xxx')
   4. qiankun external会报 Cannot read property 'createContext' of undefind
   
           子项目是umi项目,只要配置了externals就会出错,需要更改exteranls的写法,去掉window
           externals: {
                'react': 'window.React',
                'react-dom': 'window.ReactDOM',
            } => 
            externals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
            }

### 项目优化

#### 1. 依赖共享

     如果主子应用使用的是相同的库或者包(react,react-dom,moment等),可以用externals的方式来引入，减少加载重复包导致资源浪费. 
     
     qiankun将子项目的外链script标签内容请求完后，会记录到一个全局变量中，下次再次使用，他会先从这个全局变量中取。这样就会实现内容的复用，只要保证两个链接的Url一致即可
    const fetchScript = scriptUrl => scriptCache[scriptUrl] || (scriptCache[scriptUrl] = fetch(scriptUrl).then(response => response.text()));
    
    所以只要子项目配置了webpack的externals,这些公共依赖在同一台服务器上，就可以实现子项目的公共依赖的按需引入，一个项目使用了之后，另一个项目不再重复加载，可以直接复用这个文件。

#### 2.资源共用
    解决资源共用的问题，可以提高项目的维护性,不然多个系统共用的组件或者工具维护起来很费力。
    
    1. 常用的就是发布成npm包，各个项目去安装更新包。本地调试可以用npm link。但反复的更新包也是比较繁琐。
    
    2. 还有一种方式是用git库引入, 在package.json的依赖中加入 
    "qiankun-common": "git+https://git@github.com:czero1995/qiankun-common.git"
    使用
    import { commonUtil } from 'qiankun-common';
    util.qiankunJump('/xxx')


 ### 项目启动

    1. 进入main-react
        npm install
        npm run start
    2. 进入app1-react
        npm install
        npm run start
    3. 进入app2-react
        npm install
        npm run start
    4. 进入app3-react
        npm install
        npm run dev
 ### 项目部署

   1. 子应用Nginx需要配上跨域请求头:
   
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Credentials true;
            add_header Cache-Control no-cache;
   2. Nginx开启gzip压缩:
           
            gzip  on;
            gzip_min_length 200;
            gzip_buffers 4 16k;
            gzip_comp_level 9;
            gzip_vary on;
            gzip_disable "MSIE [1-6]\.";
            gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/javascript application/json;