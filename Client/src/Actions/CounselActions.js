import { ActionTypes } from "../utils/ActionTypeList";

/**
 * Counsel action
 * @author: 황서영
 * 
 * @description: 
    ReadCounselStudentList : 강사가 담당하는 반 학생 리스트
    ReadCounsel : 학생 개별 상담내역
    UpdateCounsel : 학생 상담내역 수정
 * 
 */

 const ReadCounselStudentList = (page, size = 10) => {
     return ({
         type : ActionTypes.READ_COUNSEL_STUDENTS,
         payload : {
             request : {
                 method : 'GET',
                 url : `/study/studentstatus?page=${page}`
             }
         }
     });

 }

 const ReadCounsel = (studentId) => {
    return ({
        type: ActionTypes.READ_COUNSEL,
        payload: {
          request: {
            method: 'POST',
            url: `/study/studentstatus?studentId=${studentId}`
          }
        }
      });
 }

 const UpdateCounsel = (studentId, counsel) => {

  return ({
    type: ActionTypes.UPDATE_COUNSEL,
    payload: {
      request: {
        method: 'PATCH',
        url: `/study/studentstatus/write?studentId=${studentId}`,
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({
            counsel : counsel
          }
         )
      }
    }
  });

 }

 export const CounselActions = {
    ReadCounselStudentList,
    ReadCounsel,
    UpdateCounsel
 }