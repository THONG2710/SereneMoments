import { createAction } from "@reduxjs/toolkit";

const SET_ISCREATETODAY = createAction<boolean, 'work/setidtoday'>('work/setidtoday');

const SAVE_ID_TODOLIST =createAction<string, 'work/set_idTodoList'>('work/set_idTodoList');
export {SET_ISCREATETODAY, SAVE_ID_TODOLIST}