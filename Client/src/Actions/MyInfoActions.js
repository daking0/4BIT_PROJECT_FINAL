/**
 * MyInfo action
 * @author: 황서영
 * 
 * @description: 
 * 회원 수정은 SigninAction으로 이동함
 * GetStudentProfile : student 프로필 로드
 * GetTeacherProfile : teacher 프로필 로드
 * GetAdminProfile : admin 프로필 로드
 * 
 */

import { ActionTypes } from '../utils/ActionTypeList';

const GetStudentProfile = (userId) => {
    return({
        type : ActionTypes.GET_STUDENT_PROFILE,
        payload : {
            request: {
                method: 'GET',
                url: `/profile/student?userId=${userId}`
              }
        }
    });
}

const GetTeacherProfile = (userId) => {
  return({
      type : ActionTypes.GET_TEACHER_PROFILE,
      payload : {
          request: {
              method: 'GET',
              url: `/profile/teacher?userId=${userId}`
            }
      }
  });
}

const GetAdminProfile = (userId) => {
  return({
      type : ActionTypes.GET_ADMIN_PROFILE,
      payload : {
          request: {
              method: 'GET',
              url: `/profile/admin?userId=${userId}`
            }
      }
  });
}


// const ReadMyInfo = (userId) => {
//     return({
//         type : ActionTypes.READ_MYINFO,
//         payload : {
//             request: {
//                 method: 'GET',
//                 url: `/mypage/myinfo?userId=${userId}`
//               }
//         }
//     });
// }

// const UpdateMyInfo = (userId, password, email, phone) => {

//     return({
//         type: ActionTypes.UPDATE_MYINFO,
//         payload: {
//           request: {
//             method: 'PATCH',
//             url: `/mypage/myinfo/edit?userId=${userId}`,
//             headers: {
//               'Content-Type': 'application/json; charset: utf-8'
//             },
//             data: JSON.stringify({
//                     password : password,
//                     email : email,
//                     phone : phone
//              })
//           }
//         }
//     });
// }

export const MyInfoActions = {
  GetStudentProfile,
  GetTeacherProfile,
  GetAdminProfile
};