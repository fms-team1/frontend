import { ADD_ACCOUNTANT_FAIL, ADD_ACCOUNTANT_REQUEST, ADD_ACCOUNTANT_RESET, ADD_ACCOUNTANT_SUCCESS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_RESET, CHANGE_PASSWORD_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_COUNTERPARTIES_FAIL, GET_COUNTERPARTIES_REQUEST, GET_COUNTERPARTIES_SUCCESS, GET_CURRENT_USER_FAIL, GET_CURRENT_USER_REQUEST, GET_CURRENT_USER_SUCCESS, NEW_COUNTERPARTY_FAIL, NEW_COUNTERPARTY_REQUEST, NEW_COUNTERPARTY_RESET, NEW_COUNTERPARTY_SUCCESS, USER_SIGNOUT, USER_SIGN_FAIL, USER_SIGN_REQUEST, USER_SIGN_SUCCESS } from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_SIGN_REQUEST:
            return { loading: true };
        case USER_SIGN_SUCCESS:
            return { loading: false, userInfo: action.payload.data };
        case USER_SIGN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return { userRememberMe: action.payload };
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
export const addAccountantReducer = ( state = {}, action ) => {
    switch (action.type) {
        case ADD_ACCOUNTANT_REQUEST:
            return { loadingAdd: true };
        case ADD_ACCOUNTANT_SUCCESS:
            return {
                loadingAdd: false,
                messageAdd: action.payload
            };
        case ADD_ACCOUNTANT_FAIL:
            return { loadingAdd: false, errorAdd: action.payload };
        case ADD_ACCOUNTANT_RESET:
            return {};
        default:
            return state;
    }
};
export const newCounterpartyReducer = ( state = {}, action ) => {
    switch (action.type) {
        case NEW_COUNTERPARTY_REQUEST:
            return { loadingAdd: true };
        case NEW_COUNTERPARTY_SUCCESS:
            return {
                loadingAdd: false,
                messageAdd: action.payload
            };
        case NEW_COUNTERPARTY_FAIL:
            return { loadingAdd: false, errorAdd: action.payload };
        case NEW_COUNTERPARTY_RESET:
            return {};
        default:
            return state;
    }
};
export const changePasswordReducer = ( state = {}, action ) => {
    switch (action.type) {
        case CHANGE_PASSWORD_REQUEST:
            return { loadingChangePassword: true };
        case CHANGE_PASSWORD_SUCCESS:
            return {
                loadingChangePassword: false,
                messageChangePassword: action.payload
            };
        case CHANGE_PASSWORD_FAIL:
            return { loadingChangePassword: false, errorChangePassword: action.payload };
        case CHANGE_PASSWORD_RESET:
            return {};
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
export const getAllCounterpartiesReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_COUNTERPARTIES_REQUEST:
            return { loadingAllCounterparties: true };
        case GET_COUNTERPARTIES_SUCCESS:
            return {
                loadingAllCounterparties: false,
                allCounterpartiesList: action.payload.data
             };
        case GET_COUNTERPARTIES_FAIL:
            return { loadingAllCounterparties: false, errorAllCounterparties: action.payload };
        default:
            return state;
    }
};