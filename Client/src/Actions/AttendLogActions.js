/**
 * Article action
 * @author: Lee JH
 * 
 * @description: 해당 학생 출석로그 뽑아오기
 */

import { ActionTypes } from '../utils/ActionTypeList';

// 해당 학생 출석 전체 뽑아오기
// EndPoint :  http://localhost:8080/attend/{studentId}
const ListofAttendLog = (page = 1, size = 10, userId) => {
  return ({
    type: ActionTypes.LISTOF_ATTENDLOG,
    payload: {
      request: {
        method: 'GET',
        url: `/attend/${userId}`
      }
    }
  });
};


export const AttendLogActions = {
  ListofAttendLog
};