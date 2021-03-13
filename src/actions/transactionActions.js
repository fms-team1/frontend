import axios from 'axios';
import { JOURNAL_LIST_FAIL, JOURNAL_LIST_REQUEST, JOURNAL_LIST_SUCCESS, TRANSACTION_LAST_LIST_FAIL, TRANSACTION_LAST_LIST_REQUEST, TRANSACTION_LAST_LIST_SUCCESS } from '../constants/transactionConstants';


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
export const getJournalList = (token) => async (dispatch) => {
    dispatch({
        type: JOURNAL_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('https://neo-fms.herokuapp.com/journal/getAllWeb', {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            }
        });
        dispatch({ type: JOURNAL_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: JOURNAL_LIST_FAIL, payload: error.message });
    }
}