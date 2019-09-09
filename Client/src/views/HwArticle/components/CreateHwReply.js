import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HwReplyActions } from '../../../Actions/HwReplyActions';
// reactstrap components
import {Label,Row,Col,Container,Form,Input,FormGroup,Button} from "reactstrap";

const CreateHwReply = ({ createHwReply, user, match, history }) => {
    function useFormInput(initialValue) {
      const [value, setValue] = useState(initialValue);
      const onChange = (e) => setValue(e.target.value);
      return {
        value,
        onChange
      }
    }
  
    const hwReplyContents = useFormInput(' ')
    const { name } = user; //현재 로그인 유저명
  
    const onSubmit = (e) => {
      e.preventDefault();
      const hwArticleId = match.params.hwArticleId;
      const Contents = hwReplyContents.value;
      if (Contents.length > 0) {
        createHwReply(hwArticleId, Contents)
          .then(response => {
            if (user.role.roleCode === "role_teacher") {
            history.push("/teacher/class/assignment/hwArticle/" + hwArticleId)
            } else {
              history.push("/student/class/assignment/hwArticle/" + hwArticleId)
            }
           })
      }
    }
  
    return (
      <div className="content">
        <Form onSubmit={e => onSubmit(e)}  style={{  backgroundColor:"#DCDCDC" }}>
        <Row>
      <Label >{name}</Label> 
      <Col md="7">
            <Input type="text" {...hwReplyContents} className="form-control" placeholder="댓글을 입력하세요" />
            </Col>
          <Col md="3">
          <Button type="submit"  type="submit">
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
    createHwReply: (hwArticleId, hwReplyContents) => dispatch(HwReplyActions.CreateHwReply(hwArticleId, hwReplyContents))
  })
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateHwReply));
  