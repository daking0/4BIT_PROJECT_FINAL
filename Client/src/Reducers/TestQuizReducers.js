/**
 * TESTQUIZ REDUCER
 * @author: chaeyeon
 * 
 * @description: 
 * TESTQUIZ ACTIONS에 대한 리듀서
 * 
 * @param: TestQuizReducers
 * CREATE_TEST_QUIZ_SUCCESS
 * 
 * */

import { ActionTypes } from '../utils/ActionTypeList';

const initialTestQuiz = {
  items: [],
  page: 1,
  size: 10
};

const TestQuizReducers = (state = initialTestQuiz, action) => {
  const { items } = state;
  const { payload } = action;

  switch (action.type) {

    case ActionTypes.CREATE_TEST_QUIZ_SUCCESS:
      if(payload !==undefined && payload !== null){
        const { data } = payload;
          if(data !== undefined && data !== null){
            return{
              ...state,
              items:[
                  ...items,
                  payload.data
              ]

            };
          }
      }
      return state;

    case ActionTypes.LISTOF_TEST_QUIZ_SUCCESS:
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
      
    case ActionTypes.DELETE_TEST_QUIZ_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;
        return {
          ...state,
          items: items.filter(item => item.id !== data.id)
        };
      }
      return state;

    default:
      return state;
  }
}
export default TestQuizReducers;