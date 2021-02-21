import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSubRequest, removeSubRequest } from '../../../redux/action/subAction';
import { 
    DeleteOutlined,
    FileSyncOutlined,
    LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Table } from 'antd';
import { Link } from 'react-router-dom';

const SubList = () => {
    const dispatch = useDispatch();
    const { subs, loading } = useSelector((state) => ({...state.listSubs}));
    const { user } = useSelector((state) => ({...state}));
    const [keyword, setKeyword] = useState('');
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const searched = (keyword) => (s) => s.name.toLowerCase().includes(keyword);
    const data = subs?.filter(searched(keyword)).map((row) => ({ name: row.name, slug: row.slug, key: row._id, parent: row.parent.name}));
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
            title: 'Parent',
            dataIndex: 'parent',
            key: 'parent'
        },
        {
            title: "Action",
            key: 'action',
            render: (value) => (
                <Space>
                    <Button type="primary">
                        <Link to={`/admin/sub/update/${value.slug}`}><FileSyncOutlined /></Link>
                    </Button>
                    <Button type="danger" onClick={() => handleRemove(value.slug, user.token)}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            )
        }
    ];

    const handleRemove = (slug, authToken) => {
        if(window.confirm('Are you sure?')) {
            dispatch(removeSubRequest(slug, authToken));
        }
    }

    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    }
    
    useEffect(() => {
        dispatch(listSubRequest())
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

export default SubList
