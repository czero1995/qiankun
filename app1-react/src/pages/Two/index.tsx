import TableComponet from '@/pages/TableList';
import { Form, Input, Tabs } from 'antd';
import React from 'react';
import { Route } from 'umi';
const { TabPane } = Tabs;
const One = () => {
    return <div>
        <h1>子应用1页面 Page Two</h1>
        <Form>
            <Form.Item name="1234" label="第一个"> 
                <Input/>
            </Form.Item>
            <Form.Item name="ava" label="第二个"> 
                <Input/>
            </Form.Item>
        </Form>

        <Tabs defaultActiveKey="1" onChange={() => {}}>
    <TabPane tab="Tab 1" key="1">
    <Form>
            <Form.Item name="1234" label="第一个"> 
                <Input/>
            </Form.Item>
            <Form.Item name="ava" label="第一个"> 
                <Input/>
            </Form.Item>
        </Form>
    </TabPane>
    <TabPane tab="Tab 2" key="2">
        <Route component={TableComponet}></Route>
    </TabPane>
    <TabPane tab="Tab 3" key="3">
    <Form>
            <Form.Item name="1234" label="第三个"> 
                <Input/>
            </Form.Item>
            <Form.Item name="ava" label="第三个"> 
                <Input/>
            </Form.Item>
        </Form>
    </TabPane>
  </Tabs>
    </div>
}
export default One