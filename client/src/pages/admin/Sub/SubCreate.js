import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row, Spin, Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { createSubRequest } from '../../../redux/action/subAction';
import { listCategoryRequest } from '../../../redux/action/cateAction';

const { Option } = Select;

const SubCreate = () => {
    const [name, setName] = useState('');
    const [parent, setParent] = useState('');
    const { listCategory, user, createSubCate } = useSelector((state) => ({...state}));
    const { categories } = listCategory;
    const { loading } = createSubCate;
    const dispatch = useDispatch()
    const tailLayout = { wrapperCol: { offset: 7, span: 24 } };
    const handleSubmit = () => {
        dispatch(createSubRequest(name, parent, user.token));
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    useEffect(() => {
        dispatch(listCategoryRequest());
    },[dispatch])
    return (
        <Row justify="center" className="content-side-right">
            <Col span={10}>
                {loading ? (<Spin size="large" style={{textAlign: 'center'}} indicator={antIcon} />) : (<h1 style={{textAlign: 'center'}}>Create Sub Category</h1>)}
                <Form onFinish={handleSubmit} onFinishFailed={onFinishFailed}>
                    <Form.Item
                            label="Parent Category"
                            name="category"
                            rules={[{ required: true, message: 'Please input your category!' }]}
                        >
                        <Select onChange={(value) => setParent(value)} placeholder="Select A Category Name">
                                {categories?.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Sub Category Name"
                        name="subcategoryname"
                        rules={[{ required: true, message: 'Please input your sub category!' }]}
                    >
                        <Input 
                        autoFocus
                        type="text" 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Sub Category" />
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

export default SubCreate
