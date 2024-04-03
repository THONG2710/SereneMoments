import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { IS_REFRESH, SAVE_USER, SET_ISLOGGED } from "../Action/AuthenticationActions";
import { UserModel } from "../../Models/Model";

export type AuthenticationState = {
    isLogged: boolean;
    myAccount: UserModel;
    isLoading: boolean;
}

export const INITIAL_AUTHENTICATION_STATE: AuthenticationState = {
    isLogged: false,
    myAccount: { _id: '', username: '', password: '', email: '', available: true, avatar: '', createdat: 0, phoneNumber: ''},
    isLoading: false,
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
            .addCase(IS_REFRESH, (state, action: PayloadAction<boolean>) => { 
                state.isLoading = action.payload
            });
    }
)