
import counter from "@redux/slices/counter";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ counter });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
