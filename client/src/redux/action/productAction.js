import * as productConstant from '../constant/productConstant';

export const createCategoryRequest = (product, authToken) => ({
    type: productConstant.CREATE_PRODUCT_REQUEST,
    product,
    authToken
})
export const listProductRequest = (count) => ({
    type: productConstant.LIST_PRODUCT_BY_COUNT_REQUEST,
    count
})
export const updateProductRequest = (slug, authToken, product, history) => ({
    type: productConstant.UPDATE_PRODUCT_REQUEST,
    slug,
    authToken,
    product,
    history
})
export const getDetailsProduct = (slug) => ({
    type: productConstant.DETAILS_PRODUCT_REQUEST,
    slug
})
export const removeProductRequest = (slug, authToken) => ({
    type: productConstant.REMOVE_PRODUCT_REQUEST,
    slug,
    authToken
})