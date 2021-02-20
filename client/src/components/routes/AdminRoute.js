import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import { Route } from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';
import { current_admin } from '../../function/auth';

const AdminRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({...state}));
    const [isAdmin, setIsAdmin] = useState(true);
    useEffect(() => {
        if(user && user.token) {
            current_admin(user.token).then(() => {
                setIsAdmin(true);
            }).catch(err => {
                setIsAdmin(false);
            })
        }
    }, [user])
    return isAdmin ? (
        <Route { ...rest } render={() => children } />
    ) : (
        <Row justify="center" className="content-side-right">
            <LoadingToRedirect />
        </Row>
    );
}

export default AdminRoute;
