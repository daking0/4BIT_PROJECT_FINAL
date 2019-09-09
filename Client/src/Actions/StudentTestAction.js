/**
 * StudentTest action
 * @author: chaeyeon
 * 
 * @description: 
 * CreateStudentTest
 * UpdateStudentTestScore
 * ListOfStudentTestScore
 */

import { ActionTypes } from '../utils/ActionTypeList';

// 시험 응시하기 버튼 클릭 시 StudentTesst 생성
// Endpoint : http://localhost:8080/class/test/apply/testId={testId}
const CreateStudentTest = (testId, score) => {
    return ({
        type: ActionTypes.CREATE_STUDENT_TEST,
        payload: {
            request: {
                method: 'POST',
                url: `/class/test/apply/testId=${testId}`,
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                data: JSON.stringify(
                    {
                        stTestScore: score
                    }
                )
            }
        }
    });
};

// 시험 점수 넣기
// Endpoint : http://localhost:8080/class/answer/compare/testId={testId}/userId={userId}
const UpdateStudentTestScore = (testId, userId) => {
  return ({
      type: ActionTypes.UPDATE_STUDETNT_TEST_SCORE,
      payload: {
          request:{
              method: 'PATCH',
              url: `/class/answer/compare/testId=${testId}/userId=${userId}`
          }
      }

  });
};

// 점수 보기
// Endpoint : http://localhost:8080/study/endedtest/showscore/testno={testno}
const ListOfStudentTestScore = (userId,testId) => {
  return({
      type: ActionTypes.LISTOF_STUDENT_TEST_SCORE,
      payload: {
          request: {
              method: 'GET',
              url: `/study/endedtest/showscore/userId=${userId}/testId=${testId}`
          }
      }
  })
};

// 학생 시험 번호가 있는지 없는지 구분 >> 응시하기 응시완료 버튼 구분
const startStudentTest = (testId, userId) => {
    return({
        type: ActionTypes.COMPARE_STUDENT_TEST_ID,
      payload: {
          request: {
              method: 'POST',
              url: `/class/test/apply/testId=${testId}/userId=${userId}`
          }
      }
    })
}

/*
 * 1. StudentTest 생성 >> 이때 학생 점수는 0
 * 2. 학생 점수 수정 >> 시험이 종료된 후 학생들의 점수를 구해 저장 시킴
 * 3. 학생 점수 보기
 */

export const StudentTestActions = {
  CreateStudentTest,
  UpdateStudentTestScore,
  ListOfStudentTestScore,
  startStudentTest
}