import * as sub from '../constant/subConstant';

export const createSubReducer = (state = {}, action) => {
    switch(action.type) {
        case sub.CREATE_SUB_CATEGORY_REQUEST: 
            return {
                loading: true,
                success: false
            }
        case sub.CREATE_SUB_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: true,
                payload: action.payload
            }
        case sub.LIST_SUB_CATEGORY_FAILED: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}
export const listSubReducer = (state = { subs: [] }, action) => {
    switch(action.type) {
        case sub.LIST_SUB_CATEGORY_REQUEST: 
            return {
                loading: true,
            }
        case sub.LIST_SUB_CATEGORY_SUCCESS:
            return {
                loading: false,
                subs: action.payload
            }
        case sub.LIST_SUB_CATEGORY_FAILED: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}
export const removeSubReducer = (state = {}, action) => {
    switch(action.type) {
        case sub.REMOVE_SUB_CATEGORY_REQUEST: 
            return {
                loading: true,
                success: false
            }
        case sub.REMOVE_SUB_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case sub.REMOVE_SUB_CATEGORY_FAILED: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}
export const detailsSubReducer = (state = { sub: {} }, action) => {
    switch(action.type) {
        case sub.DETAILS_SUB_CATEGORY_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case sub.DETAILS_SUB_CATEGORY_SUCCESS:
            return {
                loading: false,
                sub: action.payload,
            }
        case sub.DETAILS_SUB_CATEGORY_FAILED: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}
export const updateSubReducer = (state = {}, action) => {
    switch(action.type) {
        case sub.UPDATE_SUB_CATEGORY_REQUEST: 
            return {
                ...state,
                loading: true,
                success: false
            }
        case sub.UPDATE_SUB_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case sub.UPDATE_SUB_CATEGORY_FAILED: {
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