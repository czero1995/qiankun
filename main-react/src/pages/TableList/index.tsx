import { Form, Input } from 'antd'
const Table = () => {
    return <div>
        <Form>
            <Form.Item name="1234" label="Table第三个"> 
                <Input/>
            </Form.Item>
            <Form.Item name="ava" label="Table第四个"> 
                <Input/>
            </Form.Item>
        </Form>
    </div>
}
export default Table