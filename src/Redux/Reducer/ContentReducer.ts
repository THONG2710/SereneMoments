import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { SET_CONTENT } from "../Action/ContentActions";

export type ContentState = {
    content: string
}

export const INITIAL_CONTENT: ContentState = {
    content: ''
};

export const ContentReducer = createReducer(
    INITIAL_CONTENT,
    (builder) => {
        builder
            .addCase(SET_CONTENT, (state, action: PayloadAction<string>) => {
                state.content = action.payload;
            })
    }
)