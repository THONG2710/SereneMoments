import { createAction } from "@reduxjs/toolkit";
import { TodoList } from "../../Models/Model";

const SET_ISCREATETODAY = createAction<boolean, 'work/setidtoday'>('work/setidtoday');

const SAVE_ID_TODOLIST =createAction<string, 'work/set_idTodoList'>('work/set_idTodoList');

const SAVE_TODOLIST = createAction<TodoList[], 'work/set_todoList'>('work/set_todoList');
export {SET_ISCREATETODAY, SAVE_ID_TODOLIST, SAVE_TODOLIST}
