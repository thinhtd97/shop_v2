import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import * as cateReducer from './cateReducer'
import * as subReducer from './subReducer';
import * as productReducer from './productReducer';
import * as bannerReducer from './bannerReducer';

const rootReducer = combineReducers({
    user: userReducer,
    listCategory: cateReducer.listCateReducer,
    createCategory: cateReducer.createCateReducer,
    removeCategory: cateReducer.removeCateReducer,
    detailsCate: cateReducer.detailsCateReducer,
    updateCate: cateReducer.updateCateReducer,
    listSubCate: cateReducer.listSubCateReducer,
    createSubCate: subReducer.createSubReducer,
    listSubs: subReducer.listSubReducer,
    removeSub: subReducer.removeSubReducer,
    detailSub: subReducer.detailsSubReducer,
    createProduct: productReducer.createProductReducer,
    listProducts: productReducer.listProductReducer,
    updateProduct: productReducer.updateProductReducer,
    detailsProduct: productReducer.detailsProductReducer,
    createBanner: bannerReducer.createCateReducer
})

export default rootReducer; 