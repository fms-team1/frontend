import { ADD_TRANSACTION_FAIL, ADD_TRANSACTION_REQUEST, ADD_TRANSACTION_SUCCESS, CATEGORIES_BY_SECTION_FAIL, CATEGORIES_BY_SECTION_REQUEST, CATEGORIES_BY_SECTION_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, FILTER_LIST_FAIL, FILTER_LIST_REQUEST, FILTER_LIST_SUCCESS, GROUP_LIST_FAIL, GROUP_LIST_REQUEST, GROUP_LIST_SUCCESS, JOURNAL_BY_SECTION_FAIL, JOURNAL_BY_SECTION_REQUEST, JOURNAL_BY_SECTION_SUCCESS, JOURNAL_LIST_FAIL, JOURNAL_LIST_REQUEST, JOURNAL_LIST_SUCCESS, SECTION_LIST_FAIL, SECTION_LIST_REQUEST, SECTION_LIST_SUCCESS, TRANSACTION_LAST_LIST_FAIL, TRANSACTION_LAST_LIST_REQUEST, TRANSACTION_LAST_LIST_SUCCESS, TRANSACTION_PERIOD_LIST_FAIL, TRANSACTION_PERIOD_LIST_REQUEST, TRANSACTION_PERIOD_LIST_SUCCESS, WALLET_LIST_FAIL, WALLET_LIST_REQUEST, WALLET_LIST_SUCCESS, ADD_TRANSACTION_RESET, TRANSACTION_TYPES_REQUEST, TRANSACTION_TYPES_SUCCESS, TRANSACTION_TYPES_FAIL, ANALYTICS_REQUEST, ANALYTICS_SUCCESS, ANALYTICS_FAIL, DEBTS_LIST_REQUEST, DEBTS_LIST_SUCCESS, DEBTS_LIST_FAIL } from "../constants/transactionConstants";

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
export const listDebtsReducer = (
    state = { loading: true, transactions: [] },
    action
) => {
    switch (action.type) {
        case DEBTS_LIST_REQUEST:
            return { loading: true };
        case DEBTS_LIST_SUCCESS:
            return {
                loading: false,
                transactions: action.payload
            };
        case DEBTS_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const getCategoryListReducer = (
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
        case CATEGORIES_BY_SECTION_REQUEST:
            return { loading: true };
        case CATEGORIES_BY_SECTION_SUCCESS:
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
export const getCategoriesByNeoSectionReducer = (
    state = { loading: true, categories: [] },
    action
) => {
    switch (action.type) {
        case CATEGORIES_BY_SECTION_REQUEST:
            return { loading: true };
        case CATEGORIES_BY_SECTION_SUCCESS:
            return {
                loading: false,
                categories: action.payload
            };
        case CATEGORIES_BY_SECTION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const getNeoSectionsReducer = (
    state = { loading: true, sections: [] },
    action
) => {
    switch (action.type) {
        case SECTION_LIST_REQUEST:
            return { loading: true };
        case SECTION_LIST_SUCCESS:
            return {
                loading: false,
                sections: action.payload
            };
        case SECTION_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const getAnalyticsReducer = (
    state = { loading: true, analytics: [] },
    action
) => {
    switch (action.type) {
        case ANALYTICS_REQUEST:
            return { loading: true };
        case ANALYTICS_SUCCESS:
            return {
                loading: false,
                analytics: action.payload
            };
        case ANALYTICS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const getAllWalletReducer = (
    state = { loading: true, wallets: [] },
    action
) => {
    switch (action.type) {
        case WALLET_LIST_REQUEST:
            return { loading: true };
        case WALLET_LIST_SUCCESS:
            return {
                loading: false,
                wallets: action.payload
            };
        case WALLET_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const getAllActiveGroupsReducer = (
    state = { groupsLoading: true, activeGroups: [] },
    action
) => {
    switch (action.type) {
        case GROUP_LIST_REQUEST:
            return { groupsLoading: true };
        case GROUP_LIST_SUCCESS:
            return {
                groupsLoading: false,
                activeGroups: action.payload
            };
        case GROUP_LIST_FAIL:
            return { groupsLoading: false, groupsError: action.payload };
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
        case ADD_TRANSACTION_RESET:
            return {};
        default:
            return state;
    }
};
export const getFilterListReducer = ( state = {}, action ) => {
    switch (action.type) {
        case FILTER_LIST_REQUEST:
            return { loadingFilter: true };
        case FILTER_LIST_SUCCESS:
            return {
                loadingFilter: false,
                filterTypeList: action.payload
            };
        case FILTER_LIST_FAIL:
            return { loadingFilter: false, errorFilter: action.payload };
        default:
            return state;
    }
};
export const getTransactionReducer = ( state = {}, action ) => {
    switch (action.type) {
        case TRANSACTION_TYPES_REQUEST:
            return { loadingTransactionTypes: true };
        case TRANSACTION_TYPES_SUCCESS:
            return {
                loadingTransactionTypes: false,
                transactionTypes: action.payload
            };
        case TRANSACTION_TYPES_FAIL:
            return { loadingTransactionTypes: false, errorTransactionTypes: action.payload };
        default:
            return state;
    }
};