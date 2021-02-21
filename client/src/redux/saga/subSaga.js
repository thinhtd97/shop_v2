import { call, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import axios from 'axios';
import * as subConstants from '../constant/subConstant';

function* createSubCategory(action) {
    try {
        const { subcategory, authToken, parent } = action;
        const config = {
            headers: {
                authToken
            }
        }
        const { data } = yield call(() => axios.post(`${process.env.REACT_APP_API}/sub`, { name: subcategory, parent }, config));
    
        yield put({ type: subConstants.CREATE_SUB_CATEGORY_SUCCESS, payload: data });
        notification['success']({
            description:
              `${data.name} is created.`,
          });
    } catch (error) {
        yield put({ 
            type: subConstants.CREATE_SUB_CATEGORY_FAILED, 
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
function* listSubs() {
    try {
        const { data } = yield call(() => axios.get(`${process.env.REACT_APP_API}/subs`));
        yield put({ type: subConstants.LIST_SUB_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        yield put({ 
            type: subConstants.LIST_SUB_CATEGORY_FAILED, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message 
        })
    }
}
function* removeSub(action) {
    try {
        const { slug, authToken } = action;
        const config = {
            headers: {
                authToken
            }
        }
        const { data } = yield call(() => axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, config));
        yield put({ type: subConstants.REMOVE_SUB_CATEGORY_SUCCESS });
        notification['success']({
            description: `${data.name} is removed.`
        })
        yield put({ type: subConstants.LIST_SUB_CATEGORY_REQUEST });
    } catch (error) {
        yield put({ 
            type: subConstants.REMOVE_SUB_CATEGORY_FAILED, 
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
export default function* subSaga() {
    yield takeEvery(subConstants.CREATE_SUB_CATEGORY_REQUEST, createSubCategory);
    yield takeEvery(subConstants.LIST_SUB_CATEGORY_REQUEST, listSubs);
    yield takeEvery(subConstants.REMOVE_SUB_CATEGORY_REQUEST, removeSub);
}