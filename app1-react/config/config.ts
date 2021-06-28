import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV } = process.env;
import { commonConfig } from 'qiankun-common';
export default defineConfig({
  hash: true,
  chunks: commonConfig.chunks,
  chainWebpack: commonConfig.chainWebpack,
  externals: commonConfig.externals,
  scripts: commonConfig.scripts,
  antd: {},
  dva: {
    hmr: true,
  },
  qiankun: {
    slave: {},
  },
  mountElementId:'root-slave',
  history: {
    type: 'browser',
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
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
  routes,
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  // manifest: {
  //   basePath: '/',
  // },
  base: '/app1',
  fastRefresh: {},
  esbuild: {},
  webpack5: {},
});
