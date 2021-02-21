import { Button, Col, Input, Row, Spin, Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryRequest } from '../../../redux/action/cateAction';
import { LoadingOutlined } from '@ant-design/icons';

const CategoryCreate = () => {
    const [name, setName] = useState('');
    const tailLayout = { wrapperCol: { offset: 7, span: 24 } };
    const { user, createCategory } = useSelector((state) => ({...state}));
    const { loading } = createCategory;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(createCategoryRequest(name, user.token));
        setName("");
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row justify="center" className="content-side-right">
            <Col span={10} style={{textAlign: 'center'}}>
                {loading ? (<Spin size="large" indicator={antIcon} />) : (<h1>Create Category</h1>)}
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
                        <Button block type="primary" shape="round" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
                <hr />
            </Col>
        </Row>
    )
}

export default CategoryCreate
