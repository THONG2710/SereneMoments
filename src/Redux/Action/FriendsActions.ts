import { createAction } from "@reduxjs/toolkit";
import { MomentModel, UserModel } from "../../Models/Model";

const SAVE_MYFRIENDS = createAction<UserModel[], 'friends/myFriends'>('friends/myFriends');

export {SAVE_MYFRIENDS}