import { combineReducers } from "@reduxjs/toolkit";
import { AuthenticationReducer } from "./AuthenticationReducer";
import { ContentReducer } from "./ContentReducer";
import { WorkReducer } from "./WorkReducer";

export const RootReducer = combineReducers({
    Authentication: AuthenticationReducer,
    Content: ContentReducer,
    Work: WorkReducer
});

export type RootState = ReturnType<typeof RootReducer>;