import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { SET_CONTENT } from "../Action/ContentActioons";
import { SET_ISCREATETODAY } from "../Action/WorkAction";

export type WorkState = {
    iscreateToday: boolean
}

export const INITIAL_WORK: WorkState = {
    iscreateToday: false
};

export const WorkReducer = createReducer(
    INITIAL_WORK,
    (builder) => {
        builder
            .addCase(SET_ISCREATETODAY, (state, action: PayloadAction<boolean>) => {
                state.iscreateToday = action.payload;
            })
    }
)