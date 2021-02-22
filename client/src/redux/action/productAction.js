import * as productConstant from '../constant/productConstant';

export const createCategoryRequest = (product, authToken) => ({
    type: productConstant.CREATE_PRODUCT_REQUEST,
    product,
    authToken
})
export const listProductRequest = () => ({
    type: productConstant.LIST_PRODUCT_REQUEST
})