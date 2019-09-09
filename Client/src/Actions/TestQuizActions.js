/**
 * TestQuiz action
 * @author: chaeyeon
 * 
 * @description: 
 *  CreateTestQuiz : TestQuiz 작성 
 *  ListTestQuiz : TestQuiz 전체 출력
 */

import { ActionTypes } from '../utils/ActionTypeList';

 // 시험 문제 출제
// EndPoint : http://localhost:8080/class/testquiz/write?testId={testId}&quizId={quizId}
const CreateTestQuiz = (testId, quizId, no) => {
    return ({
        type: ActionTypes.CREATE_TEST_QUIZ,
        payload: {
            request: {
                method: 'POST',
                url:`/class/testquiz/write?testId=${testId}&quizId=${quizId}`,
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                data: JSON.stringify({
                    testId: testId,
                    quizId: quizId,
                    testQuizNo: no
                })
            }
        }
    })
}

// 시험 문제 보기
// Endpoint : http://localhost:8080/class/testquiz/list/testId={testId}
const ListOfTestQuiz = (testId, page, size) => {
    return ({
        type: ActionTypes.LISTOF_TEST_QUIZ,
        payload: {
            request: {
                method: 'GET',
                url: `/class/testquiz/list/testId=${testId}`
            }
        }
    });
};


// 시험 문제 전체 삭제
// Endpoint : http://localhost:8080/class/testquiz/testId={testId}/delete
const DeleteTestQuiz = (testId) => {
    return ({
        type: ActionTypes.DELETE_TEST_QUIZ,
        payload: {
          request: {
            method: 'DELETE',
            url: `/class/testquiz/testId=${testId}/delete`
          }
        }
      });
};

/*
1. TestGQuiz 생성
2. TestQuiz 전체 출력
3. testId에 따른 TestQuiz 삭제
 */
export const TestQuizActions = {
   CreateTestQuiz,
   ListOfTestQuiz,
   DeleteTestQuiz
}