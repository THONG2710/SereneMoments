import { combineReducers } from "@reduxjs/toolkit";
import { AuthenticationReducer } from "./AuthenticationReducer";
import { ContentReducer } from "./ContentReducer";
import { WorkReducer } from "./WorkReducer";
import { MomentReducer } from "./MomentReducer";
import { FriendsReducer } from "./FriendsReducer";
import { DiaryReducer } from "./DiaryReducer";

export const RootReducer = combineReducers({
    Authentication: AuthenticationReducer,
    Content: ContentReducer,
    Work: WorkReducer,
    Moment: MomentReducer,
    Friends: FriendsReducer,
    Diary: DiaryReducer
});

export type RootState = ReturnType<typeof RootReducer>;