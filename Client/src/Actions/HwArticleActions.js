/**
 * HwArticle Action
 * @author: 영빈
 */

import { ActionTypes } from '../utils/ActionTypeList';

// Create HwArticle
// 백엔드 http://localhost:8080/class/assignment/submit/write?hwno={hwId}
const CreateHwArticle = (hwId, content) => {
  console.log('들어온 content 값: ' + content)
  return ({
    type: ActionTypes.CREATE_HWARTICLE,
    payload: {
      request: {
        method: 'POST',
        url: `/class/assignment/submit/write?hwno=${hwId}`,
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({ 
          hwContents: content })
      }
    }
  });
};

// Retrieve HwArticle
// 백엔드 http://localhost:8080/class/assignment/submit/view?hwArticleId={hwArticleId}
const RetrieveHwArticle = (hwArticleId) => {
  return ({
    type: ActionTypes.RETRIEVE_HWARTICLE,
    payload: {
      request: {
        method: 'POST',
        url: `/class/assignment/submit/view?hwArticleId=${hwArticleId}`
      }
    }
  });
};

// Update HwArticle
// 백엔드 http://localhost:8080/class/assignment/submit/view?hwArticleId={hwArticleId}
const UpdateHwArticle = (hwArticleId, content) => {
  return ({
    type: ActionTypes.UPDATE_HWARTICLE,
    payload: {
      request: {
        method: 'PATCH',
        url: `/class/assignment/submit/view?hwArticleId=${hwArticleId}`,
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({ hwContents: content })
      }
    }
  })
}

// Delete HwArticle
// 백엔드 http://localhost:8080/class/assignment/submit/view?hwArticleId={hwArticleId}
const DeleteHwArticle = (hwArticleId) => {
  return ({
    type: ActionTypes.DELETE_HWARTICLE,
    payload: {
      request: {
        method: 'DELETE',
        url: `/class/assignment/submit/view?hwArticleId=${hwArticleId}`
      }
    }
  });
};

// Find My HwArticle
// 백엔드 http://localhost:8080/class/assignment/submit/findMyHwArticle?hwId={hwId}
const FindMyHwArticle = (hwId) => {
  return ({
    type: ActionTypes.FINDMY_HWARTICLE,
    payload: {
      request: {
        method: 'POST',
        url: `http://localhost:8080/class/assignment/submit/findMyHwArticle?hwId=${hwId}`
      }
    }
  });
};

// Find My HwArticle For Teacher
// 백엔드 http://localhost:8080/class/assignment/submit/findMyHwArticle?hwId={hwId}
const findMyHwArticleForTeacher = (hwId, userId) => {
  return ({
    type: ActionTypes.FINDMY_HWARTICLE_FORTEACHER,
    payload: {
      request: {
        method: 'POST',
        url: `http://localhost:8080/class/assignment/submit/findMyHwArticleForTeacher?hwId=${hwId}&userId=${userId}`
      }
    }
  });
};

export const HwArticleActions = {
  CreateHwArticle,
  RetrieveHwArticle,
  UpdateHwArticle,
  DeleteHwArticle,
  FindMyHwArticle,
  findMyHwArticleForTeacher
};