import axios from 'axios';

export const createOrUpdateUser = async (authToken) => {
    const config = {
        headers: {
            authToken
        }
    }
    return await axios.post(`${process.env.REACT_APP_API}/createOrUpdate`,{} , config);
}
export const current_user = async (authToken) => {
    const config = {
        headers: {
            authToken
        }
    }
    return await axios.post(`${process.env.REACT_APP_API}/current-user`,{} , config)
}
export const current_admin = async (authToken) => {
    const config = {
        headers: {
            authToken
        }
    }
    return await axios.post(`${process.env.REACT_APP_API}/current-admin`,{} , config)
}
export const user_check_already = async (email) => {
    const config = {
        headers: {
            'Content-Type': "application/json",
            Accept: "application/json"
        }
    }
    return await axios.post('/check-user-already', { email }, config);
}