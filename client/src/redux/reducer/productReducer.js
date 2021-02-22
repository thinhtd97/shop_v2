import * as product from '../constant/productConstant';

export const createProductReducer = (state = {}, action) => {
    switch(action.type) {
        case product.CREATE_PRODUCT_REQUEST: 
            return {
                loading: true,
                success: false
            }
        case product.CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true,
                payload: action.payload
            }
        case product.CREATE_PRODUCT_FAILED: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}
export const listProductReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case product.LIST_PRODUCT_BY_COUNT_REQUEST: 
            return {
                loading: true,
            }
        case product.LIST_PRODUCT_BY_COUNT_SUCCESS:
            return {
                loading: false,
                success: true,
                products: action.payload
            }
        case product.LIST_PRODUCT_BY_COUNT_FAILED: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}