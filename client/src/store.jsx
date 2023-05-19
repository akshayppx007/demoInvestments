import { combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./utils/persistReducer";
import { adminInvestmentsReducer, investmentReducer, userInvestmentsReducer, withdrawInterestReducer } from "./reducers/investmentReducer";
import { userUpdateReducer } from "./reducers/userReducers";


const reducer = combineReducers({
	persistedReducer: persistedReducer,
	investment: investmentReducer,
	userInvestments: userInvestmentsReducer,
	interestWithdraw: withdrawInterestReducer,
	adminInvestments: adminInvestmentsReducer,
	updateUser: userUpdateReducer,
});



let initialState = {
};

// const middleware = [thunk];


const store = configureStore({
	reducer: reducer,
	devTools: true,
    preloadedState: initialState,
	// composeWithDevTools(applyMiddleware(middleware)),
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
	  immutableStateInvariantCheck: false,
    }).concat(thunkMiddleware),
});

export default store;
