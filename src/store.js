import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { addAccountantReducer, changePasswordReducer, getAllCounterpartiesReducer, getAllUsersReducer, getCurrentUserReducer, newCounterpartyReducer, userSigninReducer } from "./reducers/userReducers";
import thunk from "redux-thunk";
import { addNewTransactionReducer, getAllActiveGroupsReducer, getAllCategoryReducer, getAllWalletReducer, getAnalyticsReducer, getCategoriesByNeoSectionReducer, getCategoryListReducer, getFilterListReducer, getJournalListReducer, getNeoSectionsReducer, getTransactionReducer, lastListTransactionReducer, listPeriodTransactionsReducer } from "./reducers/transactionReducers";

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userToken')
            ? JSON.parse(localStorage.getItem('userToken'))
            : null,
        userRememberMe: localStorage.getItem('userRememberMe')
        ? JSON.parse(localStorage.getItem('userRememberMe'))
        : null
    }
};

const reducer = combineReducers({
    lastTransaction: lastListTransactionReducer,
    userSignin: userSigninReducer,
    listJournal: getJournalListReducer,
    categoryList: getCategoryListReducer,
    sectionList: getNeoSectionsReducer,
    filterList: getFilterListReducer,
    addTransaction: addNewTransactionReducer,
    addAccountant: addAccountantReducer,
    registerCounterparty: newCounterpartyReducer,
    transactionTypesList: getTransactionReducer,
    changePasswordResult: changePasswordReducer,
    currentUser: getCurrentUserReducer,
    allUsers: getAllUsersReducer,
    allCounterparties: getAllCounterpartiesReducer,
    walletList: getAllWalletReducer,
    activeGroupList: getAllActiveGroupsReducer,
    analyticsData: getAnalyticsReducer
})

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhanser(applyMiddleware(thunk))
);

export default store;