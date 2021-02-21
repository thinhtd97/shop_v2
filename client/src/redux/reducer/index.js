import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { listCateReducer, createCateReducer, removeCateReducer, detailsCateReducer, updateCateReducer } from './cateReducer';

const rootReducer = combineReducers({
    user: userReducer,
    listCategory: listCateReducer,
    createCategory: createCateReducer,
    removeCategory: removeCateReducer,
    detailsCate: detailsCateReducer,
    updateCate: updateCateReducer
})

export default rootReducer; 