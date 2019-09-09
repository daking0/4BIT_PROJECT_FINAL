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
    , selectnum: ""
    ,testId:""
  }

  // componentWillMount() {
  //   this.props.createTestQuiz(this.state.testId, this.state.quizId);
  //   this.props.retrieveQuiz(this.state.selectnum);
  // }

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
    // this.props.listofQuiz(1, 10)
    this.props.createTestQuiz(this.state.testId, this.state.quizId);
  }


  // 3. 수정3
  // handleUserInputChange = event => {
  //   const quizId = event.target.value;
  //   const selectnum = event.target.value;

  //   this.setState({
  //     quizId: [...this.state.quizId], 
  //     selectnum: this.state.selectnum
  //   });
  //   console.log(">>>1. quizId  : "+quizId);
  //   console.log(">>>1. selectnum : "+selectnum);

  //   const quizIdArr = Array.prototype.slice.call(quizId);
  //   const selectnumArr = selectnum;

  //   this.setState({
  //     quizId: [ ...quizIdArr , event.target.value], 
  //     selectnum: selectnumArr
  //   });

  //   console.log(">>>2. quizArr = " + quizId);
  //   console.log(">>>2. selectnum = " + selectnum);
  //   // console.log(">>>>> " + event.target.value);
  // };

  // 2. 수정 2
  // handleUserInputChange = event => {
  //   var quizId = event.target.quizId;
  //   // var selectnum = event.target.quizId;
  //   this.setState({quizId : [...this.state.quizId]});
  //   console.log("......1.quizId......"+this.state.quizId)
  //   var quizIdArr = Array.proptotype.slice.call(this.state.quizId);
  //   this.setState({ quizId : [...this.state.quizId, ...quizIdArr]});
  //   console.log("......2.quizId....."+this.state.quizId)
  // };

  // 1. 선택된 시험 문제 저장>>>원본
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
        console.log(" 번호 : " + testId);
        const quizid = this.state.quizId[i]; //quizId 하나씩 꺼내서 
        console.log("퀴즈 번호 : " + quizid);
        this.props.createTestQuiz(testId, quizid, (i+1)) // createTestQuiz에 저장하자
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
                <h5>시험 작성</h5>
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
                    <Button  className="button" onClick={this.openModalList}>문제선택</Button>
                    <Popup
                      className="popup"
                      open={this.state.open1}
                      position="top center"
                    >
                     <div className="CreatePopup" style={{fontSize:"10px", marginLeft:"20px"}}>
                        {/* 닫기 버튼  */}
                        <a className="close" onClick={this.closeModalList} aria-label="Close" >
                          <span>&times;</span>
                        </a>
                        {/* 시험 문제 리스트  */}
                        <ListofQuiz onQuizidChange={this.handleUserInputChange} />
                        {/* ====================== 신규문제 출제 팝업시작 ============================== */}
                        <Button className="button" onClick={this.openModalCreate}>문제추가</Button>
                        <Popup
                          className="popup"
                          open={this.state.open3}
                          repositionOnResize="true"
                          position="top center"
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
                        <Button onClick={this.onClickToRetrieveQiuz}>상세보기</Button>
                        <Popup
                          className="popup"
                          open={this.state.open2}
                          repositionOnResize="true"
                          position="top center"
                          // closeOnDocumentClick
                        >
                          <div className="Retrievepopup">
                            <a className="close" onClick={this.closeModalRetreive} aria-label="Close">
                              <span>&times;</span>
                            </a>
                            <RetrieveQuiz />
                          </div>
                        </Popup>
                        {/* ====================== 문제상세 팝업 닫기 ============================== */}
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
  createTestQuiz: (testId, quizId, no) => dispatch(TestQuizActions.CreateTestQuiz(testId, quizId, no)),
  createQuiz: (content, answer, eachScore, subject, chapter, level, answerType, explain) => dispatch(QuizActions.CreateQuiz(content, answer, eachScore, subject, chapter, level, answerType, explain))
  , retrieveQuiz: (quizId) => dispatch(QuizActions.RetrieveQuiz(quizId))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTestGroup));