import React, { useState } from 'react';
import { 
    HomeOutlined,
    UserAddOutlined,
    UserOutlined,
    BarsOutlined,
    ProfileOutlined,
    DashboardOutlined,
    LogoutOutlined } from '@ant-design/icons';
import firebase from 'firebase/app';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as userConstant from '../../redux/constant/userContants'; 

const { Header } = Layout;
const { Item, SubMenu } = Menu;

const HeaderNav = () => {
    const [current, setCurrent] = useState('');
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
            type: userConstant.LOGOUT,
            payload: null
        });
        history.push("/signin");
    }
    return (
    <Header>
      <div className="logo" />
        <Menu theme="dark"
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal">
            <Item key="home">
                <Link to="/">Home</Link>
            </Item>
            {user?.email ? (
            <SubMenu key="sub1" icon={<BarsOutlined />} title={user.email?.split('@')[0]}>
                {user && user.role === "subscriber" ? (
                    <Item key="history" icon={<DashboardOutlined />}>
                        <Link to="/user/history">Dashboard</Link>
                    </Item>
                ) : (
                    <Item key="admindb" icon={<DashboardOutlined />}>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </Item>
                )}
                <Item key="Profile" icon={<ProfileOutlined />}>Profile</Item>
                <Item key="Logout" onClick={logout} icon={<LogoutOutlined />}>Logout</Item>
            </SubMenu>
        ) : (
            <>
                <Item icon={<UserAddOutlined />} key="signup" className="float-right">
                    <Link to="/signup">Signup</Link>
                </Item>
                <Item icon={<UserOutlined />} key="signin" className="float-right">
                    <Link to="/signin">Signin</Link>
                </Item>
            </>
        )}
        </Menu>
        {/* <Menu
          theme="dark"
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
        <Item icon={<HomeOutlined />} key="home">
            <Link to="/">Home</Link>
        </Item>
        {user?.email ? (
            <SubMenu key="sub1" icon={<BarsOutlined />} title={user.email?.split('@')[0]}>
                {user && user.role === "subscriber" ? (
                    <Item key="history" icon={<DashboardOutlined />}>
                        <Link to="/user/history">Dashboard</Link>
                    </Item>
                ) : (
                    <Item key="admindb" icon={<DashboardOutlined />}>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </Item>
                )}
                <Item key="Profile" icon={<ProfileOutlined />}>Profile</Item>
                <Item key="Logout" onClick={logout} icon={<LogoutOutlined />}>Logout</Item>
            </SubMenu>
        ) : (
            <>
                <Item icon={<UserAddOutlined />} key="signup" className="float-right">
                    <Link to="/signup">Signup</Link>
                </Item>
                <Item icon={<UserOutlined />} key="signin" className="float-right">
                    <Link to="/signin">Signin</Link>
                </Item>
            </>
        )}
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
        </SubMenu>
        </Menu> */}
      </Header>
    )
}

export default HeaderNav