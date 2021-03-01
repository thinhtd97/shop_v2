import React from 'react';
import { Menu } from 'antd';
import { 
    DashboardOutlined, 
    GroupOutlined, 
    HddOutlined, 
    AppstoreOutlined, 
    SubnodeOutlined, 
    PayCircleOutlined,
    KeyOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Item, SubMenu } = Menu;

const AdminNav = () => {
    return (
        <Menu
        style={{ width: 256, height: '100%'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
         <Item icon={<DashboardOutlined />} key="dashboard" className="float-right">
            <Link to="/admin/dashboard">Dashboard</Link>
        </Item>
        {/* <Item icon={<GroupOutlined />} key="product" className="float-right">
            <Link to="/admin/product">Product</Link>
        </Item> */}
        <SubMenu key="product" icon={<HddOutlined />} title="Product">
            <Item key="createProduct">
                <Link to="/admin/product/create">Create</Link>
            </Item>
            <Item key="listProduct">
                <Link to="/admin/product/list">List</Link>
            </Item>
        </SubMenu>
        <SubMenu key="category" icon={<AppstoreOutlined />} title="Category">
            <Item key="createCategory">
                <Link to="/admin/category/create">Create</Link>
            </Item>
            <Item key="listCategory">
                <Link to="/admin/category/list">List</Link>
            </Item>
        </SubMenu>
        <SubMenu key="subcategory" icon={<SubnodeOutlined />} title="Sub Category">
            <Item key="createSubCategory">
                <Link to="/admin/sub/create">Create</Link>
            </Item>
            <Item key="listSubCategory">
                <Link to="/admin/sub/list">List</Link>
            </Item>
        </SubMenu>
        <Item icon={<PayCircleOutlined />} key="coupon" className="float-right">
            <Link to="/admin/coupon">Coupons</Link>
        </Item>
        <Item icon={<KeyOutlined />} key="password" className="float-right">
            <Link to="/admin/password">Password</Link>
        </Item>
      </Menu>
    )
}

export default AdminNav;
