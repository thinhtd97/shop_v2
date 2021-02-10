import { Button, Col, Form, Input, Row, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';

const Register = ({ history }) => {
    const [email, setEmail] = useState('');
    const tailLayout = { wrapperCol: { offset: 8, span: 16 } };
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    
    const handleSubmit = async () => {
        const config = {
            url: process.env.REACT_APP_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config);
        const key = `open${Date.now()}`;
        notification['success']({
            description: `Email is sent to ${email}. Click the link to complete your registration.`,
            key
        })
        // save email in local storage
        window.localStorage.setItem('emailForResgister', email);
        // clear state
        setEmail("");
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const state = useSelector((state) => ({...state}));
    const { user } = state;
    useEffect(() => {
        if(user && user.email) {
            history.push('/')
        }
    }, [user])
    return (
            <Row>
                <Col span={12}>
                    <h1>Signup</h1>
                    <Form {...layout} onFinish={handleSubmit} onFinishFailed={onFinishFailed} >
                        <Form.Item
                            label="Email"
                            name="username"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email"/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">Signup</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
    )
}

export default Register;
