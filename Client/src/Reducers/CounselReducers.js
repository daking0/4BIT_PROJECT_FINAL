/**
 * COUNSEL REDUCER
 * @author: 황서영
 * 
 * @description: 
 * COUNSEL ACTIONS 에 대한 리듀서 정의
 * 
 * @param: CounselReducers

 * */

import {ActionTypes} from '../utils/ActionTypeList';

const initialState = {
    items : [],
    page : 1,
    size : 10,
    totalCount: 0
}

const CounselReducers = (state = initialState, action) => {
   const { items } = state;
   const { payload } = action;

   switch (action.type) {
       case ActionTypes.READ_COUNSEL_STUDENTS_SUCCESS : 
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

       case ActionTypes.READ_COUNSEL_SUCCESS : 
           if(payload !== undefined && payload !== null){
               const {data} = payload;
               return {
                    ...state,
                   student : data
               };
           }
        return state;

        case ActionTypes.UPDATE_COUNSEL_SUCCESS : 
           if(payload !== undefined && payload !== null){
               const {data} = payload;
               return {
                   ...state,
                   updateresult : data
               };
           }
        return state;
        

       default:
           return state;
   }
}

export default CounselReducers;