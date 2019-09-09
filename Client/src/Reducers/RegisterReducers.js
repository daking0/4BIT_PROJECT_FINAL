/**
 * MANAGE REDUCERS
 * @author: 황서영
 * 
 * @description: 
 * MANAGE ACTIONS 에 대한 리듀서 정의
 * 
 * @param: ManageReducers
    REGISTER_STUDENT
    REGISTER_STUDENT_SUCCESS
    REGISTER_STUDENT_FAIL
    REGISTER_TEACHER
    REGISTER_TEACHER_SUCCESS
    REGISTER_TEACHER_FAIL
 * */
import { ActionTypes } from '../utils/ActionTypeList'; 

//register 초기 세팅
const initialRegister = {
    registerMember : []
}

const RegisterReducers = (state = initialRegister, action) => {
    const {registerMember} = state;
    const { payload } = action;

    switch(action.type){
       
        case ActionTypes.REGISTER_STUDENT_SUCCESS :
          if (payload !== undefined && payload !== null) {
                return{
                  ...state,
                  registerMember: [
                    ...registerMember,
                    payload.data
                  ]
                };
            }
          return state;

        case ActionTypes.REGISTER_TEACHER_SUCCESS : 
          if (payload !== undefined && payload !== null) {
                return{
                  ...state,
                  registerMember: [
                    ...registerMember,
                    payload.data
                  ]
                };
            }
          return state;


        default : 
        return state;
    }


}

const initialMember = {
  items : [],
  page : 1,
  size : 15
}

const MemberListReducers = (state = initialMember, action) => {
    const {items} = state;
    const {payload} = action;

    switch(action.type){
      case ActionTypes.LIST_STUDENT_ALL_SUCCESS :
          if(payload !== undefined && payload !== null){
            return{
              ...state,
              items : [
                ...items,
                payload.data
              ]
            };
          }
        return state;
    }
}

export default RegisterReducers; 