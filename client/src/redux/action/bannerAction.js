import * as bannerConstant from '../constant/bannerConstant';

export const createBannerRequest = (banner, authToken) => ({
    type: bannerConstant.CREATE_BANNER_REQUEST,
    banner,
    authToken
})