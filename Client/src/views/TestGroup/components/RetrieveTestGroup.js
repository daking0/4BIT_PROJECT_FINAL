/**
 * Retrieve TestGroup
 * @author: chaeyeon
 * 
 * @description: 
 * - 시험 하나를 클릭했을 시 해당 시험 설명을 출력
 * 
 * @param:
 * showDescriptionTest(testId)
 * */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
// import { TestGroupActions } from '../../../Actions/TestGroupActions';
// import { TestQuizActions } from '../../../Actions/TestQuizActions';
// import { StudentTestActions } from '../../../Actions/StudentTestActions';
// import { CounselActions } from '../../../Actions/CounselActions';
import { TestGroupActions, TestQuizActions, StudentTestActions, CounselActions } from '../../../Actions';
import { Moment } from "moment";
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { StudentAnswerActions } from '../../../Actions/StudentAnswerActions';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Table,
  Button
} from "reactstrap";

class RetrieveTestGroup extends React.Component {
  constructor(props) {
    super(props);

    //제한
    this.CompareUser = this.CompareUser.bind(this);
    this.CheckTeacherAndDate = this.CheckTeacherAndDate.bind(this);
    this.CheckStudent = this.CheckStudent.bind(this);
    this.CheckEnded = this.CheckEnded.bind(this);
    this.ListOfStudent = this.ListOfStudent.bind(this);

    // 버튼
    this.applyTestGroupHandler = this.applyTestGroupHandler.bind(this);
    this.updateTestGroupHandler = this.updateTestGroupHandler.bind(this);
    this.deleteTestGroupHandler = this.deleteTestGroupHandler.bind(this);
    this.listOfTestQuizHandler = this.listOfTestQuizHandler.bind(this);
    this.listOfStudentTestScoreHandler = this.listOfStudentTestScoreHandler.bind(this);
  }

  componentWillMount() {
    var d = new Date(); // 현재 시간 얻기
    var today = moment(d).format("YYYY-MM-DD HH:mm:ss"); // 현재 시간을 String 형으로 변환
    var endTime = moment(this.props.data.testEndTime).format("YYYY-MM-DD HH:mm:ss");

    if (endTime < today) { // 해당 시험의 종료시간이 현재 시간 이전이면

      // 지금까지 학생 점수는 0점, 맞은 수만큼 점수를 계산해서 수정해야 함

      if (this.props.user.role.roleCode === "role_teacher") { // 강사일 때는
        this.props.readCounselStudentList(1, 10);

        // 강사가 맡은 반의 학생 수를 구한다
        const studentCount = this.props.students.length

        // 학생 수만큼 반복
        for (let i = 0; i < studentCount; i++) {
          // 각 학생의 유저번호를 얻어
          const userId = this.props.students[i].user.userId;

          // 시험번호와 유저번호를 이용해 점수 update
          this.props.updateStudentTestScore(this.props.data.testId, userId)
            .then(response => {
              this.props.retrieveTestGroup(this.props.match.params.testId);
            })
        }

      } else if (this.props.user.role.roleCode === "role_student") { // 학생일 때

        // 시험 번호와 자신의 유저번호를 이용해 점수 update
        this.props.updateStudentTestScore(this.props.data.testId, this.props.user.userId)
          .then(response => {
            this.props.retrieveTestGroup(this.props.match.params.testId);
          })
      }

    }// 단점 : 상세보기에 들어올 때마다 업데이트됨


    else if (today < endTime && this.props.user.role.roleCode === "role_student") {
      // console.log("시작해야해!!!!")
      this.props.startstudenttest(this.props.match.params.testId, this.props.user.userId)
        .then(response => {
          this.props.retrieveTestGroup(this.props.match.params.testId);
        })
    }



  }


