import { Button, Col, Input, Row, Space, Table, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductRequest, removeProductRequest } from '../../../redux/action/productAction';
import { 
    DeleteOutlined,
    FileSyncOutlined,
    LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ListProduct = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const { user, listProducts } = useSelector((state) => ({...state}));
    const { products, loading } = listProducts;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const columns = [
        {
            title: 'Image',
            key: 'image',
            render: (value) => (
                <Image width={100} src={value.image} alt="Image Products" />
            )
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Slug',
          dataIndex: 'slug',
          key: 'slug'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Shipping',
            dataIndex: 'shipping',
            key: 'shipping'
        },
        {
            title: "Action",
            key: 'action',
            render: (value) => (
                <Space>
                    <Button type="primary">
                        <Link to={`/admin/product/update/${value.slug}`}><FileSyncOutlined /></Link>
                    </Button>
                    <Button type="danger" onClick={() => handleRemove(value.slug, user.token)}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            )
        }
    ];
    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    }
    const handleRemove = (slug, token) => {
        if(window.confirm('Are you sure?')) {
            dispatch(removeProductRequest(slug, token))
        }
    }
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
    const data = products?.filter(searched(keyword)).map((row) => 
    ({ 
        name: row.name, 
        slug: row.slug,
        description: row.description,
        price: row.price,
        category: row.category.name,
        quantity: row.quantity,
        shipping: row.shipping,
        image: row.images[0].url,
        key: row._id 
    }));
    useEffect(() => {
        dispatch(listProductRequest(10))
    }, [dispatch]);
    return (
        <Row justify="center" className="content-side-right">
            <Col span={20}>
                <h1 style={{textAlign: 'center'}}>List Products</h1>
                <Input type="text" placeholder="Search" value={keyword} onChange={handleSearchChange} />
                <hr />
                <Table columns={columns} loading={{indicator: antIcon, spinning:loading}} key={data} dataSource={data} size="middle" />
                <hr />
            </Col>
            
        </Row>
    )
}

export default ListProduct;
