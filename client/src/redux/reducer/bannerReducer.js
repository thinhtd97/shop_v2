import * as banner from '../constant/bannerConstant';

export const createCateReducer = (state = {}, action) => {
    switch(action.type) {
        case banner.CREATE_BANNER_REQUEST: 
            return {
                loading: true,
                success: false
            }
        case banner.CREATE_BANNER_SUCCESS:
            return {
                loading: false,
                success: true,
                payload: action.payload
            }
        case banner.CREATE_BANNER_FAILED: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}