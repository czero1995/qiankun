/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
 import RightContent from '@/components/GlobalHeader/RightContent';
 import TabPages from '@/components/TabPages';
 import type { ConnectState } from '@/models/connect';
 import Authorized from '@/utils/Authorized';
 import { GithubOutlined } from '@ant-design/icons';
 import type {
   BasicLayoutProps as ProLayoutProps, MenuDataItem,
 
   Settings
 } from '@ant-design/pro-layout';
 import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
 import { getMatchMenu } from '@umijs/route-utils';
 import { Button, Result } from 'antd';
 import React, { useEffect, useMemo, useRef } from 'react';
 import type { Dispatch } from 'umi';
 import { connect, history, Link } from 'umi';
 import logo from '../assets/logo.svg';
 
 const noMatch = (
   <Result
     status={403}
     title="403"
     subTitle="Sorry, you are not authorized to access this page."
     extra={
       <Button type="primary">
         <Link to="/user/login">Go Login</Link>
       </Button>
     }
   />
 );
 export type BasicLayoutProps = {
   breadcrumbNameMap: Record<string, MenuDataItem>;
   route: ProLayoutProps['route'] & {
     authority: string[];
   };
   settings: Settings;
   dispatch: Dispatch;
 } & ProLayoutProps;
 export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
   breadcrumbNameMap: Record<string, MenuDataItem>;
 };
 /** Use Authorized check all menu item */
 
 const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
   menuList.map((item) => {
     const localItem = {
       ...item,
       children: item.children ? menuDataRender(item.children) : undefined,
     };
     return Authorized.check(item.authority, localItem, null) as MenuDataItem;
   });
 
 const defaultFooterDom = (
   <DefaultFooter
     copyright={`${new Date().getFullYear()} Produced by Ant Group Experience Technology Department`}
     links={[
       {
         key: 'Ant Design Pro',
         title: 'Ant Design Pro',
         href: 'https://pro.ant.design',
         blankTarget: true,
       },
       {
         key: 'github',
         title: <GithubOutlined />,
         href: 'https://github.com/ant-design/ant-design-pro',
         blankTarget: true,
       },
       {
         key: 'Ant Design',
         title: 'Ant Design',
         href: 'https://ant.design',
         blankTarget: true,
       },
     ]}
   />
 );
 
 const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
   const {
     dispatch,
     children,
     settings,
     location = {
       pathname: '/',
     },
   } = props;
 
   const menuDataRef = useRef<MenuDataItem[]>([]);
 
  //  useEffect(() => {
  //    if (dispatch) {
  //      dispatch({
  //        type: 'user/fetchCurrent',
  //      });
  //    }
  //  }, []);
   /** Init variables */
 
   const handleMenuCollapse = (payload: boolean): void => {
     if (dispatch) {
       dispatch({
         type: 'global/changeLayoutCollapsed',
         payload,
       });
     }
   };
   // get children authority
   const authorized = useMemo(
     () =>
       getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
         authority: undefined,
       },
     [location.pathname],
   );
 
 
   return (
     <ProLayout
       logo={logo}
       {...props}
       {...settings}
       onCollapse={handleMenuCollapse}
       onMenuHeaderClick={() => history.push('/welcome')}
       menuItemRender={(menuItemProps, defaultDom) => {
         if (
           menuItemProps.isUrl ||
           !menuItemProps.path ||
           location.pathname === menuItemProps.path
         ) {
           return defaultDom;
         }
         return <Link to={menuItemProps.path}>{defaultDom}</Link>;
       }}
       breadcrumbRender={(routers = []) => [
 
         ...routers,
       ]}
       itemRender={(route, params, routes, paths) => {
         const first = routes.indexOf(route) === 0;
         return first ? (
           <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
         ) : (
           <span>{route.breadcrumbName}</span>
         );
       }}
       footerRender={() => {
         if (settings.footerRender || settings.footerRender === undefined) {
           return defaultFooterDom;
         }
         return null;
       }}
       menuDataRender={menuDataRender}
       rightContentRender={() => <RightContent />}
       postMenuData={(menuData) => {
         menuDataRef.current = menuData || [];
         return menuData || [];
       }}
       waterMarkProps={{
         content: 'Ant Design Pro',
         fontColor: 'rgba(24,144,255,0.15)',
       }}
     >
       <Authorized authority={authorized!.authority} noMatch={noMatch}>
       {/* <PageTabs 
             currentPathName = { location.pathname }
             routes = { props.route.routes }
           /> */}
       <TabPages {...props} maxTab="5" remberRefresh={false} animated={false} homePage="/welcome" errorPage="/404"/>
         {/* {children} */}
       </Authorized>
     </ProLayout>
   );
 };
 
 export default connect(({ global, settings }: ConnectState) => ({
   collapsed: global.collapsed,
   settings,
 }))(BasicLayout);
 