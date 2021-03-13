import { JOURNAL_LIST_FAIL, JOURNAL_LIST_REQUEST, JOURNAL_LIST_SUCCESS, TRANSACTION_LAST_LIST_FAIL, TRANSACTION_LAST_LIST_REQUEST, TRANSACTION_LAST_LIST_SUCCESS } from "../constants/transactionConstants";

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
        default:
            return state;
    }
};