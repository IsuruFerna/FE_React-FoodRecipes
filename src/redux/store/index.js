import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reduer/user";
import tokenReducer from "../reduer/tokens";

const bigReducer = combineReducers({
   user: userReducer,
   tokens: tokenReducer,
});

const store = configureStore({
   reducer: bigReducer,
});

export default store;
