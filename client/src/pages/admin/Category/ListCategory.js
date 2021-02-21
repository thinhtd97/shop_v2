import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategoryRequest, removeCategoryRequest } from '../../../redux/action/cateAction';
import { Button, Col, Row, Table, Space, Spin, Input } from 'antd';
import { Link } from 'react-router-dom';
import { 
    DeleteOutlined,
    FileSyncOutlined,
    LoadingOutlined } from '@ant-design/icons';

const ListCategory = ({ history }) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const { listCategory, user } = useSelector((state) => ({...state}));
    const { categories, loading, success } = listCategory;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const handleRemove = (slug, token) => {
        if(window.confirm('Are you sure?')) {
            dispatch(removeCategoryRequest(slug, token));
        }
    }
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
    const data = categories?.filter(searched(keyword)).map((row) => ({ name: row.name, slug: row.slug, key: row._id }));
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

    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    }

    useEffect(() => {
        dispatch(listCategoryRequest());
    }, [dispatch])
    return (
        <Row justify="center" className="content-side-right">
            <Col span={20}>
                <h1 style={{textAlign: 'center'}}>List Category</h1>
                <Input type="text" placeholder="Search" value={keyword} onChange={handleSearchChange} />
                <hr />
                <Table columns={columns} loading={{indicator: antIcon, spinning:loading}} key={data} dataSource={data} size="middle" />
                <hr />
            </Col>
            
        </Row>
    )
}

export default ListCategory
