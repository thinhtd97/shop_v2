import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import * as cateReducer from './cateReducer'
import * as subReducer from './subReducer';

const rootReducer = combineReducers({
    user: userReducer,
    listCategory: cateReducer.listCateReducer,
    createCategory: cateReducer.createCateReducer,
    removeCategory: cateReducer.removeCateReducer,
    detailsCate: cateReducer.detailsCateReducer,
    updateCate: cateReducer.updateCateReducer,
    createSubCate: subReducer.createSubReducer,
    listSubs: subReducer.listSubReducer,
    removeSub: subReducer.removeSubReducer
})

export default rootReducer; 