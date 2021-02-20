import axios from 'axios'

export const getCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/categories`);
}
export const getCategory = async (slug, authToken) => {
    const config = {
        headers: {
            authToken
        }
    }
    return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`, config)
}
export const removeCategory = async (slug, authToken) => {
    const config = {
        headers: {
            authToken
        }
    }
    return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, config);
}
export const updateCategory = async (slug, category, authToken) => {
    const config = {
        headers: {
            authToken
        }
    }
    return await axios.put(`${process.env.REACT_APP_API}/category/update/${slug}`,category ,config);
}
export const createCategory = async (category, authToken) => {
    const config = {
        headers: {
            authToken
        }
    }
    return await axios.post(`${process.env.REACT_APP_API}/category`, category, config);
}