import React, { useState } from 'react';
import { 
    MailOutlined, 
    UserAddOutlined,
    UserOutlined,
    LogoutOutlined } from '@ant-design/icons';
import firebase from 'firebase/app';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { Item, SubMenu } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home');
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => ({...state}));
    const { user } = state;

    const handleClick = (e) => {
        setCurrent(e.key);
    }

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: user.LOGOUT,
            payload: null
        });
        history.push("/signin");
    }
    return (
    <>
        <Menu
          theme="dark"
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
        <Item icon={<MailOutlined />} key="home">
            <Link to="/">Home</Link>
        </Item>
        {user && (
            <SubMenu key="sub1" title={user.email?.split('@')[0]}>
                <Menu.Item key="Logout" onClick={logout} icon={<LogoutOutlined />}>Logout</Menu.Item>
            </SubMenu>
        )}
        
        {!user?.email && (
            <>
                <Item icon={<UserAddOutlined />} key="signup" className="float-right">
                    <Link to="/signup">Signup</Link>
                </Item>
                <Item icon={<UserOutlined />} key="signin" className="float-right">
                    <Link to="/signin">Signin</Link>
                </Item>
            </>
        )}
       
        
        {/* <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
        </SubMenu> */}
        </Menu>
      </>
    )
}

export default Header
