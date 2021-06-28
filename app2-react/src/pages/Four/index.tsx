import TableComponet from '@/pages/TableList';
import { Button, Form, Input, Tabs } from 'antd';
import { Route } from 'umi';
// import { commonUtil } from 'qiankun-common';
const { TabPane } = Tabs;
const One = () => {
    const jumoPageTwo = () => {
        // commonUtil.qiankunJump('/childOneMenu/pageTwo')
    }
    return <div>
        <h1>子应用(app2)-页面四</h1>
        <Button type="primary" onClick={jumoPageTwo}>跳转到页面五</Button>
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