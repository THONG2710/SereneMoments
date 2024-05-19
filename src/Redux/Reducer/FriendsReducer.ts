import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { MomentModel, UserModel } from "../../Models/Model";
import { SAVE_MYFRIENDS } from "../Action/FriendsActions";

export type FriendsState = {
    myFriends: UserModel[],
}

export const INITIAL_FRIENDS: FriendsState = {
    myFriends: [],
};

export const FriendsReducer = createReducer(
    INITIAL_FRIENDS,
    (builder) => {
        builder
            .addCase(SAVE_MYFRIENDS, (state, action: PayloadAction<UserModel[]>) => {
                state.myFriends = action.payload;
            })
    }
)