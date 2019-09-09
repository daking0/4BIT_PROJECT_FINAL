/**
 * Quiz action
 * @author: hyeyoung
 * 
 * @description: 
 * CreateQuiz : 퀴즈 생성
 * ListofQuiz : 퀴즈 리스트
 * RetrieveQuiz : 퀴즈 상세보기
 * UpdateQuiz : 퀴즈 수정
 * DeleteQuiz : 퀴즈 삭제
 * 
 */

import { ActionTypes } from '../utils/ActionTypeList';

// Create
// EndPoint : http://localhost:8080/class/test/exbank/write
const CreateQuiz = (content,answer,eachScore,subject,chapter,level,answerType,explain) =>{
    return ({
        type : ActionTypes.CREATE_QUIZ,
        payload: {
            request: {
                method: 'POST',
                url: `/class/test/exbank/write`,
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                data: JSON.stringify({ quizContents : content,
                                       quizAnswer : answer,
                                       quizEachScore : eachScore,
                                       quizSubject : subject,
                                       quizChapter : chapter,
                                       quizLevel : level,
                                       quizAnswerType : answerType,
                                       quizExplain : explain})
            }
        }
    });
};

// 해당 퀴즈 문제 전체 뽑아오기
// list
// EndPoint : http://localhost:8080/class/test/exbank/list
const ListofQuiz = ( page = 1 , size = 10) => {
    return({
        type : ActionTypes.LISTOF_QUIZ,
        payload:{
            request:{
                method:'POST',
                url: `/class/test/exbank/list`
            }
        }
    });
};

// 해당 퀴즈 문제 상세보기
// Retrieve
// EndPoint : http://localhost:8080/class/test/exbank/view?quizId={quizId}
const RetrieveQuiz = (quizId) => {
    return({
        type : ActionTypes.RETRIEVE_QUIZ,
        payload:{
            request:{
                method:'GET',
                url:`/class/test/exbank/view?quizId=${quizId}`
            },
        }
    });
};

// 해당 퀴즈 문제 수정
// Update
// EndPoint : http://localhost:8080/class/test/exbank/{quziId}
const UpdateQuiz = (quizId, content,answer,eachScore,subject,chapter,level,answerType,explain) => {
    return({
        type : ActionTypes.UPDATE_QUIZ,
        payload:{
            request:{
                method:'PATCH',
                url:`/class/test/exbank/${quizId}`,
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                data: JSON.stringify({quizContents : content,
                                      quizAnswer : answer,
                                      quizEachScore : eachScore,
                                      quizSubject : subject,
                                      quizChapter : chapter,
                                      quizLevel : level,
                                      quizAnswerType : answerType,
                                      quizExplain : explain})
            }
        }
    });
};


//해당 퀴즈 문제 삭제
// delete
// EndPoint : http://localhost:8080/class/test/exbank/delete/quizId={quizId}
const DeleteQuiz = (quizId) => {
    return({
        type : ActionTypes.DELETE_QUIZ,
        payload : {
            request : {
                method: 'DELETE',
                url: `/class/test/exbank/delete/quizId=${quizId}` 
            }
        } 
    });
};

export const QuizActions = {
    CreateQuiz,
    ListofQuiz,
    RetrieveQuiz,
    UpdateQuiz,
    DeleteQuiz

};