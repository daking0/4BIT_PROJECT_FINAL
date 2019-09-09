/**
 * Listof Quiz
 * @author: hyeyoung and chaeyeon
 * 
 * @description: 
 * -모든 문제 목록을 출력
 * ArticleMain.js에서 import하여 사용 (이 컴포넌트 자체로는 사용되지 않고있음)
 * 
 * @param:
 * RetrieveQuiz(quizId) -list에서 문제 선택시 해당 문제 상세 보기해준다.
 * 
 * */
import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { QuizActions } from '../../../Actions/QuizActions';
// import { CreateQuiz } from '../../Quiz/QuizIndex';
// import PaginationComponent from '../../pagination/Pagination'

import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, FormGroup, Input, Label, Button } from "reactstrap";

function checkHasProp(prop) {
  return (prop !== undefined && prop !== null);
}

class ListofQuiz extends React.Component {

  constructor(props) {
    super(props);
    // this.onQuizidChange = this.props.onQuizidChange;
    this.props.listofQuiz(1, 10);
  }


  render() {
// quizId, onQuizidChange,
    const {  history, items, retrieveQuiz, user } = this.props;

    // const retrieveHandler = (e, quizId) => {
    //   retrieveQuiz(quizId)
    //     .then(response => {
    //       console.log('retrieveHandler >>>>>>>', response);
    //       history.push(`/teacher/class/test/exbank/view/${quizId}`);
    //     });
    // };

    const { role } = user;
    const { roleCode } = role;

    // 현재 유저의 권한 학생이 시험 볼때 답 표시 여부 비교
    const compareUser = () => {
      if (role.roleCode === "role_teacher") { //권한에 해당하면
        return false // 답이 보이게
      } else {
        return true
      }
    }

    const compareAnswerType = (quizAnswerType) => {
      if (quizAnswerType === 0) {
        return "주관식"
      } else {
        return "객관식"
      }
    }

    return (
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">문제목록</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead className="text-primary">
                  <tr>
                    <th className="text-center">선택</th>
                    <th className="text-center">과목</th>
                    <th className="text-center">챕터</th>
                    <th className="text-center">난이도</th>
                    <th className="text-center">배점</th>
                    <th className="text-center">문제유형</th>
                    <th className="text-center">문제내용</th>
                    <th className="text-center" hidden={compareUser()}>답</th>
                    {/* <th className="text-center">문제 해설</th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    checkHasProp(items) ? this.props.items.map((item, index) => { // List의 존재 여부를 물은 후 있으면 실행
                      const { quizId, quizSubject, quizChapter, quizAnswerType, quizContents, quizAnswer, quizLevel, quizEachScore, quizExplain } = item;
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" value={quizId} onClick={this.props.onQuizidChange} />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          {/* <td className="text-center" onClick={e => retrieveHandler(e, quizId)}>{quizSubject}</td> */}
                          <td className="text-center">{quizSubject}</td>
                          <td className="text-center">{quizChapter}</td>
                          <td className="text-center">{quizLevel}</td>
                          <td className="text-center">{quizEachScore}</td>
                          <td className="text-center">{compareAnswerType(quizAnswerType)}</td>
                          <td className="text-center">{quizContents}</td>
                          <td className="text-center" hidden={compareUser()}>{quizAnswer}</td>
                          {/* <td className="text-center">{quizExplain}</td> */}
                        </tr>
                      )
                    }) : ('')}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

    );
  }
}

const mapStateToProps = (state) => ({
  items: state.quizReducers.items,
  user: state.auth.userDetails
});

const mapDispatchToProps = (dispatch) => ({
  retrieveQuiz: (quizId) => dispatch(QuizActions.RetrieveQuiz(quizId)),
  listofQuiz: (page, size) => dispatch(QuizActions.ListofQuiz(page, size)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListofQuiz));



// ================================ retrieve========
/*
 * Retrieve Quiz
 * @author: hyeyoung
 * 
 * @description: 
 * -현재 선택한 글에 해당하는 게시물 내용을 출력
 * 
 * @param:
 * RetrieveQuiz(quizId) 
 * */
import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from "react-redux";
import { QuizActions } from '../../../Actions/QuizActions';
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Table, Row, Col, Container, Button } from "reactstrap";

