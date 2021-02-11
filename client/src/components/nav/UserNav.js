import React from 'react';
import { Menu } from 'antd';
import { HistoryOutlined, KeyOutlined, HeartOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Item } = Menu;

const UserNav = () => {
    return (
        <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
         <Item icon={<HistoryOutlined />} key="history" className="float-right">
            <Link to="/history">History</Link>
        </Item>
        <Item icon={<KeyOutlined />} key="password" className="float-right">
            <Link to="/password">Password</Link>
        </Item>
        <Item icon={<HeartOutlined />} key="wishlist" className="float-right">
            <Link to="/wishlist">Wishlist</Link>
        </Item>
      </Menu>
    )
}

export default UserNav
