import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductRequest } from '../../../redux/action/productAction';

const ListProduct = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProductRequest(10))
    }, [dispatch]);
    return (
        <div>
            
        </div>
    )
}

export default ListProduct;
