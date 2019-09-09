/**
 * Article action
 * @author: 영빈
 */

import { ActionTypes } from '../utils/ActionTypeList';


// 댓글 조회
// 백엔드 주소: http://localhost:8080/hwreply/list?hwArticleId={hwArticleId}
const ListOfHwReply = (hwArticleId) => {
  return ({
    type: ActionTypes.LISTOF_HWREPLY,
    payload: {
      request: {
        method: 'POST',
        url: `/hwreply/list?hwArticleId=${hwArticleId}`
      }
    }
  });
};

// // 댓글 하나 조회
// //EndPoint : http://localhost:8080/reply/view?boardId=class_1_board&articleId=28&replyId=1
// const RetrieveReply = (boardId,articleId,replyId) => {
//   return({
//     type: ActionTypes.RETRIEVE_REPLY,
//     payload: {
//       request: {
//         method: 'GET',
//         url:`/reply/view?boardId=${boardId}&articleId=${articleId}&replyId=${replyId}`
//       }
//     }
//   });
// };

// 댓글 작성
// 백엔드 주소: http://localhost:8080/hwreply/write?hwArticleId={hwArticleId}
const CreateHwReply = (hwArticleId, hwReplyContents) => {
  return ({
    type: ActionTypes.CREATE_HWREPLY,
    payload: {
      request: {
        method: 'POST',
        url: `/hwreply/write?hwArticleId=${hwArticleId}`,
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({ hwReplyContents: hwReplyContents })
      }
    }
  })
}

// //댓글 삭제
// // EndPoint :  http://localhost:8080/reply/view?replyId=5
// const DeleteReply = (replyId) => {
//   return ({
//     type: ActionTypes.DELETE_REPLY,
//     payload: {
//       request: {
//         method: 'DELETE',
//         url: `/reply/view?replyId=${replyId}`
//       }
//     }
//   });
// };

// //댓글 수정
//  // EndPoint :  http://localhost:8080/reply/view?replyId=5
//  const UpdateReply = (replyId,replycontents) => {
//    return({
//      type: ActionTypes.UPDATE_REPLY,
//      payload: {
//        request :{
//          method : 'PATCH',
//          url : `/reply/view?replyId=${replyId}`,
//          headers : {
//            'Content-type' : 'application/json; charset: utf-8'
//          },
//         data : JSON.stringify({replyContents:replycontents})
//        }
//      } 
//    })
//  }

export const HwReplyActions = {
  ListOfHwReply,
  CreateHwReply
  // DeleteReply,
  // UpdateReply,
  // RetrieveReply
};