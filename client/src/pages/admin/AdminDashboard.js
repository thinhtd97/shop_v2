import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductRequest } from '../../redux/action/productAction'

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { listProducts, user } = useSelector((state) => ({...state}));
    const { loading, products } = listProducts;
    useEffect(() => {
        dispatch(listProductRequest(100))
    }, [dispatch])
    return (
        <div className="content-side-right">
            Admin Dashboard
        </div>
    )
}

export default AdminDashboard
