/**
 * Article action
 * @author: dakyung
 * 
 * @description: 
   CreateArticle : 게시물 작성
   ListofArticle : 선택한 게시판의 게시물 리스트
   DeleteArticle : 선택한 게시물을 삭제
   RetrieveArticle : 선택한 게시물 가져오기
   UpdateArticle : 선택한 게시물을 수정
 * 
 */

import { ActionTypes } from '../utils/ActionTypeList';

//Create
// EndPoint :  http://localhost:8080/board/class_1_board/write
const CreateArticle = (boardId, title, content) => {
  return ({
    type: ActionTypes.CREATE_ARTICLE,
    payload: {
      request: {
        method: 'POST',
        url: `/board/${boardId}/write`,
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({ articleTitle: title, articleContents: content })
        //articleTitle =해당 엔티티컬럼명, : 뒤에 title = 리액트 내에서 사용된 변수
      }
    }
  });
};

//해당 게시판 전체 게시물 뽑아오기 
const ListofArticle = (page, size, boardId) => {
  return ({
    type: ActionTypes.LISTOF_ARTICLE,
    payload: {
      request: {
        method: 'GET',
        url: `/board/list?boardId=${boardId}&page=${page}`
      }
    }
  });
};


//해당 게시물 삭제
//// EndPoint :  http://localhost:8080/board/view?articleId=28
const DeleteArticle = (articleId) => {
  return ({
    type: ActionTypes.DELETE_ARTICLE,
    payload: {
      request: {
        method: 'DELETE',
        url: `/board/view?articleId=${articleId}`
      }
    }
  });
};


//해당 게시물의 내용 보여주기
//http://localhost:8080/board/view?boardId=class_1_board&articleId=28
const RetrieveArticle = (boardId, articleId) => {
  return ({
    type: ActionTypes.RETRIEVE_ARTICLE,
    payload: {
      request: {
        method: 'GET',
        url: `/board/view?boardId=${boardId}&articleId=${articleId}`
        // headers: {
        //   'Content-Type': 'application/json; charset: utf-8'
        // }
      }
    }
  });
};

//게시글 수정하기
// EndPoint :  http://localhost:8080/board/view?boardId&articleId=8
const UpdateArticle = (articleId, title, content) => {
  return ({
    type: ActionTypes.UPDATE_ARTICLE,
    payload: {
      request: {
        method: 'PATCH',
        url: `/board/view?boardId&articleId=${articleId}`,
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({ articleTitle: title, articleContents: content })
      }
    }
  })
}


export const ArticleActions = {
  CreateArticle,
  ListofArticle,
  DeleteArticle,
  RetrieveArticle,
  UpdateArticle
};
