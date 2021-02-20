import * as category from '../constant/categoryConstant';

export const listCateReducer = (state = { categories: [] }, action) => {
    switch(action.type) {
        case category.LIST_CATEGORY_REQUEST: 
            return {
                loading: true
            }
        case category.LIST_CATEGORY_SUCCESS:
            return {
                loading: false,
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
