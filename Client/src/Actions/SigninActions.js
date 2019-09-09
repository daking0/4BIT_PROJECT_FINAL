/**
 * Article action
 * @author: dakyung
 * 
 * @description:
 * getClientToken : 토큰 얻기
   getUserMe : 사용자 찾기
   refreshToken : 리프레쉬 토큰
   signup : 회원가입
   login : 로그인
   logout : 로그아웃 
 */
import { ActionTypes } from '../utils/ActionTypeList';

//토큰 얻기
const getClientToken = () => {
  const formData = new FormData();
  formData.append('grant_type', 'client_credentials');

  return ({
    type: ActionTypes.GET_TOKEN,
    payload: {
      request: {
        method: 'POST',
        url: '/oauth/token',
        data: formData
      }
    }
  });
};

//userme
const getUserMe = () => {
  return ({
    type: "GET_USERME",
    payload: {
      request: {
        method: 'GET',
        url: '/manage/member/me'
      }
    }
  });
};

//userDetails를 수정
const updateUserMe = (userId, password, email, phone) => {
  return({
    type: ActionTypes.UPDATE_MYINFO,
    payload: {
      request: {
        method: 'PATCH',
        url: `/mypage/myinfo/edit?userId=${userId}`,
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({
                password : password,
                email : email,
                phone : phone
         })
      }
    }
});
};

//refreshToken
const refreshToken = (refresh_token) => {
  const formData = new FormData();
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', refresh_token);

  return ({
    type: "REFRESH_TOKEN",
    payload: {
      request: {
        method: 'POST',
        url: '/oauth/token',
        data: formData
      }
    }
  });
};

//가입
const signup = ({ username, password, email, firstName, lastName }) => {
  return ({
    type: "SIGNUP",
    payload: {
      request: {
        method: 'POST',
        url: '/signup',
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({ username, password, email, firstName, lastName })
      }
    }
  });
};

//로그인
const login = (username, password) => {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('username', username);
  formData.append('password', password);

  return ({
    type: "LOGIN",
    payload: {
      request: {
        method: 'POST',
        url: '/oauth/token',
        data: formData
      }
    }
  });
};


//로그아웃
const logout = () => ({
  type: "LOGOUT"
});



export const SigninActions = {
  getClientToken,
  getUserMe,
  updateUserMe,
  refreshToken,
  signup,
  login,
  logout
};