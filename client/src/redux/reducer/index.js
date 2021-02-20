import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { listCateReducer } from './cateReducer';

const rootReducer = combineReducers({
    user: userReducer,
    listCategory: listCateReducer
})

export default rootReducer; 