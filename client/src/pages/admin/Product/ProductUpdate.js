import { Button, Col, Input, Row, Spin, Form, Select, Avatar, Badge } from 'antd';
import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import Resizer from 'react-image-file-resizer';
import { useDispatch, useSelector } from 'react-redux';
import { listCategoryRequest, listSubCategoryRequest } from '../../../redux/action/cateAction';
import { getDetailsProduct, updateProductRequest } from '../../../redux/action/productAction';
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
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
const ProductUpdate = ({ match, history }) => {
    const slug = match.params.slug;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const [values, setValues] = useState(initialState);
    const { user, listCategory, listSubCate, detailsProduct } = useSelector((state) => ({...state}));
    const { product } = detailsProduct;
    const { categories } = listCategory;
    let { subCate } = listSubCate;
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
        color,
        images
    } = values;
    const tailLayout = { wrapperCol: { offset: 7, span: 24 } };
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }
    //submit handle update
    const handleSubmit = (slug, authToken, product, history) => {
        dispatch(updateProductRequest(slug, authToken, product, history))
    }

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

    // change resize image
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
    const handleCategoryChange = async (value) => {
        setValues({ ...values, subs: [], category: value });
        dispatch(listSubCategoryRequest(value));
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const selectProps = {
        mode: 'multiple',
        style: { width: '100%' },
        name:"categories", 
        value: subs,
        onChange: (value) => {
            setValues({...values, subs: [...value]})
        },
        maxTagCount: 'responsive',
      };
    useEffect(() => {
        if(user) {
            if(!product || !product.name || product.slug !== slug) {
                dispatch(listCategoryRequest());
                dispatch(getDetailsProduct(slug));
            } else {
                setValues({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    images: product.images,
                    category: product.category,
                    subs: product.subs,
                    images: product.images,
                    shipping: product.shipping,
                    color: product.color,
                    quantity: product.quantity,
                    brand: product.brand
                })
                if(subs) {
                    dispatch(listSubCategoryRequest(product.category._id));
                }
            }
        }
    }, [dispatch, product, slug])
    return (
        <Row justify="center" className="content-side-right">
            <Col span={10}>
                {loading ? (<Spin size="large" indicator={antIcon} />) : 
                (<h1 style={{textAlign: 'center'}}>Update Product</h1>)}
                <Form onFinish={() => handleSubmit(slug, user.token, values, history)} onFinishFailed={onFinishFailed}  >
                    <Form.Item
                        label="Product Name"
                    >
                        <Input 
                        autoFocus
                        type="text" 
                        name="name"
                        value={name}
                        onChange={handleChange} 
                        placeholder="Product Name" 
                        required="Please input your name!"
                    />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                    >
                        <TextArea 
                        type="text" 
                        name="description"
                        value={description}
                        onChange={handleChange} 
                        placeholder="Description"
                        required="Please input your description!" 
                        />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                    >
                        <Input 
                        min={0}
                        name="price"
                        type="number" 
                        value={values.price}
                        onChange={handleChange} 
                        placeholder="Price" 
                        required="Please input your price!" 
                    />
                    </Form.Item>
                    <Form.Item
                        label="Parent Category"
                    >
                       <Select value={category._id} name="category" onChange={handleCategoryChange}>
                            {categories?.map(c => (<Option  key={c._id} value={c._id}>{c.name}</Option>))}
                       </Select>
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        style={ values.images.length >= 1 ? {marginBottom: '0px'} : {}}
                    >

                        <Input
                            name="image"
                            type="file" 
                            accept="images/*"
                            value={images}
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
                    >
                       <Select 
                        name="shipping" 
                        onChange={(value) => setValues({ ...values, shipping: value})} 
                        placeholder="Shipping" 
                        value={shipping}
                       >
                            <Option key={1} value="Yes">Yes</Option>
                            <Option key={0} value="No">No</Option>
                       </Select>
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                    >
                       <Input 
                        min={0}
                        type="number" 
                        name="quantity"
                        value={quantity}
                        onChange={handleChange} 
                        placeholder="Quantity" 
                        required="Please input your quantity!" 
                        />
                    </Form.Item>
                    {/* <Form.Item
                        label="Color"
                        name="color"
                        rules={[{ required: true, message: 'Please input your color!' }]}
                    >
                       <Select onChange={(value) => setValues({ ...values, color: value})} placeholder="Color">
                            {colors.map((c) => (<Option key={c} value={c}>{c}</Option>))}
                       </Select>
                    </Form.Item> */}
                    {/* <Form.Item
                        label="Brand"
                        name="brand"
                        rules={[{ required: true, message: 'Please input your brand!' }]}
                    >
                       <Select defaultValue={brand} onChange={(value) => setValues({ ...values, brand: value})} placeholder="Brand">
                            {brands.map((c) => (<Option key={c} value={c}>{c}</Option>))}
                       </Select>
                    </Form.Item> */}
                    <Form.Item {...tailLayout}>
                        <Button block type="primary" shape="round" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
                <hr />
            </Col>
        </Row>
    )
}

export default ProductUpdate
