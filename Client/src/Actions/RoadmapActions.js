import { ActionTypes } from '../utils/ActionTypeList';

// 로드맵 전체 리스트 뽑기
// http://localhost:8080/roadmap/list
const ListofRoadmap = (page = 1, size = 15, roadmapStageNo) => {
    return ({
      type: ActionTypes.LISTOF_ROADMAP,
      payload: {
        request: {
          method: 'GET',
          url: `/roadmap/list`
        }
      }
    });
  };

// 해당 로드맵의 연습문제 보여주기
// http://localhost:8080/roadmapexercise/view?roadmapStageNo={roadmapStageNo}
const RetrieveRoadmap = (roadmapStageNo) => {
    return ({
      type: ActionTypes.RETRIEVE_ROADMAP,
      payload: {
        request: {
          method: 'GET',
          url: `/roadmapexercise/view?roadmapStageNo=${roadmapStageNo}`
        }
      }
    });
  };

// 로드맵 마지막 단계 업데이트
const UpdateRoadmapLast = (roadmapLast) => {
  return ({
    type: ActionTypes.UPDATE_ROADMAP,
    payload: {
      request: {
        method: 'PATCH',
        url: `/roadmap?roadmapLast=${roadmapLast}`
      }
    }
  });
};

// 로드맵 마지막 단계 업데이트
const GetRoadmapLast = (userId) => {
  return ({
    type: ActionTypes.GET_ROADMAPLAST,
    payload: {
      request: {
        method: 'POST',
        url: `/roadmap/findlast?userId=${userId}`
      }
    }
  });
};

  export const RoadmapActions = {
    ListofRoadmap,
    RetrieveRoadmap,
    UpdateRoadmapLast
    , GetRoadmapLast
  };