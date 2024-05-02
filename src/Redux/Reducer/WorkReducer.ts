import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { SAVE_ID_TODOLIST, SAVE_TODOLIST, SET_ISCREATETODAY } from "../Action/WorkAction";
import { TodoList } from "../../Models/Model";

export type WorkState = {
    iscreateToday: boolean
    id_todolist: string
    todolist: TodoList[]
}

export const INITIAL_WORK: WorkState = {
    iscreateToday: false,
    id_todolist: '',
    todolist: []
};

export const WorkReducer = createReducer(
    INITIAL_WORK,
    (builder) => {
        builder
            .addCase(SET_ISCREATETODAY, (state, action: PayloadAction<boolean>) => {
                state.iscreateToday = action.payload;
            })
            .addCase(SAVE_ID_TODOLIST, (state, action: PayloadAction<string>) => {
                state.id_todolist = action.payload;
            })
            .addCase(SAVE_TODOLIST, (state, action: PayloadAction<TodoList[]>) => {
                state.todolist = action.payload;
            });
    }
)