/**
 * POINTLOG REDUCER
 * @author: 황서영
 * 
 * @description: 
 * POINTLOG ACTIONS 에 대한 리듀서 정의
 * 
 * */

import {ActionTypes} from '../utils/ActionTypeList';

const initialState = {
    items : [],
    page : 1,
    size : 15,
    totalCount : 0
}

const PointLogReducers = (state = initialState, action) => {
   const { items } = state;
   const { payload } = action;

   switch (action.type) {
       case ActionTypes.READ_MYPOINTLOG_SUCCESS : 
           if(payload !== undefined && payload !== null){
               const {data} = payload;
               return {
                   ...state,
                   items : (data.items === undefined? [] : data.items),
                   page : data.page,
                   size : data.size,
                   totalCount : (data.totalCount === undefined? 0 : data.totalCount)
               };
           }
        return state;
        

       default:
           return state;
   }
}

export default PointLogReducers;