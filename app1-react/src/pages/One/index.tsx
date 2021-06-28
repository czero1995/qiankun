import TableComponet from '@/pages/TableList';
import { Button, Form, Input, Tabs } from 'antd';
import { commonUtil } from 'qiankun-common';
import { Route } from 'umi';
const { TabPane } = Tabs;
const One = () => {
    const jumoPageTwo = () => {
        commonUtil.qiankunJump('/childOneMenu/pageTwo')
    }
    return <div>
        <h1>子应用(app1)页面1</h1>
        <Button type="primary" onClick={jumoPageTwo}>跳转到页面二</Button>
        <Form>
            <Form.Item name="1234" label="app1第一个"> 
                <Input/>
            </Form.Item>
            <Form.Item name="ava" label="app1第二个"> 
                <Input/>
            </Form.Item>
        </Form>

        <Tabs defaultActiveKey="1" onChange={() => {}}>
    <TabPane tab="Tab 1" key="1">
    <Form>
            <Form.Item name="1234" label="app1第三个"> 
                <Input/>
            </Form.Item>
            <Form.Item name="ava" label="app1第四个"> 
                <Input/>
            </Form.Item>
        </Form>
    </TabPane>
    <TabPane tab="Tab 2" key="2">
        <Route component={TableComponet}></Route>
    </TabPane>
    <TabPane tab="Tab 3" key="3">
    <Form>
            <Form.Item name="1234" label="Tab 3"> 
                <Input/>
            </Form.Item>
            <Form.Item name="ava" label="Tab 33"> 
                <Input/>
            </Form.Item>
        </Form>
    </TabPane>
  </Tabs>
    </div>
}
export default One