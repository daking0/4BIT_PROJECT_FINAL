/**
 * StudentAnswer + StudentTest action
 * @author: chaeyeon
 * 
 * @description: 
 * Create StudentAnswer
 * ListOf StudentAnswer
 */

import { ActionTypes } from '../utils/ActionTypeList';

// 시험 문제 풀기(응시페이지) >> StudentAnswer 생성
// Endpoint : http://localhost:8080/class/test/answer/write/studentTestId={studentTestId}/testQuizId={testQuizId}
const CreateStudentAnswer = (studentTestId, testQuizId, studentAnswer) => {
    return ({
        type: ActionTypes.CREATE_STUDENT_ANSWER,
        payload: {
            request: {
                method: 'POST',
                url: `/class/test/answer/write/studentTestId=${studentTestId}/testQuizId=${testQuizId}`,
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                data: JSON.stringify(
                    {
                        studentTestAnswerContent : studentAnswer
                    }
                )
            }
        }
    });
};


// 학생 답 리스트
// Endpoint : http://localhost:8080/study/endedtest/answer/list/testId={testId}/userId={userId}
const ListOfStudentAnswer = (testId, userId) => {
    return({
        type: ActionTypes.LISTOF_STUDENT_ANSWER,
        payload: {
            request: {
                method: 'GET',
                url: `/study/endedtest/answer/list/testId=${testId}/userId=${userId}`
            }
        }
    });
};

/*
 * 1. StudentAnswer 생성 >> 학생이 시험을 보고 제출하기를 누르면 생성
 * 2. 학생 답 리스트
 */

export const StudentAnswerActions = {
    CreateStudentAnswer,
    ListOfStudentAnswer
}