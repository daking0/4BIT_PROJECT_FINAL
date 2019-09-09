/**
 * Retrieve Homework
 * @author: 영빈
 * 
 * */

import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from "react-redux";
import { HomeworkActions } from '../../../Actions/HomeworkActions';
import { HwArticleActions } from '../../../Actions/HwArticleActions';

import { HwReplyActions } from '../../../Actions/HwReplyActions';

import { CounselActions } from '../../../Actions/CounselActions';

import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Table, Row, Col, Container, Button } from "reactstrap";

const RetrieveHomework = ({ data, user, students, retrieveHomework, retrieveHwArticle, deleteHomework, createHwArticle, listOfHwReply, dataOfHwArticleReducer, findMyHwArticle, findMyHwArticleForTeacher, readCounselStudentList, listOfStudentTestScoreHandler, match, history }) => {
  const { hwId } = match.params;
  const { hwName, hwDescription, hwCreateDate, hwUpdateDate, hwDeadLine, hwSubject } = data; //이 글에 대한 정보

  const { userId } = user; //현재 로그인 된 유저의 userId                                                         

  useEffect(() => {
    console.log('렌더링이 완료되었습니다!');
    if (user.role.roleCode === "role_teacher") {
      readCounselStudentList(1, 10);
    }
  }, []);

  // if (students === undefined || students === null || students === [])  {
  //   console.log("학생리스트 액션")
  //   readCounselStudentList(1, 10);
  // }

  // 학생 리스트 제한
  const ListOfStudent = () => {
    var d = new Date(); // 현재 시간 얻기
    var today = d.toISOString(); // 현재 시간을 String 형으로 변환

    if (user.role.roleCode === "role_teacher") { // 강사이면서
      if (data.hwDeadLine <= today) { // 이미 종료된 과제이면
        return false // 보여주고
      } else { // 그렇지 않으면
        return true // 보이지 않게
      }
    } else {      // 강사가 아니면 안보이게
      return true
    }
  }

  //수정버튼 
  const updateHomeworkHandler = (e, hwId) => {
    e.stopPropagation();
    retrieveHomework(hwId)
      .then(response => {
        history.push("/teacher/class/assignment/view/" + hwId + "/modify");
      })
  };

  //삭제버튼
  const deleteHomeworkHandler = (e, hwId) => {
    e.stopPropagation();
    deleteHomework(hwId)
      .then(response => {
        history.push("/teacher/class/assignment/list");
      })
  };

  //제출버튼
  const createHwArticleHandler = (e, hwId) => {
    e.stopPropagation();
    // createHwArticle(hwId)
    // .then(response => {
    history.push("/student/class/assignment/hwId/" + hwId + "/hwArticle/write")
    // })
  }

  //결과보기 버튼 (학생 자신용)
  const retrieveHwArticleHandler = (e, hwId) => {
    e.stopPropagation();
    console.log('현제 과제번호: ' + hwId)
    findMyHwArticle(hwId)
      .then(response => {
        // const hwArticleId = dataOfHwArticleReducer;
        // console.log(dataOfHwArticleReducer.hwArticleId)
        console.log(response)
        console.log(response.payload.data)
        retrieveHwArticle(response.payload.data)

          // .then(response => {
          //  listOfHwReply(response.payload.data)
          .then(response => {
            console.log(dataOfHwArticleReducer)
            if (user.role.roleCode === "role_teacher") {
              history.push("/teacher/class/assignment/hwArticle/" + response.payload.data.hwArticleId)
            } else {
              history.push("/student/class/assignment/hwArticle/" + response.payload.data.hwArticleId)
            }
          })
      })

    // })
  }

  //결과보기 버튼2 (강사용)
  const retrieveHwArticleHandlerForTeacher = (e, hwId, userId) => {
    e.stopPropagation();
    console.log("1.숙제번호", hwId, "유저", userId)
    findMyHwArticleForTeacher(hwId, userId)
      .then(response => {
        // const hwArticleId = dataOfHwArticleReducer;
        console.log("1결과>>findMyHwArticleForTeacher", response)
        // console.log(hwArticleId)
        console.log("1결과>>가져와서 리듀서 정리한 과제번호", dataOfHwArticleReducer) //한박자 느린 애 
        console.log("1결과>>학생 과제 번호", response.payload.data) //얜 정상이야

        retrieveHwArticle(response.payload.data)
          .then(response => {
            console.log("2.숙제 액션 끝", response)
            if (user.role.roleCode === "role_teacher") {
              history.push("/teacher/class/assignment/hwArticle/" + response.payload.data.hwArticleId)
            } else {
              history.push("/student/class/assignment/hwArticle/" + response.payload.data.hwArticleId)
            }
          })

      })
  }

  //현재 user와 글을 쓴 user가 같은 user인지 비교
  const CompareUser = () => {
    if (data.user.userId === userId) { //같은 유저이면
      return false //hidden= false -> 버튼 보여줌
    } else {
      return true
    }
  }

  // 제출하기 버튼 표시여부 판별
  const CheckIsSubmitted = () => {
    let now = new Date(); // 현재 시간 얻기
    let nowM = moment(now).format('YYYY-MM-DD HH:mm')
    let hwDeadLineM = moment(hwDeadLine).format('YYYY-MM-DD HH:mm')

    // 학생이면서 현재가 마감일 이전이면
    if (user.role.roleCode === "role_student" && nowM < hwDeadLineM) {
      return false    // 제출하기 버튼 표시
    }
    // 그 외 모든경우는 제출하기 버튼 숨김 (hidden = true)
    else {
      return true
    }
  }


  // 결과보기 버튼(학생용) 표시여부 판멸
  const CheckResultButton = () => {
    console.log('CheckResultButton 진입')

    // 자신이 학생이면 결과보기 버튼 표시
    if (user.role.roleCode === "role_student") {
      return false
    }
    else {
      return true
    }
  }





  // 시간형태 변경
  var time1 = hwCreateDate;
  var hwCreateDateM = moment(time1).format('YYYY-MM-DD HH:mm')
  var time2 = hwUpdateDate;
  var hwUpdateDateM = moment(time2).format('YYYY-MM-DD HH:mm')
  var time3 = hwDeadLine;
  var hwDeadLineM = moment(time3).format('YYYY-MM-DD HH:mm')


  return (
    <div className="content">
      <Row>
        <Col md="10">
          <Card>
          <CardHeader tag="h4" style={{ fontFamily: "Nanum Myeongjo" }}>
          <h6>과제 {hwId}</h6>
                   {hwName}
              </CardHeader>

            <CardBody style={{ fontSize: "15px", marginLeft: "15px" }}>

              <Row>
                <Col md="3">작성일: {hwCreateDateM}</Col>
                <Col md="3">수정일: {hwUpdateDateM}</Col>
              </Row>
              <Row>
                <Col md="3">마감일: {hwDeadLineM}</Col>
                <Col md="3">과목명: {hwSubject}</Col>
              </Row>

              <Row style={{ width: "80%", height: "300px", border: "1px grey solid" }}>
                <Col>{ReactHtmlParser(hwDescription)}</Col>
              </Row>


            </CardBody>

        
            <CardFooter>
              <Card>
              
                <Button size="lg" color="primary" hidden={CheckIsSubmitted()} onClick={e => createHwArticleHandler(e, hwId)}>
                  <span className="btn-label">
                    <i className="nc-icon nc-send" />
                  </span>
                  제출하기
              </Button>
                <Button size="lg" hidden={CheckResultButton()} onClick={e => retrieveHwArticleHandler(e, hwId)}>
                  <span className="btn-label">
                    <i className="nc-icon nc-zoom-split" />
                  </span>
                  제출내용 확인
              </Button>

              <Col >

              <Row style={{ marginTop: "7px" }}>
                <Col>
                <Button color="success" hidden={CompareUser()} onClick={e => updateHomeworkHandler(e, hwId)}  style={{ margin: "5px" }}>
                  <span className="btn-label">
                    <i className="nc-icon nc-ruler-pencil" />
                  </span>
                  수정
                  </Button>
                  
                <Button color="danger" hidden={CompareUser()} onClick={e => deleteHomeworkHandler(e, hwId)}>
                  <span className="btn-label">
                    <i className="nc-icon nc-simple-remove" />
                  </span>
                  삭제
                  </Button>
                  </Col>
                  </Row>
                  </Col>
             
              <Col><br/></Col>
              </Card>
            </CardFooter>
          </Card>
          <Card>
            
              
                <Table responsive hidden={ListOfStudent()} style={{marginRight:"400px"}}>
                  <thead className="text-center">
                    <tr>
                      <th>학생 목록</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {
                      students.map((student, index) => {
                        const { user } = student;
                        const { userId, name } = user;
                        return (
                          <tr key={index}>
                            <td >{name}</td>
                            <td><Button onClick={e => retrieveHwArticleHandlerForTeacher(e, hwId, userId)}>결과보기</Button> </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              
            
            </Card>

            
        </Col>
      </Row>

    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.homeworkreducers.data,
  dataOfHwArticleReducer: state.hwarticlereducers.data,
  user: state.auth.userDetails, //현재 user의 userDetails
  students: state.counsel.items
});

const mapDispatchToProps = (dispatch) => ({
  retrieveHomework: (hwId) => dispatch(HomeworkActions.RetrieveHomework(hwId)),
  deleteHomework: (hwId) => dispatch(HomeworkActions.DeleteHomework(hwId)),
  createHwArticle: (hwId) => dispatch(HwArticleActions.CreateHwArticle(hwId)),
  findMyHwArticle: (hwId) => dispatch(HwArticleActions.FindMyHwArticle(hwId)),
  findMyHwArticleForTeacher: (hwId, userId) => dispatch(HwArticleActions.findMyHwArticleForTeacher(hwId, userId)),
  retrieveHwArticle: (hwArticleId) => dispatch(HwArticleActions.RetrieveHwArticle(hwArticleId)),
  listOfHwReply: (hwArticleId) => dispatch(HwReplyActions.ListOfHwReply(hwArticleId)),
  readCounselStudentList: (page, size) => dispatch(CounselActions.ReadCounselStudentList(page, size))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetrieveHomework));