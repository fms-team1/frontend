import { ADD_TRANSACTION_FAIL, ADD_TRANSACTION_REQUEST, ADD_TRANSACTION_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, JOURNAL_BY_SECTION_FAIL, JOURNAL_BY_SECTION_REQUEST, JOURNAL_BY_SECTION_SUCCESS, JOURNAL_LIST_FAIL, JOURNAL_LIST_REQUEST, JOURNAL_LIST_SUCCESS, TRANSACTION_LAST_LIST_FAIL, TRANSACTION_LAST_LIST_REQUEST, TRANSACTION_LAST_LIST_SUCCESS, TRANSACTION_PERIOD_LIST_FAIL, TRANSACTION_PERIOD_LIST_REQUEST, TRANSACTION_PERIOD_LIST_SUCCESS } from "../constants/transactionConstants";

export const lastListTransactionReducer = (
    state = { loading: true, transactions: [] },
    action
) => {
    switch (action.type) {
        case TRANSACTION_LAST_LIST_REQUEST:
            return { loading: true };
        case TRANSACTION_LAST_LIST_SUCCESS:
            return {
                loading: false,
                incomesAndExpenses: action.payload.incomesAndExpensesHomeModel,
                walletBalance: action.payload.walletBalance,
                transactions: action.payload.transactionModels
            };
        case TRANSACTION_LAST_LIST_FAIL:
            return { loading: false, error: action.payload };
        case TRANSACTION_PERIOD_LIST_REQUEST:
            return { loading: true };
        case TRANSACTION_PERIOD_LIST_SUCCESS:
            return {
                loading: false,
                incomesAndExpenses: action.payload.incomesAndExpensesHomeModel,
                walletBalance: action.payload.walletBalance,
                transactions: action.payload.transactionModels
            };
        case TRANSACTION_PERIOD_LIST_FAIL:
            return { loading: false, errorPeriod: action.payload };
        default:
            return state;
    }
};
export const getJournalListReducer = (
    state = { loading: true, transactions: [] },
    action
) => {
    switch (action.type) {
        case JOURNAL_LIST_REQUEST:
            return { loading: true };
        case JOURNAL_LIST_SUCCESS:
            return {
                loading: false,
                transactions: action.payload
            };
        case JOURNAL_LIST_FAIL:
            return { loading: false, error: action.payload };
        case JOURNAL_BY_SECTION_REQUEST:
            return { loading: true };
        case JOURNAL_BY_SECTION_SUCCESS:
            return {
                loading: false,
                transactions: action.payload
            };
        case JOURNAL_BY_SECTION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const listPeriodTransactionsReducer = (
    state = { transactionsPeriod: [] },
    action
) => {
    switch (action.type) {
        case TRANSACTION_PERIOD_LIST_REQUEST:
            return { loadingPeriod: true };
        case TRANSACTION_PERIOD_LIST_SUCCESS:
            return {
                loadingPeriod: false,
                incomesAndExpensesPeriod: action.payload.incomesAndExpensesHomeModel,
                walletBalancePeriod: action.payload.walletBalance,
                transactionsPeriod: action.payload.transactionModels
            };
        case TRANSACTION_PERIOD_LIST_FAIL:
            return { loadingPeriod: false, errorPeriod: action.payload };
        default:
            return state;
    }
};
export const getAllCategoryReducer = (
    state = { loading: true, categories: [] },
    action
) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true };
        case CATEGORY_LIST_SUCCESS:
            return {
                loading: false,
                categories: action.payload
            };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const addNewTransactionReducer = ( state = {}, action ) => {
    switch (action.type) {
        case ADD_TRANSACTION_REQUEST:
            return { loadingAdd: true };
        case ADD_TRANSACTION_SUCCESS:
            return {
                loadingAdd: false,
                messageAdd: action.payload
            };
        case ADD_TRANSACTION_FAIL:
            return { loadingAdd: false, errorAdd: action.payload };
        default:
            return state;
    }
};