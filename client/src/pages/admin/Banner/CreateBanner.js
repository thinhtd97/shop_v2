import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row, Spin, Form, Select, Avatar, Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import { LoadingOutlined } from '@ant-design/icons';
import { createBannerRequest } from '../../../redux/action/bannerAction';
import axios from 'axios'

const CreateBanner = () => {
    const [banner, setBanner] = useState({
        name: '',
        image: ''
    })
    const [loading, setLoading] = useState(false);
    const tailLayout = { wrapperCol: { offset: 4, span: 24 } };
    const { user } = useSelector((state) => ({...state}));
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(createBannerRequest(banner, user.token));
    }
    const fileUploadChangeAndResize = (e) => {
        setLoading(true);
        let files = e.target.files;
        if(files) {
            Resizer.imageFileResizer(files[0], 720, 240, "JPEG", 100, 0, (uri) => {
            axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                headers: {
                    authToken: user?.token
                }
            }).then(res => {
                setLoading(false);
                banner.image = res.data
                setBanner({ ...banner, image: banner.image })
            }).catch(err => {
                setLoading(false);
                console.log("Upload Error: " + err);
            })
            }, 'base64')
        }
    }
    const handleImageRemove = (public_id) => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
            headers: {
                authToken: user?.token
            }
        })
        .then((res) => {
            setBanner({ ...banner, image: '' })
            setLoading(false)
        }).catch(err => {
            console.log(err);
            setLoading(false);
        })
    }
    const handleSubmitFailed = (error) => {
        console.log("Error: " + error);
    }
   
    return (
        <Row justify="center" className="content-side-right">
            <Col span={10}>
                {loading ? (<Spin size="large" indicator={antIcon} />) : 
                (<h1 style={{textAlign: 'center'}}>Create Banner</h1>)}
                <Form onFinish={handleSubmit} onFinishFailed={handleSubmitFailed}>
                <Form.Item
                        label="Banner Name"
                        name="Bannername"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input 
                        autoFocus
                        type="text" 
                        name="name"
                        value={banner.name}
                        onChange={(e) => setBanner({ ...banner, name: e.target.value })} 
                        placeholder="Banner Name" />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                        style={ banner.image ? {marginBottom: '0px'} : {}}
                    >

                        <Input 
                            name="image"
                            type="file" 
                            accept="images/*"
                            value={banner.image}
                            onChange={fileUploadChangeAndResize} 
                            multiple
                        />
                        
                        
                    </Form.Item>
                    {banner.image  ? ( <Badge 
                            count="X"  
                            key={banner.image.public_id} 
                            onClick={() => handleImageRemove(banner.image.public_id)}
                            style={{cursor: 'pointer',marginTop: '1.5rem'}}
                        >
                            <Avatar 
                                style={{
                                    marginLeft: '5rem', 
                                    marginBottom: '1rem', 
                                    marginTop: '1rem',
                                }} 
                                src={banner.image.url} 
                                size={40}
                                shape="square"
                            />
                        </Badge>) : (<></>)}
                     <Form.Item {...tailLayout}>
                        <Button block type="primary" shape="round" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default CreateBanner
