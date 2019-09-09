/**
 * TESTGROUP REDUCER
 * @author: chaeyeon
 * 
 * @description: 
 * TESTGROUP ACTIONS에 대한 리듀서
 * 
 * @param: TestGroupReducers
 * CREATE_TESTGROUP_SUCCESS,
 * LISTOF_TESTGROUP_SUCCESS,
 * LISTOF_END_TESTGROUP_SUCCESS,
 * RETRIEVE_TESTGROUP_SUCCESS,
 * UPDATE_TESTGROUP_SUCCESS
 * 
 * */

import { ActionTypes } from '../utils/ActionTypeList';

const initialTestGroup = {
  items: [],
  page: 1,
  size: 10
};

const TestGroupReducers = (state = initialTestGroup, action) => {
  const { items } = state;
  const { payload } = action;

  switch (action.type) {
    case ActionTypes.CREATE_TESTGROUP_SUCCESS:
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

    case ActionTypes.LISTOF_TESTGROUP_SUCCESS:
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

    case ActionTypes.LISTOF_END_TESTGROUP_SUCCESS:
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

    case ActionTypes.RETRIEVE_TESTGROUP_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;
        if (data !== undefined && data !== null) {
          return {
            ...state,
            items: (data.items === undefined ? [] : data.items),
            testDescription: data.testDescription,
            datas: data
          };
        }
      }
      return state;

    case ActionTypes.UPDATE_TESTGROUP_SUCCESS:
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

    default:
      return state;
  }
}
export default TestGroupReducers;