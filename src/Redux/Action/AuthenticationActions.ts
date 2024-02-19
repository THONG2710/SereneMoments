import { createAction } from "@reduxjs/toolkit";
import { UserModel } from "../../Models/Model";

const SET_ISLOGGED = createAction<boolean, 'Authentication/isLogged'>('Authentication/isLogged');
const SAVE_USER = createAction<UserModel, 'Authentication/saveUser'>('Authentication/saveUser');
export {SET_ISLOGGED, SAVE_USER}