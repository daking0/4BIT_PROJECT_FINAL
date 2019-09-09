/**
 * ARTICLE REDUCER
 * @author: Lee JH
 * 
 * @description: 

 * */
import { ActionTypes } from '../utils/ActionTypeList';

 //The initial state
const initialState = {
  items: [],
  page: 1,
  size: 20,
  totalCount: 0,
};
  

const AttendLogReducers = (state = initialState, action) => {
  const { items, totalCount } = state;
  const { payload } = action;         

  switch (action.type) {
    case ActionTypes.LISTOF_ATTENDLOG_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;   // 서버에서 받아온 로그의 정보를 data 안에 저장
        if (data !== undefined && data !== null) {
          return {
            ...state,
            items: (data.items === undefined ? [] : data.items),
            page: data.page,
            size: data.size,
            totalCount: (data.totalCount === undefined ? 0 : data.totalCount),
          };
        }
      }
      return state;

    default:
      return state;
  }
}

export default AttendLogReducers;