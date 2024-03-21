import { createAction } from "@reduxjs/toolkit";

const SET_CONTENT = createAction<string, 'content/setContent'>('content/setContent');
export {SET_CONTENT}