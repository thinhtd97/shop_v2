import { all } from 'redux-saga/effects';
import cateSaga from './cateSaga';
import subSaga from './subSaga';

export default function* rootSaga() {
    yield all([
        cateSaga(),
        subSaga(),
    ]);
}