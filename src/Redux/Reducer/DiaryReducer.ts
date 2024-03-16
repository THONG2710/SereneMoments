import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { SAVE_MYFRIENDS } from "../Action/FriendsActions";
import { DiaryModel } from "../../Models/Model";
import { SAVE_MYDIARIES } from "../Action/DiaryActions";

export type DiaryState = {
    myDiary: DiaryModel[],
}

export const INITIAL_DIARY: DiaryState = {
    myDiary: [],
};

export const DiaryReducer = createReducer(
    INITIAL_DIARY,
    (builder) => {
        builder
            .addCase(SAVE_MYDIARIES, (state, action: PayloadAction<DiaryModel[]>) => {
                state.myDiary = action.payload;
            })
    }
)