import { createAction } from "@reduxjs/toolkit";
import { MomentModel } from "../../Models/Model";

const SAVE_MYFRIENDMOMENTS = createAction<MomentModel[], 'moments/friendsMoment'>('moments/friendsMoment');
const SAVE_MYMOMENTS = createAction<MomentModel[], 'moments/myMoments'>('moments/myMoments');
export {SAVE_MYFRIENDMOMENTS, SAVE_MYMOMENTS}