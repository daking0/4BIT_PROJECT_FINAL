/**
 * Retrieve Roadmap
 * @author: SEONGHYEON
 * 
 * @description: 
 * -현재 선택한 로드맵에 해당하는 문제를 출력
 * -문제 답과 사용자가 입력한 답을 비교, 정답 or 오답 출력
 * @param:
 * RetrieveRoadmap(roadmapStageNo) 
 * */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { RoadmapActions } from '../../Actions/RoadmapActions';
import { Retrieve } from './Retrieve.css';
import ReactBSAlert from "react-bootstrap-sweetalert";
import {
  Badge,
  Button,
  Card,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Row,
  Col,
  Label,
  Input,
  FormGroup
} from "reactstrap";

const RetrieveRoadmap = ({ user, data,history, updateroadmaplast, getstudentprofile }) => {

  const { roadmap, exerciseContents, exerciseAnswer } = data; //이 글에 대한 정보
  const { roadmapStageNo, roadmapSubject, roadmapChapter } = roadmap;
  const [userAnswer, setUserAnswer] = useState(0);

  const answer = (e) => {
    console.log("답 : ", exerciseAnswer);
    console.log("사용자 : ", userAnswer);
    if (exerciseAnswer === userAnswer) {
      updateroadmaplast(data.roadmap.roadmapStageNo)

      alert("정답입니다!!");
      history.push("/student/roadmap/list");
    }
    else {
      alert("틀렸습니다!!");
    }
    history.push("/student/roadmap/list");
  }

  return (
    <div className="content text-center">
      <Row>
        <Col md="3"></Col>
        <Col md="5">
          <Card>
            <CardBody style={{ fontSize:"20px"}}>
              스테이지 : {roadmapStageNo} <br />
              과목명: {roadmapSubject} <br />
              챕터명: {roadmapChapter} <br /><br />
              <pre>〈문제〉{exerciseContents}  </pre><br />

              <div className="form-check-radio">
                <Label check>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type='radio'
                        name='exerciseAnswer'
                        value='1'
                        onClick={e => setUserAnswer(e.target.value)}
                      />
                      <span className="form-check-sign" />1
                          </Label>
                  </FormGroup>{" "}
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type='radio'
                        name='exerciseAnswer'
                        value='2'
                        onClick={e => setUserAnswer(e.target.value)}
                      />
                      <span className="form-check-sign" />2
                          </Label>
                  </FormGroup>{" "}
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type='radio'
                        name='exerciseAnswer'
                        value='3'
                        onClick={e => setUserAnswer(e.target.value)}
                      />
                      <span className="form-check-sign" />3
                          </Label>
                  </FormGroup>{" "}
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type='radio'
                        name='exerciseAnswer'
                        value='4'
                        onClick={e => setUserAnswer(e.target.value)}
                      />
                      <span className="form-check-sign" />4
                          </Label>
                  </FormGroup>{" "}

                </Label>
              </div>



              {/* 1 <input type='radio' name='exerciseAnswer' value='1' onClick={e => setUserAnswer(e.target.value)} /> &nbsp;&nbsp;&nbsp; */}
              {/* 2 <input type='radio' name='exerciseAnswer' value='2' onClick={e => setUserAnswer(e.target.value)} /> &nbsp;&nbsp;&nbsp;
      3 <input type='radio' name='exerciseAnswer' value='3' onClick={e => setUserAnswer(e.target.value)} /> &nbsp;&nbsp;&nbsp;
      4 <input type='radio' name='exerciseAnswer' value='4' onClick={e => setUserAnswer(e.target.value)} /><br /><br /> */}
              <Button className="btn btn-outline-primary" type="button" onClick={answer}>제출</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    //   <div className="header text-center">
    //     <h2 className="title">실력 향상 문제</h2>
    //   </div>
    //   <div className="fontsize">
    //     스테이지 : {roadmapStageNo} <br />
    //     과목명: {roadmapSubject} <br />
    //     챕터명: {roadmapChapter} <br /><br />
    //     <pre>〈문제〉{exerciseContents}  </pre><br />
    //     </div>
    //   1 <input type='radio' name='exerciseAnswer' value='1' onClick={e => setUserAnswer(e.target.value)} /> &nbsp;&nbsp;&nbsp;
    //   2 <input type='radio' name='exerciseAnswer' value='2' onClick={e => setUserAnswer(e.target.value)} /> &nbsp;&nbsp;&nbsp;
    //   3 <input type='radio' name='exerciseAnswer' value='3' onClick={e => setUserAnswer(e.target.value)} /> &nbsp;&nbsp;&nbsp;
    //   4 <input type='radio' name='exerciseAnswer' value='4' onClick={e => setUserAnswer(e.target.value)} /><br /><br />
    //   <button className="btn btn-outline-primary" type="button" onClick={answer}>제출</button>
    // </div>
  );

  // return (
  //   <div className="content text-left">
  //     <div className="header text-left">
  //       <h2 className="title">실력 향상 문제</h2>
  //     </div>
  //     <div className="fontsize">
  //       스테이지 : {roadmapStageNo} <br />
  //       과목명: {roadmapSubject} <br />
  //       챕터명: {roadmapChapter} <br /><br />
  //       <div className="content text-left">
  //       <pre>문제 : {exerciseContents}  </pre><br />
  //       </div>
  //     </div>
  //     1 <input type='radio' name='exerciseAnswer' value='1' onClick={e => setUserAnswer(e.target.value)} /> &nbsp;&nbsp;&nbsp;
  //     2 <input type='radio' name='exerciseAnswer' value='2' onClick={e => setUserAnswer(e.target.value)} /> &nbsp;&nbsp;&nbsp;
  //     3 <input type='radio' name='exerciseAnswer' value='3' onClick={e => setUserAnswer(e.target.value)} /> &nbsp;&nbsp;&nbsp;
  //     4 <input type='radio' name='exerciseAnswer' value='4' onClick={e => setUserAnswer(e.target.value)} /><br /><br />
  //     <button className="btn btn-outline-primary" type="button" onClick={answer}>제출</button>
  //   </div>
  // );

}

const mapStateToProps = (state) => ({
  user: state.auth.userDetails,
  data: state.roadmapreducers.datas

});

const mapDispatchToProps = (dispatch) => ({
  retrieveRoadmap: (roadmapStageNo) => dispatch(RoadmapActions.RetrieveRoadmap(roadmapStageNo)),
  updateroadmaplast: (roadmapStageNo) => dispatch(RoadmapActions.UpdateRoadmapLast(roadmapStageNo))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetrieveRoadmap));