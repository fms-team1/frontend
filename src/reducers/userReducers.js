import { GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_CURRENT_USER_FAIL, GET_CURRENT_USER_REQUEST, GET_CURRENT_USER_SUCCESS, USER_SIGNOUT, USER_SIGN_FAIL, USER_SIGN_REQUEST, USER_SIGN_SUCCESS } from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_SIGN_REQUEST:
            return { loading: true };
        case USER_SIGN_SUCCESS:
            return { loading: false, userInfo: action.payload.data };
        case USER_SIGN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
};
export const getCurrentUserReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_CURRENT_USER_REQUEST:
            return { loadingProfileBar: true };
        case GET_CURRENT_USER_SUCCESS:
            return {
                loadingProfileBar: false,
                surname: action.payload.surname,
                name: action.payload.name,
                currentUserData: action.payload
             };
        case GET_CURRENT_USER_FAIL:
            return { loadingProfileBar: false, errorProfileBar: action.payload };
        default:
            return state;
    }
};
export const getAllUsersReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_ALL_USERS_REQUEST:
            return { loadingAllUsers: true };
        case GET_ALL_USERS_SUCCESS:
            return {
                loadingAllUsers: false,
                allUsersData: action.payload
             };
        case GET_ALL_USERS_FAIL:
            return { loadingAllUsers: false, errorAllUsers: action.payload };
        default:
            return state;
    }
};