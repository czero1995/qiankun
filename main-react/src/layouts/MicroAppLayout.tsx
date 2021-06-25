import { transRoutes } from '@/utils/utils';
import BasicLayout from '@ant-design/pro-layout';
import React from 'react';
import { KeepAlive, Provider } from 'react-keep-alive';
import { MicroAppWithMemoHistory } from 'umi';
import allRoutes from '../../config/routes';

function MicroAppLayout(props) {
    const targetMicro = transRoutes(allRoutes[0].routes, props.location.pathname)
    console.log('targetMicro: ', targetMicro);
  return  <Provider>
  <KeepAlive name={props.location.pathname}>
    {
        targetMicro ?  <MicroAppWithMemoHistory name={targetMicro} url={props.location.pathname}/> : 
        <BasicLayout></BasicLayout>
    }
  </KeepAlive>
</Provider>
}

export default MicroAppLayout;
