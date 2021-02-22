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
export default function* productSaga() {
    yield takeEvery(productConstant.CREATE_PRODUCT_REQUEST, createProduct);
    yield takeEvery(productConstant.LIST_PRODUCT_BY_COUNT_REQUEST, listProducts);
}