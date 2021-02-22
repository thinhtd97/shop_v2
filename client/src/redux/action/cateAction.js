import * as categoryConstant from '../constant/categoryConstant';

export const listCategoryRequest = () => ({
    type: categoryConstant.LIST_CATEGORY_REQUEST
})
export const listSubCategoryRequest = (category_id) => ({
    type: categoryConstant.GET_SUB_CATEGORY_REQUEST,
    category_id
})
export const createCategoryRequest = (category, authToken) => ({
    type: categoryConstant.CREATE_CATEGORY_REQUEST,
    category,
    authToken
})
export const removeCategoryRequest = (slug, authToken) => ({
    type: categoryConstant.REMOVE_CATEGORY_REQUEST,
    slug,
    authToken
})
export const updateCategoryRequest = (history, slug, category, authToken) => ({
    type: categoryConstant.UPDATE_CATEGORY_REQUEST,
    slug,
    category,
    authToken,
    history
})
export const getDetailsCate = (slug) => ({
    type: categoryConstant.DETAILS_CATEGORY_REQUEST,
    slug
})