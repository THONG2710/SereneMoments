import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { SAVE_USER, SET_ISLOGGED } from "../Action/AuthenticationActions";
import { UserModel } from "../../Models/Model";

export type AuthenticationState = {
    isLogged: boolean;
    myAccount: UserModel
}

export const INITIAL_AUTHENTICATION_STATE: AuthenticationState = {
    isLogged: false,
    myAccount: { _id: '', username: '', password: '', email: '', available: true, avatar: '', createdat: 0, phoneNumber: ''}
};

export const AuthenticationReducer = createReducer(
    INITIAL_AUTHENTICATION_STATE,
    (builder) => {
        builder
            .addCase(SET_ISLOGGED, (state, action: PayloadAction<boolean>) => {
                state.isLogged = action.payload;
            })
            .addCase(SAVE_USER, (state, action: PayloadAction<UserModel>) => {
                state.myAccount = action.payload
            })
    }
)