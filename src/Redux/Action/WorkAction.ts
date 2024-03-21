import { createAction } from "@reduxjs/toolkit";

const SET_ISCREATETODAY = createAction<boolean, 'work/setidtoday'>('work/setidtoday');
export {SET_ISCREATETODAY}