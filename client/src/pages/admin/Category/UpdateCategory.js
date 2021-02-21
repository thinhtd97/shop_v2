import { Button, Col, Input, Row, Spin, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { getDetailsCate, updateCategoryRequest } from '../../../redux/action/cateAction';

const UpdateCategory = ({ match, history }) => {
    const slug = match.params.slug;
    const [loading, setLoading] = useState(false);
    const { user, detailsCate } = useSelector((state) => ({...state}));
    const { category } = detailsCate;
    const [name, setName] = useState('')
    const tailLayout = { wrapperCol: { offset: 7, span: 24 } };
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        dispatch(updateCategoryRequest(history, slug, {name}, user.token));
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }; 
    useEffect(() => {
        if(user) {
            if(!category || !category.name || category.slug !== slug) {
                dispatch(getDetailsCate(slug));
            } else {
                setName(category.name)
            }
        }
        
    }, [dispatch, category, slug])
    return (
        <Row justify="center" className="content-side-right">
            
            <Col span={10} style={{textAlign: 'center'}}>
                {loading ? (<Spin size="large" indicator={antIcon} />) : (<h1>Update Category</h1>)}
                <Form onFinish={handleSubmit} onFinishFailed={onFinishFailed} >
                    <Form.Item
                        label="Category Name"
                    >
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
                <hr />
            </Col>
        </Row>
    )
}

export default UpdateCategory