  // 현재 user와 글을 쓴 user가 같은 user인지 비교
  CompareUser = () => {
    if (this.props.data.user.userId === this.props.user.userId) {
      var d = new Date(); // 현재 시간 얻기
      var today = moment(d).format("YYYY-MM-DD HH:mm:ss");  // 현재 시간을 String 형으로 변환
      var startTime = moment(this.props.data.testStartTime).format("YYYY-MM-DD HH:mm:ss");

      // 시험 진행 중인 페이지에서만 시험을 수정하고 삭제할 수 있다
      // 즉, 시험을 응시하려면 종료시간이 현재시간보다 후이여야 한다
      // 만약 종료 시간보다 현재시간이 전이라면 그 시험은 진행완료인 것으로 판단
      // 시험 진행 완료에서는 수정 및 삭제하기 버튼이 보이지 않아야 한다
      if (today < startTime) {
        return false //hidden= false -> 버튼 보여줌
      } else {
        return true
      }
    } else {
      return true;
    }
  }

  // 응시하기 버튼 제한
  CheckTeacherAndDate = () => {
    var d = new Date(); // 현재 시간 얻기
    var today = moment(d).format("YYYY-MM-DD HH:mm:ss"); // 현재 시간을 String 형으로 변환
    console.log("현재시간 :  " + today);
    var startTime = moment(this.props.data.testStartTime).format("YYYY-MM-DD HH:mm:ss");
    var endTime = moment(this.props.data.testEndTime).format("YYYY-MM-DD HH:mm:ss");
    if (this.props.user.role.roleCode === "role_teacher") { // 강사일 때는 
      return true // 보이지 않음
    } else if (startTime <= today && today <= endTime && this.props.compare.datas == true) { // 시험 응시 기간이고 시험을 보기 전이면
      return false // 보여주고
    } else { // 그렇지 않으면
      return true // 학생 강사 모두 보이지 않게
    }
  }

  // 응시완료 버튼 제한
  EndedApply = () => {
    var d = new Date(); // 현재 시간 얻기
    var today = moment(d).format("YYYY-MM-DD HH:mm:ss");  // 현재 시간을 String 형으로 변환
    console.log("현재시간 :  " + today);
    console.log("결과 : " + this.props.compare.datas)
    var startTime = moment(this.props.data.testStartTime).format("YYYY-MM-DD HH:mm:ss");
    var endTime = moment(this.props.data.testEndTime).format("YYYY-MM-DD HH:mm:ss");
    const check = false;

    if (this.props.user.role.roleCode === "role_teacher") { // 강사일 때는 
      return true // 보이지 않음
    } else if (startTime <= today && today <= endTime && this.props.compare.datas == 0) { // 시험 응시 기간이고 시험을 본 후면
      return false // 보여주고
    } else { // 그렇지 않으면
      return true // 학생 강사 모두 보이지 않게
    }
  }

  // 문제 보기 제한
  CheckStudent = () => {
    var d = new Date(); // 현재 시간 얻기
    var today = moment(d).format("YYYY-MM-DD HH:mm:ss")  // 현재 시간을 String 형으로 변환
    console.log("현재시간 :  " + today);
    var endTime = moment(this.props.data.testEndTime).format("YYYY-MM-DD HH:mm:ss");

    if (this.props.user.role.roleCode === "role_student" || today >= endTime) { // 학생이고 시험 응시 기간이면
      return true // 보이지 않음 >> 학생은 응시하기 버튼이 문제 보기와 비슷한 역할을 함
    } else { // 그렇지 않으면 즉, 시험 응시기간이 아니면
      return false // 문제 보기 가능하다
    }
  }

  // 결과 보기 제한
  CheckEnded = () => {
    var d = new Date(); // 현재 시간 얻기
    var today = moment(d).format("YYYY-MM-DD HH:mm:ss") // 현재 시간을 String 형으로 변환
    console.log("현재시간 :  " + today);
    var endTime = moment(this.props.data.testEndTime).format("YYYY-MM-DD HH:mm:ss");

    if (today <= endTime || this.props.user.role.roleCode === "role_teacher") { // 시험 응시 기간이면
      return true // 보이지 않음
    } else { // 그렇지 않으면 즉, 시험 응시기간이 아니면
      return false // 문제 보기 가능하다
    }
  }

