/**
 * Article action
 * @author: dakyung
 * 
 * @description: 
 * ListofReply : 댓글 리스트
 * CreateReply : 댓글 작성
 * 
 */

import { ActionTypes } from '../utils/ActionTypeList';


// 댓글 조회
// EndPoint :http://localhost:8080/reply/list?boardId=class_1_board&articleId=23
const ListofReply = (boardId,articleId) => {
    return ({
      type: ActionTypes.LISTOF_REPLY,
      payload: {
        request: {
          method: 'GET',
          url: `/reply/list?boardId=${boardId}&articleId=${articleId}`
        }
      }
    });
  };

// 댓글 하나 조회
//EndPoint : http://localhost:8080/reply/view?boardId=class_1_board&articleId=28&replyId=1
const RetrieveReply = (boardId,articleId,replyId) => {
  return({
    type: ActionTypes.RETRIEVE_REPLY,
    payload: {
      request: {
        method: 'GET',
        url:`/reply/view?boardId=${boardId}&articleId=${articleId}&replyId=${replyId}`
      }
    }
  });
};

// 댓글 작성
// EndPoint : http://localhost:8080/reply/write?boardId=class_1_board&articleId=23
const CreateReply = (boardId, articleId, replycontents) => {
    return ({
        type: ActionTypes.CREATE_REPLY,
        payload: {
            request: {
                method: 'POST',
                url: `/reply/write?boardId=${boardId}&articleId=${articleId}`,
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                data: JSON.stringify({ replyContents: replycontents })
            }
        }
    })
}

//댓글 삭제
// EndPoint :  http://localhost:8080/reply/view?replyId=5
const DeleteReply = (replyId) => {
  return ({
    type: ActionTypes.DELETE_REPLY,
    payload: {
      request: {
        method: 'DELETE',
        url: `/reply/view?replyId=${replyId}`
      }
    }
  });
};

//댓글 수정
 // EndPoint :  http://localhost:8080/reply/view?replyId=5
 const UpdateReply = (replyId,replycontents) => {
   return({
     type: ActionTypes.UPDATE_REPLY,
     payload: {
       request :{
         method : 'PATCH',
         url : `/reply/view?replyId=${replyId}`,
         headers : {
           'Content-type' : 'application/json; charset: utf-8'
         },
        data : JSON.stringify({replyContents:replycontents})
       }
     } 
   })
 }

export const ReplyActions = {
    ListofReply,
    CreateReply,
    DeleteReply,
    UpdateReply,
    RetrieveReply
};
