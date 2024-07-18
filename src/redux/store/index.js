import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reduer/reducer_user";
import tokenReducer from "../reduer/reducer_tokens";

const bigReducer = combineReducers({
   user: userReducer,
   tokens: tokenReducer,
});

const store = configureStore({
   reducer: bigReducer,
});

export default store;