  // 학생 리스트 제한
  ListOfStudent = () => {
    var d = new Date(); // 현재 시간 얻기
    var today = moment(d).format("YYYY-MM-DD HH:mm:ss") // 현재 시간을 String 형으로 변환
    var endTime = moment(this.props.data.testEndTime).format("YYYY-MM-DD HH:mm:ss");

    if (this.props.user.role.roleCode === "role_teacher") { // 강사일 때는
      if (endTime <= today) { // 시험 종료 시
        return false // 보여주고
      } else { // 그렇지 않으면
        return true // 보이지 않게
      }
    } else {
      return true
    }
  }

  // 응시버튼 클릭 시
  applyTestGroupHandler = (e, testId) => {
    e.stopPropagation();
    console.log("시험번호 : " + testId);

    const score = 0;
    this.props.createStudentTest(testId, score)

      .then(response => {
        this.props.history.push(`/student/class/testId=${testId}/answer/write`);
      })
  };

  //수정버튼 클릭 시
  updateTestGroupHandler = (e, testId) => {
    e.stopPropagation();
    this.props.retrieveTestGroup(testId)
      .then(response => {
        this.props.history.push("/teacher/class/test/edit");
      })
  };

  //삭제버튼 클릭 시
  deleteTestGroupHandler = (e, testId) => {
    e.stopPropagation();
    this.props.deleteTestGroup(testId)
      .then(response => {
        this.props.history.push("/teacher/class/test/delete")
      })
      .then(response => {
        this.props.history.push("/teacher/class/test")
      })
  };

  // 시험 문제 보기 클릭 시
  listOfTestQuizHandler = (e, testId) => {
    const page = 1;
    const size = 10;

    if (this.props.user.role.roleCode === "role_teacher") {
      e.stopPropagation();
      this.props.listOfTestQuiz(testId, page, size)
        .then(response => {
          console.log("response >>>>>>>>", response)
          this.props.history.push(`/teacher/testquiz/list/testId=${testId}`);
        })
    } else if (this.props.user.role.roleCode === "role_student") {
      e.stopPropagation();
      this.props.listOfTestQuiz(testId, page, size)
        .then(response => {
          console.log("response >>>>>>>>", response)
          this.props.history.push(`/student/testquiz/list/testId=${testId}`);
        })
    }
  }

  // 결과 보기 클릭 시
  listOfStudentTestScoreHandler = (e, userId, testId) => {
    console.log("유저번호 : " + userId);
    console.log("시험번호 : " + testId);
    if (this.props.user.role.roleCode === "role_teacher") {
      this.props.listOfStudentTestScore(userId, testId)
        .then(response => {
          this.props.listOfStudentAnswer(testId, userId)
          .then(response => {
            this.props.listOfTestQuiz(testId, 1, 10)
            .then(response => {
              this.props.history.push(`/teacher/study/endedtest/showscore/userId=${userId}/testId=${testId}`)
            })
          })
        })
    } else if (this.props.user.role.roleCode === "role_student") {
      e.stopPropagation();
      this.props.listOfStudentTestScore(userId, testId)
        .then(response => {
          this.props.listOfStudentAnswer(testId, userId)
          .then(response => {
            this.props.history.push(`/student/study/endedtest/showscore/userId=${userId}/testId=${testId}`)
          })
        })
    }
  }