// class RetrieveQuiz extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       quizCon
//     }
//   }
// }

const RetrieveQuizs = ({ datas, retrieveQuiz, deleteQuiz, match, history }) => {
  const { quizContents, quizAnswer, quizEachScore, quizSubject, quizChapter, quizLevel, quizAnswerType, quizExplain } = datas;
  const { quizId } = match.params;
  console.log("===========quizId=====================>" + match.params.quizId);

  // 수정버튼
  const updateQuizHandler = (e, quizId) => {
    e.stopPropagation();
    retrieveQuiz(quizId)
      .then(response => {
        history.push("/teacher/class/test/exbank/" + quizId);
      })
  }

  // 삭제버튼
  const deleteQuizHandler = (e, quizId) => {
    e.stopPropagation();
    deleteQuiz(quizId)
      .then(response => {
        history.push("teacher/delete/quizId=" + quizId);
      })
    RetrieveQuizs();
  }
  const compareAnswerType = (quizAnswerType) => {
    if (quizAnswerType === 0) {
      return "주관식"
    } else {
      return "객관식"
    }
  }
  //현재 user와 글을 쓴 user가 같은 user인지 비교
  // const compareUser = () => {
  //   if (datas.user.userId === userId) { //같은 유저이면
  //     return false //hidden= false -> 버튼 보여줌
  //   } else {
  //     return true
  //   }
  // }

  // console.log({ quizContents })

  return (
    <div className="QuizInput">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">문제상세보기</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <tbody>
                  <tr>
                    <td>과목 : </td><td>{quizSubject}</td>
                  </tr>
                  <tr>
                    <td>챕터 : </td><td>{quizChapter}</td>
                  </tr>
                  <tr>
                    <td>난이도 : </td><td>{quizLevel}</td>
                  </tr>
                  <tr>
                    <td>문제유형 : </td>
                    <td>{compareAnswerType(quizAnswerType)}</td>
                  </tr>
                  <tr>
                    <td>문제점수 : </td><td>{quizEachScore}</td>
                  </tr>
                  <tr>
                    <td>정답 : </td><td>{quizAnswer}</td>
                  </tr>
                  <tr>
                    <td>문제내용 : </td><td>{quizContents}</td>
                  </tr>
                  <tr>
                    <td>문제해설 : </td><td>{quizExplain}</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
            <CardFooter>
              <Button color="success" size="sm" onClick={e => updateQuizHandler(e, quizId)}>
                <span className="btn-label">
                  <i className="nc-icon nc-check-2" />
                </span>
                수정
                  </Button>
              <Button color="success" size="sm" onClick={e => deleteQuizHandler(e, quizId)}>
                <span className="btn-label">
                  <i className="nc-icon nc-check-2" />
                </span>
                삭제
                  </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div >
  );
}


const mapStateToProps = (state) => ({
  datas: state.quizReducers.datas
});

