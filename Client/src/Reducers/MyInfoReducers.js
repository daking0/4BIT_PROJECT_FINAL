/**
 * MYINFO REDUCERS
 * @author: 황서영
 * 
 * @description: 
 * 프로필 불러오는 액션에 대한 정의
 * 
 * @param: 
    GET_STUDENT_PROFILE
    GET_STUDENT_PROFILE_SUCCESS
    GET_STUDENT_PROFILE_FAIL
    GET_TEACHER_PROFILE
    GET_TEACHER_PROFILE_SUCCESS
    GET_TEACHER_PROFILE_FAIL
    GET_ADMIN_PROFILE
    GET_ADMIN_PROFILE_SUCCESS
    GET_ADMIN_PROFILE_FAIL
 * */
import { ActionTypes } from '../utils/ActionTypeList'; 

//myInfo 초기 세팅
const initialMyInfo = {
  data : null
}

const MyInfoReducers = (state= initialMyInfo, action)=> {
    const {data} = state;
    const {payload} = action;

    switch(action.type) {

        case ActionTypes.GET_STUDENT_PROFILE_SUCCESS : 
        if(payload !== undefined && payload !== null) {
          return{
            ...state,
            data : payload.data
          };
        }
        return state;

        case ActionTypes.GET_TEACHER_PROFILE_SUCCESS : 
        if(payload !== undefined && payload !== null) {
            return{
              ...state,
              data : payload.data
            };
        }
        return state;

        case ActionTypes.GET_ADMIN_PROFILE_SUCCESS : 
         if(payload !== undefined && payload !== null) {
          return{
            ...state,
            data : payload.data
          };
         }
         return state;

      default : 
      return state;   
    }
}

export default MyInfoReducers; 