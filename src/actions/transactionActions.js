import axios from 'axios';
import { ADD_TRANSACTION_FAIL, ADD_TRANSACTION_REQUEST, ADD_TRANSACTION_SUCCESS,
        CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS,
        JOURNAL_BY_SECTION_FAIL,JOURNAL_BY_SECTION_REQUEST, JOURNAL_BY_SECTION_SUCCESS,
        JOURNAL_LIST_FAIL, JOURNAL_LIST_REQUEST, JOURNAL_LIST_SUCCESS,
        TRANSACTION_LAST_LIST_FAIL, TRANSACTION_LAST_LIST_REQUEST, TRANSACTION_LAST_LIST_SUCCESS,
        TRANSACTION_PERIOD_LIST_FAIL, TRANSACTION_PERIOD_LIST_REQUEST, TRANSACTION_PERIOD_LIST_SUCCESS,
        WALLET_LIST_FAIL, WALLET_LIST_REQUEST, WALLET_LIST_SUCCESS,
        FILTER_LIST_REQUEST, FILTER_LIST_SUCCESS, FILTER_LIST_FAIL,
        CATEGORIES_BY_SECTION_REQUEST, CATEGORIES_BY_SECTION_SUCCESS, CATEGORIES_BY_SECTION_FAIL, SECTION_LIST_REQUEST, SECTION_LIST_SUCCESS, SECTION_LIST_FAIL, GROUP_LIST_REQUEST, GROUP_LIST_SUCCESS, GROUP_LIST_FAIL, ADD_ACCOUNTANT_REQUEST, ADD_ACCOUNTANT_SUCCESS, ADD_ACCOUNTANT_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL } from '../constants/transactionConstants';


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
export const getCategoriesByNeoSection = (token, neoSection) => async (dispatch) => {
    dispatch({
        type: CATEGORIES_BY_SECTION_REQUEST
    });
    try {
        const { data } = await axios.get('https://neo-fms.herokuapp.com/category/getCategoriesByNeoSection', {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            },
            params: { neoSectionId : +neoSection }
        });
        dispatch({ type: CATEGORIES_BY_SECTION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CATEGORIES_BY_SECTION_FAIL, payload: error.message });
    }
}
export const addTransferTransaction = (token, amount, walletTo, walletFrom, comment) => async (dispatch) => {
    dispatch({
        type: ADD_TRANSACTION_REQUEST
    });
    try {
        const { data } = await axios.post('https://neo-fms.herokuapp.com/transaction/addTransfer',
        {
            amount: amount,
            comment: comment,
            walletFromId: walletFrom,
            walletToId: walletTo
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
export const addIncExpTransaction = (token, summa, wallet, category, comment, counterparty, date) => async (dispatch) => {
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
        dispatch({ type: TRANSACTION_PERIOD_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: TRANSACTION_PERIOD_LIST_FAIL, payload: error.message });
    }
}
export const getJournalList = (
    neoSectionId = null,
    operation = null,
    category = null,
    startPeriod = null,
    endPeriod = null,
    wallet = null,
    counterparty = null,
    users = null
    ) => async (dispatch, getState) => {
    dispatch({
        type: JOURNAL_LIST_REQUEST
    });
    const {
        userSignin: { userInfo },
      } = getState();
    try {
        const { data } = await axios.get('https://neo-fms.herokuapp.com/transaction/getByGlobalFiltration', {
            headers: {
                'Authorization': `Bearer ${userInfo.jwt}`
            },
            params: {
                neoSectionId : neoSectionId,
                transactionTypeId : operation,
                categoryId : category,
                startDate : startPeriod,
                endDate : endPeriod,
                walletId : wallet,
                counterpartyId : counterparty,
                userId : users
            }
        });
        dispatch({ type: JOURNAL_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: JOURNAL_LIST_FAIL, payload: error.message });
    }
}
export const getFilterTypeList = (token) => async (dispatch) => {
    dispatch({
        type: FILTER_LIST_REQUEST
    });
    try {
        const data = await axios.all([
            axios.get('https://neo-fms.herokuapp.com/wallet/getAllActiveWallets', {
                headers: {
                    'Authorization': `Bearer ${token.jwt}`
                }
            }),
            axios.get('https://neo-fms.herokuapp.com/transaction/getTransactionTypes', {
                headers: {
                    'Authorization': `Bearer ${token.jwt}`
                }
            }),
            axios.get('https://neo-fms.herokuapp.com/category/getNeoSections', {
                headers: {
                    'Authorization': `Bearer ${token.jwt}`
                }
            }),
            axios.get('https://neo-fms.herokuapp.com/user/getAllUsers', {
                headers: {
                    'Authorization': `Bearer ${token.jwt}`
                }
            }),
            axios.get('https://neo-fms.herokuapp.com/people/getAllCounterparties', {
                headers: {
                    'Authorization': `Bearer ${token.jwt}`
                }
            }),
        ]).then(axios.spread((...responses) => responses));
        dispatch({ type: FILTER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FILTER_LIST_FAIL, payload: error.message });
    }
}
export const getByNeoSection = (token, section) => async (dispatch) => {
    dispatch({
        type: JOURNAL_BY_SECTION_REQUEST
    });
    try {
        const { data } = await axios.get(`https://neo-fms.herokuapp.com/journal/getByNeoSection?neoSection=${section}`, {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            }
        });
        dispatch({ type: JOURNAL_BY_SECTION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: JOURNAL_BY_SECTION_FAIL, payload: error.message });
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
export const getNeoSections = (token) => async (dispatch) => {
    dispatch({
        type: SECTION_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('https://neo-fms.herokuapp.com/category/getNeoSections', {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            }
        });
        dispatch({ type: SECTION_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SECTION_LIST_FAIL, payload: error.message });
    }
}
export const getAllWallet = (token) => async (dispatch) => {
    dispatch({
        type: WALLET_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('https://neo-fms.herokuapp.com/wallet/getAllActiveWallets', {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            }
        });
        dispatch({ type: WALLET_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: WALLET_LIST_FAIL, payload: error.message });
    }
}
export const getAllActiveGroups = () => async (dispatch, getState) => {
    dispatch({
        type: GROUP_LIST_REQUEST
    });
    const {
        userSignin: { userInfo }
    } = getState();
    try {
        const { data } = await axios.get('https://neo-fms.herokuapp.com/group/getAllActiveGroups', {
            headers: {
                'Authorization': `Bearer ${userInfo.jwt}`
            }
        });
        dispatch({ type: GROUP_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GROUP_LIST_FAIL, payload: error.message });
    }
}