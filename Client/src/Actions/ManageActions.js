/**
 * Manage action
 * @author: 황서영
 * 
 * @description: 
    RegisterStudent : 학생 등록
    RegisterTeacher : 강사 등록
 * 
 */

import { ActionTypes } from '../utils/ActionTypeList';

 //register Member : student랑 teacher로 나눔
 // endpoint : http://localhost:8080/manage/member/new
 const RegisterStudent = (username, password, name, email, phone, studentBirth, classId, roleCode) => {
     return({
        type : ActionTypes.REGISTER_STUDENT,
        payload : {
            request :{
            method : 'POST',
            url: '/manage/member/new',
            headers : {
                'Content-Type': 'application/json; charset: utf-8'
            },
            data : JSON.stringify({username : username,
                                password : password,
                                name : name,
                                email : email,
                                phone : phone,
                                studentBirth : studentBirth,
                                classGroup :{
                                    classId : classId
                                },
                                roleCode : roleCode})
            }
        }
    });
 };

 const RegisterTeacher = (username, password, name, email, phone, roleCode) => {
    return({
       type : ActionTypes.REGISTER_TEACHER,
       payload : {
           request : {
           method: 'POST',
           url: '/manage/member/new',
           headers : {
               'Content-Type': 'application/json; charset: utf-8'
           },
           data : JSON.stringify({username : username,
                               password : password,
                               name : name,
                               email : email,
                               phone : phone,
                               roleCode : roleCode,
                            })
            }
        }
    });
};

const ListOfStudentByAdmin = (page=1, size=15) => {
    return({
        type : ActionTypes.LIST_STUDENT_ALL,
        payload : {
            request: {
                method: 'GET',
                url: `/manage/member/student/list`
              }
        }
    });
};

const ListOfTeacherByAdmin = (page=1, size=15) => {
    return({
        type : ActionTypes.LIST_TEACHER_ALL,
        payload : {
            request: {
                method: 'GET',
                url: `/manage/member/teacher/list`
              }
        }
    });
};


const ListOfClassByAdmin = (page=1, size=15) => {
    return({
        type : ActionTypes.LIST_CLASS_ALL,
        payload : {
            request: {
                method: 'GET',
                url: `/manage/class/list`
              }
        }
    });
};

export const ManageActions = {
    RegisterStudent,
    RegisterTeacher,
    ListOfStudentByAdmin,
    ListOfTeacherByAdmin,
    ListOfClassByAdmin
};