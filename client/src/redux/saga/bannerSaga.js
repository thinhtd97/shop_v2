import { call, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import axios from 'axios';
import * as bannerContstant from '../constant/bannerConstant';

function* createBanner(action) {
    try {
        const { banner, authToken } = action;
        const config = {
            headers: {
                authToken
            }
        }
        const { data } = yield call(() => axios.post(`${process.env.REACT_APP_API}/banner`, banner, config));
    
        yield put({ type: bannerContstant.CREATE_BANNER_SUCCESS, payload: data });
        notification['success']({
            description:
              `${data.name} is created.`,
          });
    } catch (error) {
        yield put({ 
            type: bannerContstant.CREATE_BANNER_FAILED, 
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

export default function* bannerSaga() {
    yield takeEvery(bannerContstant.CREATE_BANNER_REQUEST, createBanner);
}