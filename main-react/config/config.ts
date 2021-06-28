import { commonConfig } from 'qiankun-common';
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: { hmr: true},
  chunks: commonConfig.chunks,
  chainWebpack: commonConfig.chainWebpack,
  externals: commonConfig.externals,
  scripts: commonConfig.scripts,
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
  },
  history: {
    type: 'browser',
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  routes,
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  fastRefresh: {},
  esbuild: {},
  webpack5: {},
});