  render() {
    const { testName, testStartTime, testEndTime, testDescription } = this.props.data;

    return (
      <div className="content">
        <Row>
          <Col md="10">
            <Card >
              <CardHeader tag="h4" style={{ fontFamily: "Nanum Myeongjo" }}>
                {testName}
              </CardHeader>
              <CardBody style={{ fontSize: "15px", marginLeft: "15px" }}>
                <Row>
                  <Col md="3">
                    시작 시간: {moment(testStartTime).format('YYYY-MM-DD HH:mm:ss')} <br />
                  </Col>
                  <Col md="3">
                    종료 시간: {moment(testEndTime).format('YYYY-MM-DD HH:mm:ss')}  <br />
                  </Col>
                </Row>
                <br></br>
                <br></br>
                <Row style={{ width: "80%", height: "300px", border: "1px grey solid" }}>
                  <Col >
                    {ReactHtmlParser(testDescription)}  <br />
                  </Col>
                </Row>
                <br></br>
                <Row style={{ marginTop: "7px" }}>
                  <Col md="2" >
                    <Button onClick={e => this.applyTestGroupHandler(e, this.props.data.testId)} hidden={this.CheckTeacherAndDate()}>응시하기</Button>
                    <Button class="btn btn-success" onClick={e => this.props.history.push("/student/class/test")} hidden={this.EndedApply()}>응시 완료</Button>
                    <Button color="warning" onClick={e => this.updateTestGroupHandler(e, this.props.data.testId)} hidden={this.CompareUser()}>수정하기</Button>
                    <Button color="danger" onClick={e => this.deleteTestGroupHandler(e, this.props.data.testId)} hidden={this.CompareUser()} >삭제하기</Button>
                    <Button onClick={e => this.listOfTestQuizHandler(e, this.props.data.testId)} hidden={this.CheckStudent()} >문제 보기</Button>
                    <Button class="btn btn-success" onClick={e => this.listOfStudentTestScoreHandler(e, this.props.user.userId, this.props.data.testId)} hidden={this.CheckEnded()} >결과 보기</Button>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Card>
                  <Table responsive hidden={this.ListOfStudent()}>
                    <thead  className="text-center">
                      <tr>
                        <th>학생 이름</th>
                        <th>         </th>
                      </tr>
                    </thead>
                    <tbody  className="text-center">
                      {
                        this.props.students.map((student, index) => {
                          const { user } = student;
                          const { userId, name } = user;
                          return (
                            <tr key={index}>
                              <td onClick={e => this.listOfStudentTestScoreHandler(e, userId, this.props.data.testId)}>{name}</td>
                              <td><Button class="btn btn-success" onClick={e => this.listOfStudentTestScoreHandler(e, userId, this.props.data.testId)}>결과보기</Button> </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </Table>
                </Card>
              </CardFooter>
            </Card>

          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.testgroupreducers.datas,
  user: state.auth.userDetails, //현재 user의 userDetails
  students: state.counsel.items,
  score: state.studentanswerreducers.datas,
  compare: state.studenttestreducers
});

const mapDispatchToProps = (dispatch) => ({
  retrieveTestGroup: (testId) => dispatch(TestGroupActions.RetrieveTestGroup(testId)),
  deleteTestGroup: (testId) => dispatch(TestGroupActions.DeleteTestGroup(testId)),
  listOfTestQuiz: (testId, page, size) => dispatch(TestQuizActions.ListOfTestQuiz(testId, page, size)),
  createStudentTest: (testId, score) => dispatch(StudentTestActions.CreateStudentTest(testId, score)),
  listOfStudentTestScore: (userId, testId) => dispatch(StudentTestActions.ListOfStudentTestScore(userId, testId)),
  readCounselStudentList: (page, size) => dispatch(CounselActions.ReadCounselStudentList(page, size)),
  updateStudentTestScore: (testId, userId) => dispatch(StudentTestActions.UpdateStudentTestScore(testId, userId)),
  listOfStudentAnswer: (testId, userId) => dispatch(StudentAnswerActions.ListOfStudentAnswer(testId, userId)),
  startstudenttest: (testId, userId) => dispatch(StudentTestActions.startStudentTest(testId, userId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetrieveTestGroup));