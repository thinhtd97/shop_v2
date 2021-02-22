import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listProductRequest } from '../../../redux/action/productAction';

const ListProduct = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProductRequest())
    }, [dispatch]);
    return (
        <div>
            List Product Page
        </div>
    )
}

export default ListProduct;
