import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { userSigninReducer } from "./reducers/userReducers";
import thunk from "redux-thunk";
import { getJournalListReducer, lastListTransactionReducer } from "./reducers/transactionReducers";

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
    listJournal: getJournalListReducer
})

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhanser(applyMiddleware(thunk))
);

export default store;