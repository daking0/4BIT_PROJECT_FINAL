/**
 * Update HwArticle
 * @author: 영빈
 * 
 * */

import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { HwArticleActions } from '../../../Actions/HwArticleActions';
import ReactHtmlParser from 'react-html-parser';

import {Card,CardHeader,CardBody,CardTitle,Table,Row,Col,Container,Form,FormGroup,Input,Label,Button} from "reactstrap";

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);
  return {
    value,
    onChange
  }
}

// const changehtmlparser = ({datas}) => {
//   const {articleContents } = datas;
//   return <div>{ReactHtmlParser(articleContents)} </div>;
// }

const UpdateHwArticle = ({ datas, updateHwArticle, retrieveHwArticle, match, history }) => {
  const { hwArticleId, hwContents } = datas;

  const Contents = useFormInput(hwContents)    //초기값으로 기존에 저장된 데이터를 넣어준다

  const onSubmit = (e) => {
    e.preventDefault();
    const content = Contents.value;
    if (content.length > 0) {
      updateHwArticle(hwArticleId, content)
        .then(response => {
        //   listofReply(boardId, articleId)
        //     .then(response => {
              retrieveHwArticle(hwArticleId)
                // .then(response => {
                //   console.log('>>>>>>>>>>>>>>>>>>', response);
                  history.push("/student/class/assignment/hwArticle/"+ hwArticleId)
                });
            // })
        // })

    }
  };
  

  return (
    <div className="content">
      <div className="HwArticleInput">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5>과제물 수정하기</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={e => onSubmit(e)}>
                  <FormGroup>
                    <FormGroup className="has-success">
                      <Input value={hwContents}  {...Contents} type="textarea" />
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
  datas: state.hwarticlereducers.datas  //현재 boardreducers 상태 내에 datas를 가져와서 datas라는 이름으로 사용
});

const mapDispatchToProps = (dispatch) => ({
  updateHwArticle: (hwArticleId, content) => dispatch(HwArticleActions.UpdateHwArticle(hwArticleId, content))
  , retrieveHwArticle: (hwArticleId) => dispatch(HwArticleActions.RetrieveHwArticle(hwArticleId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateHwArticle));