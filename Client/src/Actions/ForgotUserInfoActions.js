/**
 * Article action
 * @author: Lee JH
 * 
 * @description: 
 * 
 */

import { ActionTypes } from '../utils/ActionTypeList';

// EndPoint :  http://localhost:8080/forgot/username?name=학생테스트1&phone=010-6666-6666
const FindUserId = (name, phone) => {
  return ({
    type: ActionTypes.FIND_USERID,
    payload: {
      request: {
        method: 'POST',
        url: `/forgot/username?name=${name}&phone=${phone}`
      }
    }
  });
};

// 비밀번호 찾기 
// EndPoint : http://localhost:8080/forgot/password?address=some_you@naver.com
const FindPassword = (email) => {
  return ({
    type: ActionTypes.FIND_PASSWORD,
    payload: {
      request: {
        method: 'POST',
        url: `forgot/password?address=${email}`
      }
    }
  });
};

// // ID,name,phone 비교 
// EndPoint : http://localhost:8080/forgot/compare?username=test_s_1&name=학생테스트1&phone=010-6666-6666
const CompareUserInfo = (username,name,phone) => {
  return ({
    type: ActionTypes.COMPARE_USERINFO,
    payload: {
      request: {
        method: 'GET',
        url: `forgot/compare?username=${username}&name=${name}&phone=${phone}`
      }
    }
  });
};



export const ForgotUserInfoActions = {
  FindUserId,
  FindPassword,
  CompareUserInfo
};