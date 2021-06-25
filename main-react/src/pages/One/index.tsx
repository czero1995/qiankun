import { Form, Input } from 'antd';
import React from 'react';
const One = () => {
    return <div>
        <h1>qiankun主应用</h1>
        <Form>
            <Form.Item name="one" label="Form Item One"> 
                <Input/>
            </Form.Item>
            <Form.Item name="two" label="Form Item two"> 
                <Input/>
            </Form.Item>
        </Form>

    </div>
}
export default One
