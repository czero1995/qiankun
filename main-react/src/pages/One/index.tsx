import TableComponet from '@/pages/TableList';
import { commonUtil } from 'qiankun-common';
import { Button, Divider, Form, Input, Tabs } from 'antd';
import { Route } from 'umi';
const { TabPane } = Tabs;
const One = () => {
  const jumoPageTwo = () => {
    commonUtil.qiankunJump('/childTwoMenu/pageFive');
  };
  return (
    <div>
      <h1>主应用(main) 第一页</h1>
      <Button  onClick={jumoPageTwo}>
        跳转到子应用(app2)页面五
      </Button>
      <Divider />
      <Form>
        <Form.Item name="1234" label="第一个">
          <Input />
        </Form.Item>
        <Form.Item name="ava" label="第二个">
          <Input />
        </Form.Item>
      </Form>

      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="Tab 1" key="1">
          <Form>
            <Form.Item name="1234" label="第一个">
              <Input />
            </Form.Item>
            <Form.Item name="ava" label="第一个">
              <Input />
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <Route component={TableComponet}></Route>
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          <Form>
            <Form.Item name="1234" label="第三个">
              <Input />
            </Form.Item>
            <Form.Item name="ava" label="第三个">
              <Input />
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default One;
