import axios from "axios";
import { 
    USER_SIGN_REQUEST,
    USER_SIGN_SUCCESS,
    USER_SIGN_FAIL,
    USER_SIGNOUT,
    GET_CURRENT_USER_FAIL,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_REQUEST,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    ADD_ACCOUNTANT_REQUEST,
    ADD_ACCOUNTANT_SUCCESS,
    ADD_ACCOUNTANT_FAIL,
    NEW_COUNTERPARTY_REQUEST,
    NEW_COUNTERPARTY_SUCCESS,
    NEW_COUNTERPARTY_FAIL,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL
 } from "../constants/userConstants"

export const signin = (email, password, rememberMe) => async (dispatch) => {
    localStorage.setItem('userRememberMe', JSON.stringify({
        rememberMeStorage: rememberMe
    }));
    dispatch({ type: USER_SIGN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post('https://neo-fms.herokuapp.com/login', {
            "email": email,
            "password": password
        });
        dispatch({ type: USER_SIGN_SUCCESS, payload: { data } });
        localStorage.setItem('userToken', JSON.stringify({
            email: email,
            jwt: data.jwt
        }));
    } catch (error) {
        dispatch({
            type: USER_SIGN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const signout = () => (dispatch) => {
    localStorage.removeItem('userToken');
    dispatch({ type: USER_SIGNOUT, payload: JSON.parse(localStorage.getItem('userRememberMe')) });
}

export const getCurrentUser = (token) => async (dispatch) => {
    dispatch({
        type: GET_CURRENT_USER_REQUEST
    });
    try {
        const { data } = await axios.get('https://neo-fms.herokuapp.com/user/getCurrentUser', {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            }
        });
        dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_CURRENT_USER_FAIL, payload: error.message });
    }
}
export const addAccountant = (email, groupId, firstName, password, phoneNumber, surname) => async (dispatch, getState) => {
    dispatch({
        type: ADD_ACCOUNTANT_REQUEST
    });
    const {
        userSignin: { userInfo }
    } = getState();
    try {
        const { data } = await axios.post('https://neo-fms.herokuapp.com/registration/newAccountant',
        {
            email: email,
            group_ids: [groupId], 
            name: firstName,
            password: password,
            phoneNumber: phoneNumber,
            surname: surname
        },
        {
            headers: {
                'Authorization': `Bearer ${userInfo.jwt}`
            }
        });
        dispatch({ type: ADD_ACCOUNTANT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_ACCOUNTANT_FAIL, payload: error.message });
    }
}
export const newCounterparty = (firstName, surname, groupId, phoneNumber) => async (dispatch) => {
    dispatch({
        type: NEW_COUNTERPARTY_REQUEST
    });
    try {
        const { data } = await axios.post('https://neo-fms.herokuapp.com/registration/newCounterparty',
        {
            group_ids: [groupId],
            name: firstName,
            phoneNumber: phoneNumber,
            surname: surname
        });
        dispatch({ type: NEW_COUNTERPARTY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: NEW_COUNTERPARTY_FAIL, payload: error.message });
    }
}
export const getAllUsers = (token) => async (dispatch) => {
    dispatch({
        type: GET_ALL_USERS_REQUEST
    });
    try {
        const { data } = await axios.get('https://neo-fms.herokuapp.com/user/getAllUsers', {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            }
        });
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_USERS_FAIL, payload: error.message });
    }
}
export const changePassword = (newPassword, oldPassword) => async (dispatch, getState) => {
    dispatch({
        type: CHANGE_PASSWORD_REQUEST
    });
    const {
        userSignin: { userInfo }
    } = getState();
    try {
        const { data } = await axios.put('https://neo-fms.herokuapp.com/user/changePassword',
        {
            newPassword: newPassword,
            oldPassword: oldPassword
        },
        {
            headers: {
                'Authorization': `Bearer ${userInfo.jwt}`
            }
        });
        dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CHANGE_PASSWORD_FAIL, payload: error.message });
    }
}