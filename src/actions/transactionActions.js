import axios from 'axios';
import { TRANSACTION_LAST_LIST_FAIL, TRANSACTION_LAST_LIST_REQUEST, TRANSACTION_LAST_LIST_SUCCESS } from '../constants/transactionConstants';


export const listLastTransactions = (token) => async (dispatch) => {
    dispatch({
        type: TRANSACTION_LAST_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('https://neo-fms.herokuapp.com/home', {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            }
        });
        dispatch({ type: TRANSACTION_LAST_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: TRANSACTION_LAST_LIST_FAIL, payload: error.message });
    }
}