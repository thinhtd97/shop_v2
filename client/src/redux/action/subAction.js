import * as subConstant from '../constant/subConstant';

export const createSubRequest = (subcategory, parent, authToken) => ({
    type: subConstant.CREATE_SUB_CATEGORY_REQUEST,
    subcategory,
    authToken,
    parent
})
export const listSubRequest = () => ({
    type: subConstant.LIST_SUB_CATEGORY_REQUEST
})
export const removeSubRequest = (slug, authToken) => ({
    type: subConstant.REMOVE_SUB_CATEGORY_REQUEST,
    slug,
    authToken
})