import { call, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import axios from 'axios';
import * as categoryConstant from '../constant/categoryConstant';

function* createCategory(action) {
    try {
        const { category, authToken } = action;
        const config = {
            headers: {
                authToken
            }
        }
        const { data } = yield call(() => axios.post(`${process.env.REACT_APP_API}/category`, { name: category }, config));
    
        yield put({ type: categoryConstant.CREATE_CATEGORY_SUCCESS, payload: data });
        notification['success']({
            description:
              `${data.name} is created.`,
          });
    } catch (error) {
        yield put({ 
            type: categoryConstant.CREATE_CATEGORY_FAILED, 
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
function* listCate() {
    try {
        const { data } = yield call(() => axios.get(`${process.env.REACT_APP_API}/categories`));
        yield put({ type: categoryConstant.LIST_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        yield put({ 
            type: categoryConstant.LIST_CATEGORY_FAILED, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message 
        })
    }
}
function* listSubCate(action) {
    try {
        const { category_id } = action;
        const { data } = yield call(() => axios.get(`${process.env.REACT_APP_API}/category/subs/${category_id}`));
        yield put({ type: categoryConstant.GET_SUB_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        yield put({ 
            type: categoryConstant.GET_SUB_CATEGORY_FAILED, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message 
        })
    }
}
function* removeCate(action) {
    try {
        const { slug, authToken } = action;
        const config = {
            headers: {
                authToken
            }
        }
        const { data } = yield call(() => axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, config));
        yield put({ type: categoryConstant.REMOVE_CATEGORY_SUCCESS });
        notification['success']({
            description: `${data.name} is removed.`
        })
        yield put({ type: categoryConstant.LIST_CATEGORY_REQUEST });
    } catch (error) {
        yield put({ 
            type: categoryConstant.REMOVE_CATEGORY_FAILED, 
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
function* detailsCate(action) {
    try {
        const { slug } = action;
        const { data } = yield call(() => axios.get(`${process.env.REACT_APP_API}/category/${slug}`));
        yield put({ type: categoryConstant.DETAILS_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        yield put({ 
            type: categoryConstant.DETAILS_CATEGORY_FAILED, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message 
        });
    }
}
function* updateCate(action) {
    try {
        const { slug, authToken, category, history } = action;
        const config = {
            headers: {
                authToken
            }
        }
        const { data } = yield call(() => axios.put(`${process.env.REACT_APP_API}/category/update/${slug}`,category ,config));
        yield put({ type: categoryConstant.UPDATE_CATEGORY_SUCCESS });
        notification['success']({
            description: `${data.name} is updated.`
        })
        history.push('/admin/category/list');
    } catch (error) {
        yield put({ 
            type: categoryConstant.UPDATE_CATEGORY_FAILED, 
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

export default function* cateSaga() {
    yield takeEvery(categoryConstant.CREATE_CATEGORY_REQUEST, createCategory);
    yield takeEvery(categoryConstant.LIST_CATEGORY_REQUEST, listCate);
    yield takeEvery(categoryConstant.REMOVE_CATEGORY_REQUEST, removeCate);
    yield takeEvery(categoryConstant.DETAILS_CATEGORY_REQUEST, detailsCate);
    yield takeEvery(categoryConstant.UPDATE_CATEGORY_REQUEST, updateCate);
    yield takeEvery(categoryConstant.GET_SUB_CATEGORY_REQUEST, listSubCate);
}