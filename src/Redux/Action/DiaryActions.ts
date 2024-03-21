import { createAction } from "@reduxjs/toolkit";
import { DiaryModel, MomentModel } from "../../Models/Model";

const SAVE_MYDIARIES = createAction<DiaryModel[], 'diary/myDiary'>('diary/myDiary');

export {SAVE_MYDIARIES}