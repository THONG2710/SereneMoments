import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { MomentModel } from "../../Models/Model";
import { SAVE_MYFRIENDMOMENTS, SAVE_MYMOMENTS } from "../Action/MomentActions";

export type MomentState = {
    myFriendsMoments: MomentModel[],
    myMoments: MomentModel[],
}

export const INITIAL_MOMENT: MomentState = {
    myFriendsMoments: [],
    myMoments: [],
};

export const MomentReducer = createReducer(
    INITIAL_MOMENT,
    (builder) => {
        builder
            .addCase(SAVE_MYFRIENDMOMENTS, (state, action: PayloadAction<MomentModel[]>) => {
                state.myFriendsMoments = action.payload;
            })
            .addCase(SAVE_MYMOMENTS, (state, action: PayloadAction<MomentModel[]>) => {
                state.myMoments = action.payload;
            })
    }
)