import { Button, Col, Form, Input, Row, notification, Spin } from 'antd';
import React, { useState } from 'react';
import { auth } from '../../firebase';

const Password = ({ history }) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const tailLayout = { wrapperCol: { offset: 6, span: 24 } };
    // const layout = { labelCol: { span: 16 }, wrapperCol: { span: 24 } };
    
    const handleSubmit = async (e) => {
        setLoading(true);
        await auth.currentUser.updatePassword(password).then(() => {
            setLoading(false);
            const key = `open${Date.now()}`;
            notification['success']({
                description: `Password updated.`,
                key
            })
        }).catch(err => {
            setLoading(false);
            const key = `open${Date.now()}`;
            notification['error']({
                description: `${err.message}`,
                key
            })
        })

    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
            <Row justify="center" style={{marginTop: '20px'}}>
                <Col span={10}>
                    <div className="title">
                        {loading ? (<Spin size="large" style={{marginBottom: '10px'}} />) : (<h1>Password Update</h1>)}
                    </div>
                    
                    <Form onFinish={handleSubmit} onFinishFailed={onFinishFailed} >
                        <Form.Item
                            label="Your password"
                            name="yourpassword"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}  
                            value={password}
                            placeholder="Enter new password"/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button 
                            block 
                            type="primary" 
                            shape="round" 
                            htmlType="submit" 
                            disabled={!password || loading}>Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
    )
}

export default Password;
