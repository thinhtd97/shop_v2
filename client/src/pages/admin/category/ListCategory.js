import { Button, Col, Form, Input, Row, notification, Table, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategories, removeCategory } from '../../../function/category';
import { 
    DeleteOutlined,
    FileSyncOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ListCategory = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const tailLayout = { wrapperCol: { offset: 7, span: 24 } };
    const { user } = useSelector((state) => ({...state}));
    // const layout = { labelCol: { span: 16 }, wrapperCol: { span: 24 } };
    const handleRemove = async (slug, authToken) => {
        if(window.confirm('Are you sure?')) {
            setLoading(true);
            removeCategory(slug, authToken).then((res) => {
                setLoading(false);
                const key = `open${Date.now()}`;
                notification['success']({
                    description: `${res.data.name} is deleted.`,
                    key
                });
                loadCategories();
            }).catch(err => {
                if(err.status === 400) {
                    const key = `open${Date.now()}`;
                    notification['error']({
                        description: `${err.response.data} is created.`,
                        key
                    });
                }
            });
            
        }
    }
    const columns = [
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
            title: "Action",
            key: 'action',
            render: (value) => (
                <Space>
                    <Button type="primary">
                        <Link to={`/admin/category/update/${value.slug}`}><FileSyncOutlined /></Link>
                    </Button>
                    <Button type="danger" onClick={() => handleRemove(value.slug, user.token)}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            )
        }
    ];
   
    const loadCategories = () => {
        getCategories().then((cate) => setCategories(cate.data));
    }
    useEffect(() => {
        loadCategories();
    }, [])

    const data = categories?.map((row) => ({ name: row.name, slug: row.slug, key: row._id }));

    return (
            <Row justify="center" className="content-side-right">
                <Col span={20}>
                    <h1 style={{textAlign: 'center'}}>List Category</h1>
                    <Table columns={columns} loading={loading} key={data} dataSource={data} size="middle" />
                    <hr />
                </Col>
            </Row>
    )
}

export default ListCategory;
