/**
 * StudentAnswer REDUCER
 * @author: chaeyeon
 * 
 * @description: 
 * StudentAnswer ACTIONS에 대한 리듀서
 * 
 * @param: StudentAnswer Reducers
 * 
 * */

import { ActionTypes } from '../utils/ActionTypeList';

const initialStudent = {
  items: []
};

const StudentAnswerReducers = (state = initialStudent, action) => {
  const { items } = state;
  const { payload } = action;

  switch (action.type) {
    
    // 학생 답 생성 >> 학생이 답을 입력하고 제출하기 버튼을 누르면 실행
    case ActionTypes.CREATE_STUDENT_ANSWER_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;
        return {
          items: [
            ...items,
            payload.data
          ]
        };
      }

      return state;

    // 학생이 입력한 답 리스트
    case ActionTypes.LISTOF_STUDENT_ANSWER_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;
        if (data !== undefined && data !== null) {
          return {
            ...state,
            items: (data.items === undefined ? [] : data.items),
            page: data.page,
            size: data.size
          };
        }
      }
      return state;

    default:
      return state;
  }
}

export default StudentAnswerReducers;