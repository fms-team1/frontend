import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { getAllUsersReducer, getCurrentUserReducer, userSigninReducer } from "./reducers/userReducers";
import thunk from "redux-thunk";
import { addAccountantReducer, addNewTransactionReducer, changePasswordReducer, getAllActiveGroupsReducer, getAllCategoryReducer, getAllWalletReducer, getCategoriesByNeoSectionReducer, getCategoryListReducer, getFilterListReducer, getJournalListReducer, getNeoSectionsReducer, lastListTransactionReducer, listPeriodTransactionsReducer } from "./reducers/transactionReducers";

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userToken')
            ? JSON.parse(localStorage.getItem('userToken'))
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
    changePasswordResult: changePasswordReducer,
    currentUser: getCurrentUserReducer,
    allUsers: getAllUsersReducer,
    walletList: getAllWalletReducer,
    activeGroupList: getAllActiveGroupsReducer
})

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhanser(applyMiddleware(thunk))
);

export default store;