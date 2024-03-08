import { combineReducers } from "@reduxjs/toolkit";
import { AuthenticationReducer } from "./AuthenticationReducer";
import { ContentReducer } from "./ContentReducer";

export const RootReducer = combineReducers({
    Authentication: AuthenticationReducer,
    Content: ContentReducer,
});

export type RootState = ReturnType<typeof RootReducer>;