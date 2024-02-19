import { combineReducers } from "@reduxjs/toolkit";
import { AuthenticationReducer } from "./AuthenticationReducer";

export const RootReducer = combineReducers({
    Authentication: AuthenticationReducer
});

export type RootState = ReturnType<typeof RootReducer>;