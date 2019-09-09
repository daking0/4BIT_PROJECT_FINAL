/**
 * TestGroup action
 * @author: chaeyeon
 * 
 * @description: 
    createTestGroup : 시험 작성 (△)
    listOfTestGroup : 반별 시험 진행 중 전체 출력 (o)
    listOfEndedTestGroup : 반별 시험 진행 완료 전체 출력 (o)
    showDescriptionTest : 시험 하나 클릭 시 해당 시험 설명 출력 (o)
                        : 시험 응시 (△)
    updateTestGroup : 시험 수정 (o)
    deleteTestGroup : 시험 삭제 (o)
    updateScores : 해당 시험 점수 총점 및 평균 수정 (x)
 * 
 */

import { ActionTypes } from '../utils/ActionTypeList';

// Create
// EndPoint : http://localhost:8080/class/test/write
// TestGroupController와 비
const CreateTestGroup = (testName, startTime, endTime, description) => {
    return ({
        type: ActionTypes.CREATE_TESTGROUP,
        payload: {
            request: {
                method: 'POST',
                url: `/class/test/write`,
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                }, // 생성에 필요한 모든 값을 JSON > key : value로 보낸다 : postman 실행 창과 비슷
                data: JSON.stringify({
                    testName: testName,
                    testStartTime: startTime,
                    testEndTime: endTime,
                    testDescription: description
                })
            }
        }
    });
};


// 반별 시험 진행 중 전체 출력
// EndPoint : http://localhost:8080/class/test
const ListOfTestGroup = (page = 1, size = 10) => {
    return ({
        type: ActionTypes.LISTOF_TESTGROUP,
        payload: {
            request: {
                method: 'GET',
                url: '/class/test'
            }
        }
    });
};

// 반별 시험 진행 완료 전체 출력
//  http://localhost:8080/study/endedtest
const ListOfEndedTestGroup = (page = 1, size = 10) => {
    return ({
        type: ActionTypes.LISTOF_END_TESTGROUP,
        payload: {
            request: {
                method: 'GET',
                url: '/study/endedtest'
            }
        }
    });
}

// 시험 하나를 클릭했을 시 해당 시험 설명을 출력
// EndPoint : http://localhost:8080/class/test/testId={testId}
const RetrieveTestGroup = (testId) => {
    return ({
        type: ActionTypes.RETRIEVE_TESTGROUP,
        payload: {
            request: {
                method: 'GET',
                url: `/class/test/testId=${testId}`
            }
        }
    });
};

// 해당 시험 수정
// EndPoint : http://localhost:8080/class/test/testId={testId}/edit
const UpdateTestGroup = (testId, name, startTime, endTime, description) => {
    return ({
        type: ActionTypes.UPDATE_TESTGROUP,
        payload: {
            request: {
                method: 'PATCH',
                url: `/class/test/testId=${testId}/edit`,
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                data: JSON.stringify(
                    {
                        testName: name,
                        testStartTime: startTime,
                        testEndTime: endTime,
                        testDescription: description
                    }
                )
            }
        }
    });
};


// 시험 삭제
// EndPoint : http://localhost:8080/class/test/testId={testId}/delete
const DeleteTestGroup = (testId) => {
    return ({
        type: ActionTypes.DELETE_TESTGROUP,
        payload: {
            request: {
                method: 'DELETE',
                url: `/class/test/testId=${testId}/delete`
            }
        }
    })
};

/*
1. TestGroup 생성
2. 진행 중 또는 진행 예정인 시험 리스트 출력
3. 진행 완료인 시험 리스트 출력
4. 시험 상세 보기
5. 시험 수정
6. 시험 삭제
 */
export const TestGroupActions = {
    CreateTestGroup,
    ListOfTestGroup,
    ListOfEndedTestGroup,
    RetrieveTestGroup,
    UpdateTestGroup,
    DeleteTestGroup
};