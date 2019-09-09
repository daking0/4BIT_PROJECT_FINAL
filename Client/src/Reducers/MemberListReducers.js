/**
 * MEMBER LIST REDUCERS
 * @author: 황서영
 * 
 * @description: 
 * MANAGE ACTIONS 에 대한 리듀서 정의
 * 
 * @param: ManageReducers
LIST_STUDENT_ALL,
LIST_STUDENT_ALL_SUCCESS,
LIST_STUDENT_ALL_FAIL
 * */
import { ActionTypes } from '../utils/ActionTypeList'; 


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
            const { data } = payload;
            return{
              ...state,
              items: (data.items === undefined ? [] : data.items),
              page: data.page,
              size: data.size
            };
          }
          return state;

        default : 
        return state;  
    }
}

export default MemberListReducers; 