import axios from "axios";
import { 
    USER_SIGN_REQUEST,
    USER_SIGN_SUCCESS,
    USER_SIGN_FAIL,
    USER_SIGNOUT,
    GET_CURRENT_USER_FAIL,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_REQUEST
 } from "../constants/userConstants"

export const signin = (email, password, rememberMe) => async (dispatch) => {
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
        if(rememberMe) {
            localStorage.setItem('userToken', JSON.stringify({
                email: email,
                jwt: data.jwt
            }));
        }
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
    dispatch({ type: USER_SIGNOUT });
    document.location.href = '/signin';
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