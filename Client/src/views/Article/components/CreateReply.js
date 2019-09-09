import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReplyActions } from '../../../Actions/ReplyActions';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Table,
  Row,
  Col,
  Label,
  Container,
  Form,
  Input,
  FormGroup,
  Button
} from "reactstrap";

const CreateReply = ({ createReply, user, match, history }) => {
  function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => setValue(e.target.value);
    return {
      value,
      onChange
    }
  }

  const replyContent = useFormInput('')
  const { name } = user; //현재 로그인 유저

  const onSubmit = (e) => {
    e.preventDefault();
    const boardId = match.params.boardId;
    const articleId = match.params.articleId;
    const page = match.params.page;
    const replycontent = replyContent.value;
    console.log(replycontent)
    if (replycontent.length > 0) {
      createReply(boardId, articleId, replycontent)
        .then(response => {
          if(user.role.roleCode == "role_student"){
            window.location.reload("/student/board/"+match.params.boardId+"/"+page+"/"+articleId);
          }else if(user.role.roleCode == "role_teacher"){
            window.location.reload("/teacher/board/"+match.params.boardId+"/"+page+"/"+articleId);
          }; 
        })
    }
  }

  return (
    <div className="content" >
      <Form onSubmit={e => onSubmit(e)}  style={{  backgroundColor:"#DCDCDC" }}>
        <Row>
      <Label >{name}</Label> 
      <Col md="7">
        <Input type="text" {...replyContent} className="form-control" placeholder="댓글을 입력하세요" />
        </Col>
        <Col md="3">
        <Button type="submit"  type="submit" >
          <span className="btn-label">
            <i className="nc-icon nc-check-2" />
          </span>
          확인
        </Button>
        </Col>
        </Row>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.userDetails //현재 user의 userDetails
});

const mapDispatchToProps = (dispatch) => ({
  createReply: (boardId, articleId, replycontents) => dispatch(ReplyActions.CreateReply(boardId, articleId, replycontents))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateReply));
