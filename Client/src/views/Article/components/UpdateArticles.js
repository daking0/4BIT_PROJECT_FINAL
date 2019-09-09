/**
 * Update Article
 * @author: dakyung
 * 
 * @description: 
 * -현재 선택한 글의 타이틀, 내용을 수정
 * 
 * @param:
 * UpdateArticle(articleId,title,content)
 * 
 * */
import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { ArticleActions, ReplyActions } from '../../../Actions';
import ReactHtmlParser from 'react-html-parser';

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

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);
  return {
    value,
    onChange
  }
}

const changehtmlparser = ({datas}) => {
  const {articleContents } = datas;
  return <div>{ReactHtmlParser(articleContents)} </div>;
}

const UpdateArticles = ({ datas, updateArticle, retrieveArticle, listofReply, match, history,user }) => {
  const { articleId, articleTitle, articleContents } = datas;

  const Titles = useFormInput(articleTitle) //초기값으로 기존에 저장된 데이터를 넣어준다
  const Contents = useFormInput(articleContents)

  const onSubmit = (e) => {
    e.preventDefault();
    const boardId = match.params.boardId;
    const title = Titles.value;
    const content = Contents.value;
    const pagenum =match.params.page;
    if (content.length > 0) {
      updateArticle(articleId, title, content)
        .then(response => {
          console.log('tes', response)
          listofReply(boardId, articleId)
            .then(response => {
              retrieveArticle(boardId, articleId)
                .then(response => {
                  console.log('>>>>>>>>>>>>>>>>>>', response);
                  if(user.role.roleCode === "role_student"){
                    console.log(history.location)
                    console.log(history)
                    console.log("1")
                    window.history.back();
                    // window.location.href=("student/board/" + boardId + "/" +match.params.page+"/"+ articleId);

                  }else if(user.role.roleCode === "role_teacher"){
                    console.log("2")
                    window.history.back();
                    // history.push("teacher/board/" + boardId + "/" +match.params.page+"/"+ articleId);
                  }else if(user.role.roleCode === "role_admin"){
                    // history.push("/admin/dashboard")
                    console.log("3")
                    console.log(history)
                    console.log(history.pathname)
                    window.history.back();
                    // history.push("admin/board/" + boardId + "/" + pagenum+"/"+ articleId);
                  }
                  
                });
            })
        })
    }

  };
  

  return (
    <div className="content">
      <div className="ArticleInput">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5>게시판 수정하기</h5>
              </CardHeader>
              <CardBody>
              {ReactHtmlParser(articleContents)}
                <Form onSubmit={e => onSubmit(e)}>
                  <FormGroup>
                    <FormGroup className="has-success">
                      <Input value={articleTitle}  {...Titles} type="text" />
                    </FormGroup>
                    <FormGroup className="has-success">
                      <Input value={articleContents}  {...Contents} type="textarea" />
                    </FormGroup>
                    <Button color="success">
                    <span className="btn-label">
                      <i className="nc-icon nc-check-2" />
                    </span>
                    확인
                  </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>


      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  datas: state.articlereducers.datas  //현재 boardreducers 상태 내에 datas를 가져와서 datas라는 이름으로 사용
  ,user : state.auth.userDetails
});

const mapDispatchToProps = (dispatch) => ({
  updateArticle: (articleId, title, content) => dispatch(ArticleActions.UpdateArticle(articleId, title, content))
  , retrieveArticle: (boardId, articleId) => dispatch(ArticleActions.RetrieveArticle(boardId, articleId))
  , listofReply: (boardId, articleId) => dispatch(ReplyActions.ListofReply(boardId, articleId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateArticles));