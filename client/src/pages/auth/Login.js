import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, notification, Spin } from 'antd';
import { auth, googleAuthProvider } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import * as userContants from '../../redux/constant/userContants';
import { Link, useHistory } from 'react-router-dom';
import { 
    GoogleOutlined } from '@ant-design/icons';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('thinhtd2109@gmail.com');
    const [password, setPassword] = useState('Kaitokid1412');
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    const dispatch = useDispatch();
    const createOrUpdateUser = async (authToken) => {
        const config = {
            headers: {
                authToken
            }
        }
        return await axios.post(`${process.env.REACT_APP_API}/createOrUpdate`, {}, config);
    }
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            // dispatch({
            //     type: userContants.USER_LOGGED_IN,
            //     payload: {
            //     name: user.email,
            //     token: idTokenResult.token
            //     }
            // });
            // history.push('/');
            
            const config = {
                headers: {
                    authToken: idTokenResult.token
                }
            }   
            await axios.post(`${process.env.REACT_APP_API}/createOrUpdate`,{} , config)
       } catch (error) {
            const key = `open${Date.now()}`;
            // custom message authentication
            switch(error.code) {
                case 'auth/invalid-email':
                notification['error']({
                    description: `Email Invalid`,
                    key
                });
            }
            notification['error']({
                description: `${error}`,
                key
            });
            
            setLoading(false);
       }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const googleLogin = () => {
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: userContants.USER_LOGGED_IN,
                payload: {
                  email: user.email,
                  token: idTokenResult.token
                }
            });
            history.push('/');
        }).catch(error => {
            console.log(error);
            const key = `open${Date.now()}`;
            notification['error']({
                description: `${error.message}`,
                key
            });
        });
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
                    {loading ? <Spin size="large" /> : <h1>Login</h1> }
                    <Form onFinish={handleSubmit} onFinishFailed={onFinishFailed} >
                        <Form.Item
                            label="Email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                            placeholder="Email"/>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password"/>
                        </Form.Item>
                        <Form.Item >
                                <Button 
                                onClick={handleSubmit}
                                type="primary" 
                                style={{marginBottom: '20px'}} 
                                block
                                shape="round">Signin</Button>
                                <Button 
                                onClick={googleLogin}
                                type="danger"
                                block
                                shape="round"
                                style={{marginBottom: '20px'}} 
                                icon={<GoogleOutlined />}
                            >
                                Login With Gmail
                            </Button>
                            <Link to={`/forgot/password`} style={{color: 'red'}}>Forgot Password</Link>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        
        
    )
}

export default Login
