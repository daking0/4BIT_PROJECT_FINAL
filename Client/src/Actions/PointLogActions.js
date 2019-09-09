/**
 * PointLog action
 * @author: 황서영
 * 
 * @description: 
 * ReadPointLog : 학생 개인 전체 포인트 로그 
 */

import { ActionTypes } from '../utils/ActionTypeList';

const ReadPointLog = (userId, page, size = 15) => {
    return({
        type : ActionTypes.READ_MYPOINTLOG,
        payload : {
            request: {
                method: 'GET',
                url: `/mypage/point?userId=${userId}&page=${page}`
              }
        }
    });
}

export const PointLogActions = {
    ReadPointLog
};