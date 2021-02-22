import { Button, Col, Input, Row, Spin, Form, Select, Avatar, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import { LoadingOutlined } from '@ant-design/icons';
import { createCategoryRequest } from '../../../redux/action/productAction';
import { listCategoryRequest, listSubCategoryRequest } from '../../../redux/action/cateAction';
import axios from 'axios';

const initialState = {
    name: '',
    description: '',
    price: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Apple', 'Lenovo', 'Microsoft', 'DELL', 'ASUS'],
    brand: '',
    color: ''
}

const { Option } = Select;

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const { 
        name,
        description,
        price,
        category,
        subs,
        shipping,
        quantity,
        colors,
        brands,
        brand,
        color
    } = values;
    const tailLayout = { wrapperCol: { offset: 7, span: 24 } };
    const [loading, setLoading] = useState(false);
    const { user, listCategory, listSubCate } = useSelector((state) => ({...state}));
    let { subCate } = listSubCate;
    const { categories } = listCategory;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }
    const handleSubmit = () => {
        dispatch(createCategoryRequest(values, user.token));
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleCategoryChange = async (value) => {
        setValues({ ...values, subs: [], category: value });
        dispatch(listSubCategoryRequest(value));
    }
    const fileUploadChangeAndResize = (e) => {
        setLoading(true);
        let files = e.target.files;
        let allUploadedFiles = values.images;
        if(files) {
            for(let i = 0; i < files.length; i++) {
               Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (uri) => {
                axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                    headers: {
                        authToken: user?.token
                    }
                }).then(res => {
                    setLoading(false);
                    allUploadedFiles.push(res.data);
                    setValues({ ...values, images: allUploadedFiles })
                }).catch(err => {
                    setLoading(false);
                    console.log("Upload Error: " + err);
                })
               }, 'base64')
            }
        }
    }
    const selectProps = {
        mode: 'multiple',
        style: { width: '100%' },
        name:"categories", 
        value: subs,
        onChange: (value) => {
            setValues({...values, subs: [...value]})
        },
        placeholder: "Sub Categories",
        maxTagCount: 'responsive',
      };
    const handleImageRemove = (public_id) => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
            headers: {
                authToken: user?.token
            }
        })
        .then((res) => {
            const { images } = values;
            let filteredImages = images.filter((item) => {
                return item.public_id !== public_id;
            });
            setValues({ ...values, images: filteredImages })
            setLoading(false)
        }).catch(err => {
            console.log(err);
            setLoading(false);
        })
    }
    useEffect(() => {
        dispatch(listCategoryRequest());
    }, [dispatch])
    return (
        <Row justify="center" className="content-side-right">
            <Col span={10}>
                {loading ? (<Spin size="large" indicator={antIcon} />) : 
                (<h1 style={{textAlign: 'center'}}>Create Product</h1>)}
                <Form onFinish={handleSubmit} onFinishFailed={onFinishFailed}  >
                    <Form.Item
                        label="Product Name"
                        name="productname"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input 
                        autoFocus
                        type="text" 
                        name="name"
                        value={name}
                        onChange={handleChange} 
                        placeholder="Product Name" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <Input 
                        type="text" 
                        name="description"
                        value={description}
                        onChange={handleChange} 
                        placeholder="Description" />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <Input 
                        min={0}
                        name="price"
                        type="number" 
                        value={price}
                        onChange={handleChange} 
                        placeholder="Price" />
                    </Form.Item>
                    <Form.Item
                        label="Parent Category"
                        name="parentcategory"
                        rules={[{ required: true, message: 'Please input your parent category!' }]}
                    >
                       <Select name="category" onChange={handleCategoryChange} placeholder="Parent Category">
                            {categories?.map(c => (<Option key={c._id} value={c._id}>{c.name}</Option>))}
                       </Select>
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                        style={ values.images.length >= 1 ? {marginBottom: '0px'} : {}}
                    >

                        <Input 
                            name="image"
                            type="file" 
                            accept="images/*"
                            value={values.images}
                            onChange={fileUploadChangeAndResize} 
                            multiple

                        />
                        
                        
                    </Form.Item>
                    {values.images?.map((image) => (
                        <Badge 
                            count="X"  
                            key={image.public_id} 
                            onClick={() => handleImageRemove(image.public_id)}
                            style={{cursor: 'pointer',marginTop: '1.5rem'}}
                        >
                            <Avatar 
                                style={{
                                    marginLeft: '5rem', 
                                    marginBottom: '1rem', 
                                    marginTop: '1rem',
                                }} 
                                src={image.url} 
                                size={40}
                                shape="square"
                            />
                        </Badge>
                       
                    ))}
                    <Form.Item
                        label="Sub Categories"
                    >
                       <Select {...selectProps}>
                            {subCate?.map(c => (<Option key={c._id} value={c._id}>{c.name}</Option>))}
                       </Select>
                    </Form.Item>
                    <Form.Item
                        label="Shipping"
                        name="shipping"
                        rules={[{ required: true, message: 'Please input your shipping!' }]}
                    >
                       <Select name="shipping" onChange={(value) => setValues({ ...values, shipping: value})} placeholder="Shipping">
                            <Option key={1} value="Yes">Yes</Option>
                            <Option key={0} value="No">No</Option>
                       </Select>
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: 'Please input your quantity!' }]}
                    >
                       <Input 
                        min={0}
                        type="number" 
                        name="quantity"
                        value={quantity}
                        onChange={handleChange} 
                        placeholder="Quantiry" />
                    </Form.Item>
                    <Form.Item
                        label="Color"
                        name="color"
                        rules={[{ required: true, message: 'Please input your color!' }]}
                    >
                       <Select onChange={(value) => setValues({ ...values, color: value})} placeholder="Color">
                            {colors.map((c) => (<Option key={c} value={c}>{c}</Option>))}
                       </Select>
                    </Form.Item>
                    <Form.Item
                        label="Brand"
                        name="brand"
                        rules={[{ required: true, message: 'Please input your brand!' }]}
                    >
                       <Select onChange={(value) => setValues({ ...values, brand: value})} placeholder="Brand">
                            {brands.map((c) => (<Option key={c} value={c}>{c}</Option>))}
                       </Select>
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

export default ProductCreate
