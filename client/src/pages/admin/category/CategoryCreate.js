import { Button, Col, Form, Input, Row, notification, Spin } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createCategory, getCategories } from '../../../function/category';

const CategoryCreate = ({ history }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const tailLayout = { wrapperCol: { offset: 7, span: 24 } };
    // const layout = { labelCol: { span: 16 }, wrapperCol: { span: 24 } };
    const { user } = useSelector((state) => ({...state}));
    const handleSubmit = async () => {
       setLoading(true);
       createCategory({ name }, user.token).then((res) => {
            setLoading(false);
            setName('');
            const key = `open${Date.now()}`;
            notification['success']({
                description: `${res.data.name} is created.`,
                key
            });
       }).catch((err) => {
           setLoading(false);
           console.log(err);
           if(err.response.status === 400) {
                const key = `open${Date.now()}`;
                notification['error']({
                    description: `Create is failed.`,
                    key
                });
           }
       })
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
            <Row justify="center" className="content-side-right">
                <Col span={10} style={{textAlign: 'center'}}>
                    {loading ? (<Spin size="large" />) : (<h1>Create Category</h1>)}
                    <Form onFinish={handleSubmit} onFinishFailed={onFinishFailed} >
                        <Form.Item
                            label="Category Name"
                            name="categoryname"
                            rules={[{ required: true, message: 'Please input your category!' }]}
                        >
                            <Input 
                            autoFocus
                            type="text" 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Category" />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button block type="primary" shape="round" htmlType="submit">Create</Button>
                        </Form.Item>
                    </Form>
                    <hr />
                </Col>
            </Row>
    )
}

export default CategoryCreate;
