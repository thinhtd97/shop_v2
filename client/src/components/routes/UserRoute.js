import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import { Route } from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({...state}));
    // const { user } = useSelector((state) => state)
    return user?.token ? (
        <Route { ...rest } render={() => children } />
    ) : (
        <Row justify="center" className="content-side-right">
            <LoadingToRedirect />
        </Row>
    );
}

export default UserRoute;
