import { Button, Col, Form, Input, Row, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import * as userContants from '../../redux/constant/userContants';

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const tailLayout = { wrapperCol: { offset: 8, span: 24 } };
    const dispatch = useDispatch();

    
    const handleSubmit = async () => {
        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            )
            if(!email || !password) {
                return notification['error']({
                    description: `Email and password is required`,
                })
            }
            if(result.user.emailVerified) {
                // remove user local storage
                window.localStorage.removeItem('emailForResgister');
                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                // redux store
                dispatch({
                    type: userContants.USER_LOGGED_IN,
                    payload: {
                      email: user.email,
                      token: idTokenResult.token
                    }
                });
                // redirect
                history.push('/');
            }
        } catch (error) {
            const key = `open${Date.now()}`;
            notification['error']({
                description: `${error}`,
                key
            })
        }
    };

    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const state = useSelector((state) => ({...state}));
    const { user } = state;
    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForResgister'));
        if(!email) return history.push('/signup');
        if(user && user.email) {
            history.push('/')
        }
    }, [user])
    return (
        <>
            <Row justify="center" gutter={16}>
                <Col span={12}>
                    <Form onFinish={handleSubmit} onFinishFailed={onFinishFailed} initialValues={email}> 
                        <Form.Item><h1>Register Complete</h1></Form.Item>
                        <Form.Item 
                        label="Email" 
                        rules={[{ 
                            required: true, 
                            message: 'Please input your email!' }]}
                        >   
                        <Input value={email} disabled />
                        </Form.Item>
                        <Form.Item label="Password"
                            rules={[{ 
                                required: true, 
                                message: 'Please input your password!' }]}
                        >
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Complete Registration
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default RegisterComplete;
