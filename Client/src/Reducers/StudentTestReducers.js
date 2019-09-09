/**
 * StudentTest REDUCER
 * @author: chaeyeon
 * 
 * @description: 
 * StudetTest ACTIONS에 대한 리듀서
 * 
 * @param: StudetTest Reducers
 * 
 * */

import { ActionTypes } from '../utils/ActionTypeList';

const initialStudent = {
  items: []
};

const StudentTestReducers = (state = initialStudent, action) => {
  const { items } = state;
  const { payload } = action;

  switch (action.type) {

    // 학생 시험 생성 >> 응시하기 버튼 클릭 시 실행
    case ActionTypes.CREATE_STUDENT_TEST_SUCCESS:
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

    // 학생 점수 수정 >> 시험이 종료된 후 맞은 점수대로 update
    case ActionTypes.UPDATE_STUDETNT_TEST_SCORE_SUCCESS:
      if (payload !== undefined && payload !== null) {
        return {
          ...state,
          items: [
            ...items,
            payload.data
          ],
          updateresult: payload.data
        };
      }
      return state;

      // 해당 시험의 학생 점수 출력
      case ActionTypes.LISTOF_STUDENT_TEST_SCORE_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;
        if (data !== undefined && data !== null) {
          return {
            ...state,
            items: (data.items === undefined ? [] : data.items),
            datas: data
          };
        }
      }
      return state;

      // 학생 시험 번호가 있는지 없는지 구분
      case ActionTypes.COMPARE_STUDENT_TEST_ID_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;
        if (data !== undefined && data !== null) {
          return {
            ...state,
            items: (data.items === undefined ? [] : data.items),
            datas: data
          };
        }
      }
      return state;
      
      
    default:
      return state;
  }
}

export default StudentTestReducers;