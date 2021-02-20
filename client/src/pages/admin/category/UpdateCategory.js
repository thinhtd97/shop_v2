import { Button, Col, Form, Input, Row, notification, Spin, Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../function/category';

const UpdateCategory = ({ history, match }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const tailLayout = { wrapperCol: { offset: 7, span: 24 } };
    // const layout = { labelCol: { span: 16 }, wrapperCol: { span: 24 } };
    const { user } = useSelector((state) => ({...state}));
    const handleSubmit = async (authToken) => {
        updateCategory(match.params.slug, { name }, authToken).then((res) => {
            const key = `open${Date.now()}`;
            notification['success']({
                description: `${res.data.name} is updated.`,
                key
            });
            history.push('/admin/category/list');
        }).catch(err => {
            console.log(err);
            const key = `open${Date.now()}`;
            notification['error']({
                description: `Update is failed.`,
                key
            });
        })
    };
    const loadCategory = (slug, authToken) => {
        getCategory(slug, authToken).then((res) => setName(res.data.name))
    }
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if(user.role === "admin") {
            loadCategory(match.params.slug, user.token);
        }
    }, [match])

    return (
        <div className="content-side-right">
            <Breadcrumb className="breadcrumbct">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                <a href="">Application Center</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                <a href="">Application List</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="center">
            {!name ? (<Spin size="large"/>) : (
                <Col span={10} style={{textAlign: 'center'}}>
                    {loading ? (<Spin size="large" />) : (<h1>Update Category</h1>)}
                    <Form onFinish={() => handleSubmit(user.token)} onFinishFailed={onFinishFailed} >
                        <Form.Item
                            label="Category Name"
                        >
                            <Input 
                            autoFocus
                            type="text" 
                            onChange={(e) => setName(e.target.value)} 
                            value={name}
                            placeholder="Category"/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button block type="primary" shape="round" htmlType="submit">Update</Button>
                        </Form.Item>
                    </Form>
                    <hr />
                </Col>
            )}
            </Row>
        </div>
    )
}

export default UpdateCategory;
