import { TRANSACTION_LAST_LIST_FAIL, TRANSACTION_LAST_LIST_REQUEST, TRANSACTION_LAST_LIST_SUCCESS } from "../constants/transactionConstants";

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
                transactions: action.payload.lastFifteenTransactions
            };
        case TRANSACTION_LAST_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};