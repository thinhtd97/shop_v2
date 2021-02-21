import { all } from 'redux-saga/effects';
import cateSaga from './cateSaga';

export default function* rootSaga() {
    yield all([
        cateSaga(),
    ]);
}