const mapDispatchToProps = (dispatch) => ({
  retrieveQuiz: (quizId) => dispatch(QuizActions.RetrieveQuiz(quizId)),
  deleteQuiz: (quizId) => dispatch(QuizActions.DeleteQuiz(quizId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetrieveQuizs));


// ============================ createTestGroup
/**
 * Create TestGroup
 * @author: chaeyeon
 * 
 * @description:
 * 
 * @param : 
 * 
 * */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { TestGroupActions } from '../../../Actions/TestGroupActions';
import { ListofQuiz, CreateQuiz, RetrieveQuiz } from '../../Quiz/QuizIndex';
import { TestQuizActions } from '../../../Actions/TestQuizActions';
import { QuizActions } from '../../../Actions/QuizActions';
import ReactDatetime from "react-datetime";
import Popup from "reactjs-popup";
import "./CreateTestGroup.css";
import moment, { isMoment } from 'moment';


import { Card, CardHeader, CardTitle, CardBody, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";

class CreateTestGroup extends Component {

  constructor(props) {
    super(props);
    // this.state={
    //   title : '',
    //   content : ''
    // }
    this.onChangeTestName = this.onChangeTestName.bind(this)
    this.onChangeTestStartTime = this.onChangeTestStartTime.bind(this)
    this.onChangeTestEndTime = this.onChangeTestEndTime.bind(this)
    this.onChangeTestDescription = this.onChangeTestDescription.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onClick = this.onClick.bind(this)

    this.onClickToTestQuiz = this.onClickToTestQuiz.bind(this)
    this.handleUserInputChange = this.handleUserInputChange.bind(this)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  state = {
    testName: "",
    testStartTime: "",
    testEndTime: "",
    testDescription: "",
    // ListofQuiz의 초기값 지정
    quizId: [],
  }

  onSubmit(e) {
    e.preventDefault();

    const len = this.props.item.length;
    console.log("배열 길이" + len)
    const testId = this.props.item[len - 1].testId;
    console.log("시험 번호" + this.props.item[len - 1].testId);


    this.setState({
      testName: this.state.testName,
      testStartTime: this.state.testStartTime,
      testEndTime: this.state.testEndTime,
      testDescription: this.state.testDescription
    });

    if (this.state.testStartTime <= this.state.testEndTime) { // 시작시간이 종료시간보다 이전이면

      this.state.testDescription = this.state.testDescription.replace(/(?:\r\n|\r|\n)/g, '<br/>');

      this.props.updateTestGroup(testId, this.state.testName, this.state.testStartTime, this.state.testEndTime, this.state.testDescription)
        .then(response => {
          this.props.history.push("/teacher/class/test")
        })
    } else {
      alert("시작시간이 종료시간이후로 되어있습니다");
    }
  };

  // =====
  openModal(e) {
    e.preventDefault();
    this.setState({
      open: true
    });
  }

  closeModal() {  //팝업 닫기
    this.setState({ open: false });
  }
  // =====

  onClick(e) {
    e.preventDefault();
    this.props.listofQuiz(1, 10)
  }

  // 선택된 시험 문제 저장
  handleUserInputChange = event => {
    this.setState({
      ...this.state,
      quizId: [...this.state.quizId, event.target.value]
    });
    // console.log(">>>>> " + event.target.value);
  };


  // 문제들 저장하는 부분 
  onClickToTestQuiz = (e) => {
    const len = this.props.item.length;  // 길이를 체크해
    const testId = this.props.item[len - 1].testId;  // testID를 찾아서

    const quizIdLen = this.state.quizId.length // 퀴즈 ID
    console.log("확인quiz길이 :" + quizIdLen); // 퀴즈 ID배열의 크기를 구하라

    if (quizIdLen === 10) {
      for (let i = 0; i < 10; i++) {
        const quizid = this.state.quizId[i]; //quizId 하나씩 꺼내서 
        console.log("퀴즈 번호 : " + quizid);
        this.props.createTestQuiz(testId, quizid) // createTestQuiz에 저장하자
      }
      alert("문제 출제 완료")
    } else {
      alert("선택하신 문제 갯수는 " + quizIdLen + "개 입니다.");
    }
    console.log(this.state.quizId)
  }
  // ===============================================================================
  // 선택된 시험 문제 id 저장해서 retrieve에 가져갈거
  handleUserInputRetrieveId = event => {
    this.setState({
      ...this.state,
      quizId: event.target.value
    });
    console.log(">>>" + event.tartget.value);
  };

  // 문제 가지고 
  onClickToRetrieveQiuz = (e) => {
    console.log("상세보기 선택" + this.state.quizId)
    this.props.retrieveQuiz(this.state.quizId)
  }
  // =================================================================================

  onChangeTestName(e) {
    e.preventDefault();
    this.setState({
      testName: e.target.value
    });
  }

  onChangeTestStartTime(value) {
    // // e.preventDefault();
    // e.target.value  = moment().format()
    // this.setState({
    //   testStartTime: e.target.value
    // });
    let testStartTime;
    if (isMoment(value)) {
      testStartTime = value.format();
    } else {
      testStartTime = moment(value).format();
    }
    this.setState({
      testStartTime: testStartTime
    });
  }


  onChangeTestEndTime(value) {
    // e.preventDefault();
    // e.target.value  = moment().format()
    // this.setState({
    //   testEndTime: e.target.value
    // });
    let testEndTime;
    if (isMoment(value)) {
      testEndTime = value.format();
    } else {
      testEndTime = moment(value).format();
    }
    this.setState({
      testEndTime: testEndTime
    });
  }


  onChangeTestDescription(e) {
    e.preventDefault();
    this.setState({
      testDescription: e.target.value
    });

  }

  render() {
    this.updateTestGroup = this.updateTestGroup;

    return (
      <div className="content">
        <div className="TestGroupInput">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">시험 작성</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup className="has-success">
                      시험 이름 <br />
                      <Input type="textarea" value={this.state.testName} onChange={this.onChangeTestName} />
                    </FormGroup>
                    <FormGroup>
                      시작 시간 <br />
                      {/* <Input type="datetime-local" value={this.state.testStartTime} onChange={this.onChangeTestStartTime} /> */}
                      <ReactDatetime
                        dateFormat={"YYYY-MM-DD"}
                        timeFormat={"HH:mm:ss"}
                        value={moment(this.state.testStartTime)}
                        onChange={(value) => this.onChangeTestStartTime(value)}
                        inputProps={{
                          className: "form-control",
                          placeholder: "시작 시간 선택",
                        }} />
                    </FormGroup>
                    <FormGroup>
                      종료 시간 <br />
                      {/* <Input type="datetime-local" value={this.state.testEndTime} onChange={this.onChangeTestEndTime} /> */}
                      <ReactDatetime
                        dateFormat={"YYYY-MM-DD"}
                        timeFormat={"HH:mm:ss"}
                        value={moment(this.state.testEndTime)}
                        onChange={(value) => this.onChangeTestEndTime(value)}
                        inputProps={{
                          className: "form-control",
                          placeholder: "종료 시간 선택",
                        }} />

                    </FormGroup>
                    <FormGroup className="has-success">
                      시험 설명 <br />
                      <Input type="textarea" value={this.state.testDescription} onChange={this.onChangeTestDescription} />
                    </FormGroup>
                    <Button class="btn btn-success">
                      <span class="btn-label">
                        <i class="nc-icon nc-check-2"></i>
                      </span>
                      확인
                    </Button>

                    {/* ====================== 문제목록 팝업시작 수정중 ============================== */}
                    <Button className="button" onClick={this.openModal}>문제선택</Button>
                    <Popup
                      open={this.state.open}
                      closeOnDocumentClick
                      onClose={this.closeModal}
                    // position = "top center"
                    >
                      <div  >
                        {/* 닫기 버튼  */}
                        <a className="close" onClick={this.closeModal} aria-label="Close">
                          <span>&times;</span>
                        </a>
                        {/* 시험 문제 리스트  */}
                        <ListofQuiz onQuizidChange={this.handleUserInputChange} />
                        {/* ====================== 신규문제 출제 팝업시작 ============================== */}
                        <Popup
                          trigger={open => (<Button className="button">{open ? "문제출제닫기" : "신규문제출제"}</Button>)}
                          repositionOnResize="true"
                          position="top center"
                          closeOnDocumentClick
                        >
                          <div className="popup">
                            <CreateQuiz />
                          </div>
                        </Popup>
                        {/* ====================== 신규문제 출제 팝업닫기 ============================== */}
                        {/* ====================== 문제상세보기 팝업 시작 ============================== */}
                        <Popup
                          trigger={open => (<Button className="button" >{open ? "상세보기닫기" : "상세보기"}</Button>)}
                          repositionOnResize="true"
                          position="top center"
                        >
                          <div className="popup">

                            <RetrieveQuiz />
                            {/* <Button onClick={this.onClickToRetrieveQiuz}>문제 상세 보기</Button> */}
                          </div>
                        </Popup>
                        {/* ====================== 문제상세 팝업 닫기 ============================== */}
                      </div>
                      <Button onClick={this.onClickToTestQuiz}>출제완료</Button>
                      <Button onClick={this.closeModal}>닫기</Button>
                    </Popup>
                    {/* ====================== 문제목록 팝업닫기 ============================== */}

                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quiz: state.quizReducers.items,
  // 시험 번호 (test_id)를 얻기위한 리듀서
  item: state.testgroupreducers.items
});


const mapDispatchToProps = (dispatch) => ({
  // 강사가 시험 작성을 누르면 바로 testGroup이 생성되기에(<< testQuiz를 만들기 위해) 시험정보를 입력하면 수정이 되어야한다
  updateTestGroup: (testId, testName, testStartTime, testEndTime, testDescription) => dispatch(TestGroupActions.UpdateTestGroup(testId, testName, testStartTime, testEndTime, testDescription)),

  // 강사가 시험 문제를 생성하기 위해 필요한 문제 리스트
  listofQuiz: (page, size) => dispatch(QuizActions.ListofQuiz(page, size)),
  createTestQuiz: (testId, quizId) => dispatch(TestQuizActions.CreateTestQuiz(testId, quizId)),
  createQuiz: (content, answer, eachScore, subject, chapter, level, answerType, explain) => dispatch(QuizActions.CreateQuiz(content, answer, eachScore, subject, chapter, level, answerType, explain))
  , retrieveQuiz: (quizId) => dispatch(QuizActions.RetrieveQuiz(quizId))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTestGroup));

// ========================================================createTestGroup
/**
 * Create TestGroup
 * @author: chaeyeon and hyeyoung
 * 
 * @description:
 * 
 * @param : 
 * 
 * */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { TestGroupActions } from '../../../Actions/TestGroupActions';
import { ListofQuiz, CreateQuiz, RetrieveQuiz } from '../../Quiz/QuizIndex';
import { TestQuizActions } from '../../../Actions/TestQuizActions';
import { QuizActions } from '../../../Actions/QuizActions';
import ReactDatetime from "react-datetime";
import Popup from "reactjs-popup";
import "./CreateTestGroup.css";
import moment, { isMoment } from 'moment';

import { Card, CardHeader, CardTitle, CardBody, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { throwStatement } from '@babel/types';

class CreateTestGroup extends Component {

  constructor(props) {
    super(props);

    this.onChangeTestName = this.onChangeTestName.bind(this)
    this.onChangeTestStartTime = this.onChangeTestStartTime.bind(this)
    this.onChangeTestEndTime = this.onChangeTestEndTime.bind(this)
    this.onChangeTestDescription = this.onChangeTestDescription.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onClickToTestQuiz = this.onClickToTestQuiz.bind(this)
    this.handleUserInputChange = this.handleUserInputChange.bind(this)
    this.openModalList = this.openModalList.bind(this);
    this.openModalRetreive = this.openModalRetreive.bind(this);
    this.closeModalList = this.closeModalList.bind(this);
    this.closeModalRetreive = this.closeModalRetreive.bind(this);
    this.openModalCreate = this.openModalCreate.bind(this);
    this.closeModalCreate = this.closeModalCreate.bind(this);
  }

  state = {
    testName: "",
    testStartTime: "",
    testEndTime: "",
    testDescription: "",
    // ListofQuiz의 초기값 지정
    quizId: []
    , selectnum: 0
  }

  componentWillMount() {
    this.props.retrieveQuiz(this.state.quizId);
  }

  onSubmit(e) {
    e.preventDefault();

    const len = this.props.item.length;
    console.log("배열 길이" + len)
    const testId = this.props.item[len - 1].testId;
    console.log("시험 번호" + this.props.item[len - 1].testId);


    this.setState({
      testName: this.state.testName,
      testStartTime: this.state.testStartTime,
      testEndTime: this.state.testEndTime,
      testDescription: this.state.testDescription
    });

    if (this.state.testStartTime <= this.state.testEndTime) { // 시작시간이 종료시간보다 이전이면

      this.state.testDescription = this.state.testDescription.replace(/(?:\r\n|\r|\n)/g, '<br/>');

      this.props.updateTestGroup(testId, this.state.testName, this.state.testStartTime, this.state.testEndTime, this.state.testDescription)
        .then(response => {
          this.props.history.push("/teacher/class/test")
        })
    } else {
      alert("시작시간이 종료시간이후로 되어있습니다");
    }
  };


  openModalList() {
    this.setState({ open1: true });
  }

  openModalRetreive() {
    this.setState({ open2: true });
  }

  openModalCreate() {
    this.setState({ open3: true });
  }

  closeModalList() {  //팝업 닫기
    this.setState({ open1: false });
  }
  s
  closeModalRetreive() {  //팝업 닫기
    this.setState({ open2: false });
  }
  closeModalCreate() { //팝업 닫기
    this.setState({ open3: false });
  }


  onClick(e) {
    e.preventDefault();
    this.props.listofQuiz(1, 10)
  }



  // 선택된 시험 문제 저장
  handleUserInputChange = event => {

    this.setState({
      ...this.state,
      quizId: [...this.state.quizId, event.target.value]
      , selectnum: event.target.value
    });
    console.log(">>>>> " + event.target.value);
  };

  // 문제 가지고 
  onClickToRetrieveQiuz = (e) => {
    console.log("상세보기 선택 selectnum " + this.state.selectnum)
    this.setState({ open2: true });
    this.props.retrieveQuiz(this.state.selectnum)

  }

  // 문제들 저장하는 부분 
  onClickToTestQuiz = (e) => {
    const len = this.props.item.length;  // 길이를 체크해
    const testId = this.props.item[len - 1].testId;  // testID를 찾아서

    const quizIdLen = this.state.quizId.length // 퀴즈 ID
    console.log("확인quiz길이 :" + quizIdLen); // 퀴즈 ID배열의 크기를 구하라

    if (quizIdLen === 10) {
      for (let i = 0; i < 10; i++) {
        const quizid = this.state.quizId[i]; //quizId 하나씩 꺼내서 
        console.log("퀴즈 번호 : " + quizid);
        this.props.createTestQuiz(testId, quizid) // createTestQuiz에 저장하자
      }
      alert("문제 출제 완료")
    } else {
      alert("선택하신 문제 갯수는 " + quizIdLen + "개 입니다.");
    }
    console.log("문제 >>>>>>>" + this.state.quizId)
  }

  // =================================================================================

  onChangeTestName(e) {
    e.preventDefault();
    this.setState({
      testName: e.target.value
    });
  }

  onChangeTestStartTime(value) {
    // // e.preventDefault();
    // e.target.value  = moment().format()
    // this.setState({
    //   testStartTime: e.target.value
    // });
    let testStartTime;
    if (isMoment(value)) {
      testStartTime = value.format();
    } else {
      testStartTime = moment(value).format();
    }
    this.setState({
      testStartTime: testStartTime
    });
  }


  onChangeTestEndTime(value) {
    // e.preventDefault();
    // e.target.value  = moment().format()
    // this.setState({
    //   testEndTime: e.target.value
    // });
    let testEndTime;
    if (isMoment(value)) {
      testEndTime = value.format();
    } else {
      testEndTime = moment(value).format();
    }
    this.setState({
      testEndTime: testEndTime
    });
  }


  onChangeTestDescription(e) {
    e.preventDefault();
    this.setState({
      testDescription: e.target.value
    });
  }


  render() {
    this.updateTestGroup = this.updateTestGroup;

    return (
      <div className="content">
        <div className="TestGroupInput">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">시험 작성</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup className="has-success">
                      시험 이름 <br />
                      <Input type="textarea" value={this.state.testName} onChange={this.onChangeTestName} />
                    </FormGroup>
                    <FormGroup>
                      시작 시간 <br />
                      {/* <Input type="datetime-local" value={this.state.testStartTime} onChange={this.onChangeTestStartTime} /> */}
                      <ReactDatetime
                        dateFormat={"YYYY-MM-DD"}
                        timeFormat={"HH:mm:ss"}
                        value={moment(this.state.testStartTime)}
                        onChange={(value) => this.onChangeTestStartTime(value)}
                        inputProps={{
                          className: "form-control",
                          placeholder: "시작 시간 선택",
                        }} />
                    </FormGroup>
                    <FormGroup>
                      종료 시간 <br />
                      {/* <Input type="datetime-local" value={this.state.testEndTime} onChange={this.onChangeTestEndTime} /> */}
                      <ReactDatetime
                        dateFormat={"YYYY-MM-DD"}
                        timeFormat={"HH:mm:ss"}
                        value={moment(this.state.testEndTime)}
                        onChange={(value) => this.onChangeTestEndTime(value)}
                        inputProps={{
                          className: "form-control",
                          placeholder: "종료 시간 선택",
                        }} />

                    </FormGroup>
                    <FormGroup className="has-success">
                      시험 설명 <br />
                      <Input type="textarea" value={this.state.testDescription} onChange={this.onChangeTestDescription} />
                    </FormGroup>
                    <Button class="btn btn-success">
                      <span class="btn-label">
                        <i class="nc-icon nc-check-2"></i>
                      </span>
                      확인
</Button>

                    {/* ====================== 문제목록 팝업시작 수정중 ============================== */}
                    <Button className="button" onClick={this.openModalList}>문제선택</Button>
                    <Popup
                      open={this.state.open1}
                      closeOnDocumentClick
                    >
                      <div  >
                        {/* 닫기 버튼  */}
                        <a className="close" onClick={this.closeModalList} aria-label="Close">
                          <span>&times;</span>
                        </a>

                        {/* ====================== 신규문제 출제 팝업시작 ============================== */}
                        <Button className="button" onClick={this.openModalCreate}>신규문제출</Button>
                        <Popup
                          // trigger={open => (<Button className="button">{open ? "문제출제닫기" : "신규문제출제"}</Button>)}
                          open={this.state.open3}
                          repositionOnResize="true"
                          position="top center"
                          closeOnDocumentClick
                        >
                          <div className="Createpopup">
                            <a className="close" onClick={this.closeModalCreate} aria-label="Close">
                              <span>&times;</span>
                            </a>
                            <CreateQuiz />
                          </div>
                        </Popup>
                        {/* ====================== 신규문제 출제 팝업닫기 ============================== */}
                        {/* ====================== 문제상세보기 팝업 시작 ============================== */}
                        <Button onClick={this.onClickToRetrieveQiuz}>문제 상세 보기</Button>
                        <Popup
                          open={this.state.open2}
                          repositionOnResize="true"
                          position="top center"
                          closeOnDocumentClick
                        >
                          <div className="Retrievepopup">
                            <a className="close" onClick={this.closeModalRetreive} aria-label="Close">
                              <span>&times;</span>
                            </a>
                            <RetrieveQuiz />
                          </div>
                        </Popup>
                        {/* ====================== 문제상세 팝업 닫기 ============================== */}
                        {/* 시험 문제 리스트  */}
                        <ListofQuiz onQuizidChange={this.handleUserInputChange} />
                        <Button onClick={this.onClickToTestQuiz}>출제완료</Button>
                        <Button onClick={this.closeModalList}>닫기</Button>
                      </div>
                    </Popup>
                    {/* ====================== 문제목록 팝업닫기 ============================== */}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quiz: state.quizReducers.items,
  // 시험 번호 (test_id)를 얻기위한 리듀서
  item: state.testgroupreducers.items
});


const mapDispatchToProps = (dispatch) => ({
  // 강사가 시험 작성을 누르면 바로 testGroup이 생성되기에(<< testQuiz를 만들기 위해) 시험정보를 입력하면 수정이 되어야한다
  updateTestGroup: (testId, testName, testStartTime, testEndTime, testDescription) => dispatch(TestGroupActions.UpdateTestGroup(testId, testName, testStartTime, testEndTime, testDescription)),

  // 강사가 시험 문제를 생성하기 위해 필요한 문제 리스트
  listofQuiz: (page, size) => dispatch(QuizActions.ListofQuiz(page, size)),
  createTestQuiz: (testId, quizId) => dispatch(TestQuizActions.CreateTestQuiz(testId, quizId)),
  createQuiz: (content, answer, eachScore, subject, chapter, level, answerType, explain) => dispatch(QuizActions.CreateQuiz(content, answer, eachScore, subject, chapter, level, answerType, explain))
  , retrieveQuiz: (quizId) => dispatch(QuizActions.RetrieveQuiz(quizId))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTestGroup));