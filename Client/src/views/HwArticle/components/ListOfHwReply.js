/**
 * List Of HwReply
 * @author: 영빈
 * */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HwReplyActions } from '../../../Actions/HwReplyActions';
import { useState, useEffect } from 'react';
import {Card,CardHeader,CardBody,CardTitle,Table,Row,Col,Container,Form,FormGroup,Input,Label,Button} from "reactstrap";

const ListOfHwReply = ({ user, replydatas, listOfHwReply, deleteHwReply, match, history }) => {
  const { hwArticleId } = match.params;
  const { userId } = user; //현재 로그인 된 유저의 userId
  const [replyitems, setItems] = useState([]);

  // useEffect(() => {
  //   if (replyitems !== undefined) { //undeined 체크를 안해주면 무한패치됨
  //     if (replyitems.length === 0) { //아무것도 없으면
  //       const { hwArticleId } = match.params;
  //       listOfHwReply(hwArticleId) //댓글 가져오기
  //         .then(response => {//listofReply액션 성공했으면
  //           if(response.payload.request.method === "POST"){
              
  //           const { items } = response.payload.data; //꺼내서
  //           setItems(items); //set해주기
  //           }
  //         });
  //     }
  //   }
  // }, [replyitems]);

//   //수정버튼
//   const updateHandler = (e, replyId) => {
//     e.stopPropagation();
//     retrieveReply(boardId, articleId, replyId)
//       .then(response => {
//         history.push("/board/" + boardId + "/" + articleId + "/" + replyId + "/replymodify");
//       })
//   };

  //삭제버튼
  const deleteHwReplyHandler = (e, hwReplyId) => {
    e.stopPropagation();
    deleteHwReply(hwReplyId)
      .then(response => {
        listOfHwReply(hwArticleId);
      })
  };

  return (
    <div>
          {replydatas.map((item, index) => {
            const { hwReplyId, hwReplyContents, user } = item;
            const CompareUser = () => {
              if (item.user.userId === userId) { //같은 유저이면
                return false //hidden= false -> 버튼 보여줌
              } else {
                return true
              }
            }

            return (
              <Row>
                <Col>
                <Label> {user.name}</Label>
                {hwReplyContents}
                </Col>
                <Col md="1.5">
                <Button hidden={CompareUser(user)}>수정</Button>
                </Col>
                <Col>
                <Button hidden={CompareUser(user)}>삭제</Button>
                </Col>
              </Row>
            )
          })
          }
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.userDetails, //현재 user의 userDetails
  replydatas: state.hwreplyreducers.items
});

const mapDispatchToProps = (dispatch) => ({
  listOfHwReply: (hwArticleId) => dispatch(HwReplyActions.ListOfHwReply(hwArticleId))
//   , deleteHwReply: (hwReplyId) => dispatch(HwReplyActions.DeleteHwReply(hwReplyId))
//   , retrieveHwReply: (hwArticleId, hwReplyId) => dispatch(HwReplyActions.HwRetrieveReply(ArticleId, hwReplyId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListOfHwReply));