import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsSub, updateCategoryRequest } from '../../../redux/action/subAction';
import { Button, Col, Input, Row, Spin, Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { listCategoryRequest } from '../../../redux/action/cateAction';

const { Option } = Select;

const SubUpdate = ({ history, match }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [parent, setParent] = useState('');
    const slug = match.params.slug;
    const tailLayout = { wrapperCol: { offset: 7, span: 24 } };
    const { user, detailSub, listCategory } = useSelector((state) => ({...state}));
    const { categories } = listCategory;
    const { sub, loading } = detailSub;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const handleSubmit = () => {
        dispatch(updateCategoryRequest(history, slug, name, parent, user.token));
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }; 
    useEffect(() => {
        if(user) {
            if(!sub || !sub.name || sub.slug !== slug) {
                dispatch(listCategoryRequest());
                dispatch(getDetailsSub(slug));
            } else {
                setName(sub.name);
                setParent(sub.parent.name);
            }
        }
    }, [dispatch, sub, slug])
    return (
        <Row justify="center" className="content-side-right">
            
            <Col span={10}>
                { loading ? (<Spin size="large" indicator={antIcon} />) : (
                <>
                    <h1 style={{textAlign: 'center'}}>Update Sub Category</h1>    
                    <Form onFinish={handleSubmit} onFinishFailed={onFinishFailed}>
                        <Form.Item label="Parent Category">
                            <Select defaultValue={sub.parent?.name} style={{ width: 300 }} onChange={(value) => setParent(value)} placeholder="Select A Category Name">
                                {categories?.map(c => (<Option key={c._id} value={c._id}>{c.name}</Option>))}   
                            </Select>
                        </Form.Item>

                        <Form.Item label="Category Name">
                            <Input 
                                autoFocus
                                type="text" 
                                placeholder="Category"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button block type="primary" shape="round" htmlType="submit">Save</Button>
                        </Form.Item>
                    </Form>
                </>
                )}
              
                <hr />
            </Col>
        </Row>
    )
}

export default SubUpdate;
