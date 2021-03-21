import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { getCurrentUserReducer, userSigninReducer } from "./reducers/userReducers";
import thunk from "redux-thunk";
import { addNewTransactionReducer, getAllCategoryReducer, getAllWalletReducer, getJournalListReducer, lastListTransactionReducer, listPeriodTransactionsReducer } from "./reducers/transactionReducers";

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
    categoryList: getAllCategoryReducer,
    addTransaction: addNewTransactionReducer,
    currentUser: getCurrentUserReducer,
    walletList: getAllWalletReducer
})

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhanser(applyMiddleware(thunk))
);

export default store;