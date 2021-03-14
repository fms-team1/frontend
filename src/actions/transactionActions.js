import axios from 'axios';
import { ADD_TRANSACTION_FAIL, ADD_TRANSACTION_REQUEST, ADD_TRANSACTION_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, JOURNAL_LIST_FAIL, JOURNAL_LIST_REQUEST, JOURNAL_LIST_SUCCESS, TRANSACTION_LAST_LIST_FAIL, TRANSACTION_LAST_LIST_REQUEST, TRANSACTION_LAST_LIST_SUCCESS, TRANSACTION_PERIOD_LIST_FAIL, TRANSACTION_PERIOD_LIST_REQUEST, TRANSACTION_PERIOD_LIST_SUCCESS } from '../constants/transactionConstants';


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
export const addNewTransaction = (token, summa, wallet, category, comment, counterparty, date) => async (dispatch) => {
    dispatch({
        type: ADD_TRANSACTION_REQUEST
    });
    try {
        const { data } = await axios.post('https://neo-fms.herokuapp.com/transaction/addIncomeOrExpense',
        {
            amount: summa,
            walletId: wallet,
            categoryId: category,
            comment: comment,
            counterpartyName: counterparty,
            date: date
        },
        {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            }
        });
        dispatch({ type: ADD_TRANSACTION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_TRANSACTION_FAIL, payload: error.message });
    }
}
export const listPeriodTransactions = (token, period) => async (dispatch) => {
    dispatch({
        type: TRANSACTION_PERIOD_LIST_REQUEST
    });
    try {
        const { data } = await axios.get(`https://neo-fms.herokuapp.com/home/${period}`, {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            }
        });
        console.log(data);
        dispatch({ type: TRANSACTION_PERIOD_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: TRANSACTION_PERIOD_LIST_FAIL, payload: error.message });
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
export const getAllCategory = (token) => async (dispatch) => {
    dispatch({
        type: CATEGORY_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('https://neo-fms.herokuapp.com/category/getAll', {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            }
        });
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
    }
}