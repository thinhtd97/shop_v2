import { call, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import axios from 'axios';
import * as productConstant from '../constant/productConstant';

function* createProduct(action) {
    try {
        const { product, authToken } = action;
        const config = {
            headers: {
                authToken
            }
        }
        const { data } = yield call(() => axios.post(`${process.env.REACT_APP_API}/product`, product, config));
    
        yield put({ type: productConstant.CREATE_PRODUCT_SUCCESS, payload: data });
        notification['success']({
            description:
              `${data.name} is created.`,
          });
    } catch (error) {
        yield put({ 
            type: productConstant.CREATE_PRODUCT_FAILED, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message })
        notification['error']({
            description:error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message
        })
    }
}
function* listProducts(action) {
    try {
        const { count } = action;
        const { data } = yield call(() => axios.get(`${process.env.REACT_APP_API}/products/${count}`));
        yield put({ type: productConstant.LIST_PRODUCT_BY_COUNT_SUCCESS, payload: data });
    } catch (error) {
        yield put({ 
            type: productConstant.LIST_PRODUCT_BY_COUNT_FAILED, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message 
        })
    }
}
function* updateProduct(action) {
    try {
        const { slug, authToken, product, history } = action;
        const config = {
            headers: {
                authToken
            }
        }
        const { data } = yield call(() => axios.put(`${process.env.REACT_APP_API}/product/${slug}`,product ,config));
        yield put({ type: productConstant.UPDATE_PRODUCT_SUCCESS });
        notification['success']({
            description: `${data.name} is updated.`
        })
        history.push('/admin/product/list');
    } catch (error) {
        yield put({ 
            type: productConstant.UPDATE_PRODUCT_FAILED, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message 
        });
        notification['error']({
            description: error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message
        })
        
    }
}
function* removeProduct(action) {
    try {
        const { slug, authToken } = action;
        const config = {
            headers: {
                authToken
            }
        }
        const { data } = yield call(() => axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, config));
        yield put({ type: productConstant.REMOVE_PRODUCT_SUCCESS });
        notification['success']({
            description: `${data.name} is removed.`
        })
        yield put({ type: productConstant.LIST_PRODUCT_BY_COUNT_REQUEST });
    } catch (error) {
        yield put({ 
            type: productConstant.REMOVE_PRODUCT_FAILED, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message 
        });
        notification['error']({
            description: error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message
        })
    }
}
function* detailsProduct(action) {
    try {
        const { slug } = action;
        const { data } = yield call(() => axios.get(`${process.env.REACT_APP_API}/product/${slug}`));
        yield put({ type: productConstant.DETAILS_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        yield put({ 
            type: productConstant.DETAILS_PRODUCT_FAILED, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message 
        });
    }
}
export default function* productSaga() {
    yield takeEvery(productConstant.CREATE_PRODUCT_REQUEST, createProduct);
    yield takeEvery(productConstant.LIST_PRODUCT_BY_COUNT_REQUEST, listProducts);
    yield takeEvery(productConstant.UPDATE_PRODUCT_REQUEST, updateProduct);
    yield takeEvery(productConstant.DETAILS_PRODUCT_REQUEST, detailsProduct);
    yield takeEvery(productConstant.REMOVE_PRODUCT_REQUEST, removeProduct);
}