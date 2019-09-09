/**
 * Listof Article
 * @author: dakyung
 * 
 * @description: 
 * -해당 게시물에 달린 댓글들 출력
 * -댓글을 쓴 유저와 로그인 유저가 같으면 삭제 버튼 함께 출력
 * @param:
 * ReplyActions.ListofReply(boardId,articleId)
 * ReplyActions.DeleteReply(replyId)
 * ReplyActions.RetrieveReply(boardId, articleId, replyId)
 * */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReplyActions } from '../../../Actions/ReplyActions';
import { useState, useEffect } from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";



const ListofReply = ({ user, replydatas, listofReply, deleteReply, retrieveReply, match, history }) => {
  const { boardId, articleId } = match.params;
  const { userId } = user; //현재 로그인 된 유저의 userId
  const [replyitems, setItems] = useState([]);

  useEffect(() => {
    if (replyitems !== undefined) { //undeined 체크를 안해주면 무한패치됨
      if (replyitems.length === 0) { //아무것도 없으면
        listofReply(boardId, articleId) //댓글 가져오기
          .then(response => {//listofReply액션 성공했으면
            const { items } = response.payload.data; //꺼내서
            setItems(items); //set해주기
          });
      }
    }
  }, [replyitems]);

  //수정버튼 
  const updateHandler = (e, replyId) => {
    e.stopPropagation();
    retrieveReply(boardId, articleId, replyId)
      .then(response => {
        // history.push(history.location + "/replymodify");
        history.push("/student"+"/board/" + boardId + "/" +match.params.page+"/"+ articleId + "/" + replyId + "/replymodify");
      })
  };

  //삭제버튼
  const deleteHandler = (e, replyId) => {
    e.stopPropagation();
    deleteReply(replyId)
      .then(response => {
        listofReply(boardId, articleId);
      })
  };

  return (
    <div>
          {replydatas.map((item, index) => {
            const { replyId, replyContents, user } = item;
            const CompareUser = () => {
              if (item.user.userId === userId) { //같은 유저이면
                return false //hidden= false -> 버튼 보여줌
              } else {
                return true
              }
            }

            return (
              <Row style={{ margin : "5px"}}>
                <Col md="8">
                  
                    <span style={{fontSize:"16px", color:"#633303", fontWeight:"bold",fontFamily: "Nanum Myeongjo"}}> 
                  {user.name} </span> 
                  <span>{replyContents}
                  </span>
                </Col>
                <Col md="1.5">
                <button 
                type="button" className="btn" onClick={e => updateHandler(e, replyId)} 
                hidden={CompareUser(user)} style={{margin : "5px"}}>수정</button>
                </Col>
                <Col>
                <button type="button" className="btn" onClick={e => deleteHandler(e, replyId)} 
                hidden={CompareUser(user)} style={{margin : "5px"}}>삭제</button>
                </Col>
              </Row>
              // <tr key={index}>
              //   <td> {replyContents}</td>
              //   <td>  <button type="button" className="btn btn-success" onClick={e => updateHandler(e, replyId)} hidden={CompareUser(user)}>modify</button></td>
              //   <td><button type="button" className="btn btn-success" onClick={e => deleteHandler(e, replyId)} hidden={CompareUser(user)}>삭제</button></td>
              // </tr>
            )
          })
          }
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.userDetails, //현재 user의 userDetails
  replydatas: state.replyreducers.items
});

const mapDispatchToProps = (dispatch) => ({
  listofReply: (boardId, articleId) => dispatch(ReplyActions.ListofReply(boardId, articleId))
  , deleteReply: (replyId) => dispatch(ReplyActions.DeleteReply(replyId))
  , retrieveReply: (boardId, articleId, replyId) => dispatch(ReplyActions.RetrieveReply(boardId, articleId, replyId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListofReply));