import * as category from '../constant/categoryConstant';

export const createCateReducer = (state = {}, action) => {
    switch(action.type) {
        case category.CREATE_CATEGORY_REQUEST: 
            return {
                loading: true,
                success: false
            }
        case category.CREATE_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: true,
                payload: action.payload
            }
        case category.CREATE_CATEGORY_FAILED: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}
export const listCateReducer = (state = { categories: [] }, action) => {
    switch(action.type) {
        case category.LIST_CATEGORY_REQUEST: 
            return {
                loading: true,
            }
        case category.LIST_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: true,
                categories: action.payload
            }
        case category.LIST_CATEGORY_FAILED: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}
export const removeCateReducer = (state = {}, action) => {
    switch(action.type) {
        case category.REMOVE_CATEGORY_REQUEST: 
            return {
                loading: true,
                success: false
            }
        case category.REMOVE_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case category.REMOVE_CATEGORY_FAILED: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}
export const detailsCateReducer = (state = { category: {} }, action) => {
    switch(action.type) {
        case category.DETAILS_CATEGORY_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case category.DETAILS_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload,
            }
        case category.DETAILS_CATEGORY_FAILED: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}
export const updateCateReducer = (state = {}, action) => {
    switch(action.type) {
        case category.DETAILS_CATEGORY_REQUEST: 
            return {
                ...state,
                loading: true,
                success: false
            }
        case category.DETAILS_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case category.DETAILS_CATEGORY_FAILED: {
            return {
                loading: false,
                success: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}