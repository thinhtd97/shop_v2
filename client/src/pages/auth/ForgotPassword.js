import { Button, Col, Form, Input, Row, notification, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const tailLayout = { wrapperCol: { offset: 2, span: 24 } };
    
    
    const handleSubmit = async () => {
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }
        await auth.sendPasswordResetEmail(email, config).then(() => {
            setLoading(false);
            const key = `open${Date.now()}`;
            notification['success']({
                description: `Check your email for password reset link.`,
                key
            });
        }).catch(error => {
            const key = `open${Date.now()}`;
            setLoading(false);
            notification['error']({
                description: `${error.message}`,
                key
            });
        })

    }
    const handleFailed = (error) => {
        console.log("Failed:", error);
    }
    const state = useSelector((state) => ({...state}));
    const { user } = state;
    useEffect(() => {
        if(user && user.email) {
            history.push('/');
        }
    }, [user])
    return (
        <Row justify="center">
            <Col span={10} style={{textAlign: 'center'}}>
                {loading ? <Spin size="large" /> : <h1>Forgot Password</h1> }
                <Form onFinish={handleSubmit} onFinishFailed={handleFailed}>
                    <Form.Item 
                    label="Email" 
                    rules={[{ 
                        required: true, 
                        message: 'Please input your email!' }]}>
                        <Input 
                        autoFocus 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>    
                    <Form.Item {...tailLayout}>
                        <Button block disabled={!email}>Submit</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default ForgotPassword;
