import * as user from '../constant/userContants';

export const userReducer = (state = {}, action) => {
    switch(action.type) {
        case user.USER_LOGGED_IN: 
            return action.payload;
        case user.LOGOUT:
            return action.payload;
        default: 
            return state;
    }
}
