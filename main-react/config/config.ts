// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  // chunks: ['vendors', 'umi'],
  // chainWebpack: function (config, { webpack }) {
  //   config.merge({
  //     optimization: {
  //       splitChunks: {
  //         chunks: 'all',
  //         minSize: 30000,
  //         minChunks: 3,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           vendor: {
  //             name: 'vendors',
  //             test({ resource }) {
  //               return /[\\/]node_modules[\\/]/.test(resource);
  //             },
  //             priority: 10,
  //           },
  //         },
  //       },
  //     }
  //   });
  // },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    antd: 'antd',
    moment:'moment'
  },  
  scripts: process.env.NODE_ENV === 'development' ? [
    'https://gw.alipayobjects.com/os/lib/react/16.8.6/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.8.6/umd/react-dom.development.js',
    // 'https://cdn.bootcdn.net/ajax/libs/antd/4.15.0/antd.js',
    'https://cdn.bootcdn.net/ajax/libs/moment.js/2.25.3/moment.js'

  ] : [
    'https://gw.alipayobjects.com/os/lib/react/16.8.6/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.8.6/umd/react-dom.production.min.js',
    // 'https://cdn.bootcdn.net/ajax/libs/antd/4.15.0/antd.js',
    'https://cdn.bootcdn.net/ajax/libs/moment.js/2.25.3/moment.js'

  ],
    qiankun: {
      master: {
        apps: [
          {
            name:'app1',
            entry: '//localhost:5001',
          },
          {
            name:'app2',
            entry: '//localhost:5002',
          },
          {
            name:'app3',
            entry: '//localhost:5003',
          }
        ],
        sandbox: true,  //是否启用沙箱
        prefetch: true, //是否启用prefetch特性
      }
    },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // 快速刷新功能 https://umijs.org/config#fastrefresh
  fastRefresh: {},
  esbuild: {},
  webpack5: {},
});
