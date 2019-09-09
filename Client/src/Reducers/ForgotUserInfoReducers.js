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
  data : "",
  name : "",
  name : "",
  phone : ""
};
  

const ForgotUserInfoReducers = (state = initialState, action) => {
  const { items, name, phone} = state;
  const { payload } = action;

  switch (action.type) {
    case ActionTypes.FIND_USERID_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;   // 서버에서 받아온 로그의 정보를 data 안에 저장
        console.log("리듀서의 data >>> ",data)
        if (data !== undefined && data !== null) {
          return {
            ...state,
            data : data,
            result:data,
            items: (data.items === undefined ? [] : data.items),
            name: data.name,
            phone: data.phone
          };
        }
      }

      return state;


      case ActionTypes.FIND_PASSWORD_SUCCESS:
        if (payload !== undefined && payload !== null) {
          const { data } = payload;   // 서버에서 받아온 로그의 정보를 data 안에 저장
          console.log(data)
          if (data !== undefined && data !== null) {
            return {
              ...state,
              result:data,
              items: (data.items === undefined ? [] : data.items),
              email: data.email
            };
          }
        }
        return state;

        case ActionTypes.COMPARE_USERINFO_SUCCESS:
          if (payload !== undefined && payload !== null) {
            const { data } = payload;   // 서버에서 받아온 로그의 정보를 data 안에 저장
            console.log("서버에서 전달받은 data >>>>",data)
            if (data !== undefined && data !== null) {
              return {
                ...state,
                ...data,
                result:data,
                items: (data.items === undefined ? [] : data.items),
                username: data.username,
                name: data.name,
                phone: data.phone
              };
            }
          }
          return state;

    default:
      return state;
  }
}

export default ForgotUserInfoReducers;