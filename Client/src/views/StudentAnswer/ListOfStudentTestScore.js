import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TestQuizActions } from 'Actions/TestQuizActions';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container
} from "reactstrap";


const ListOfStudentTestScore = ({ item, testquiz, answer, history }) => {

  const checkTrue = (quizAnswer, studentTestAnswerContent) => {
    if (quizAnswer == studentTestAnswerContent) {
      return false;
    } else {
      return true;
    }
  }

  const checkFalse = (quizAnswer, studentTestAnswerContent) => {
    if (quizAnswer != studentTestAnswerContent) {
      return false;
    } else {
      return true;
    }
  }


  return (
    <div className="content">
      <Row>
      <Col md="12">
          <Card>
            <CardHeader>
            <CardTitle tag="h4" style={{  fontFamily: "Nanum Myeongjo"}}>결과 보기</CardTitle>
            </CardHeader>
            <CardBody>
              <p style={{fontWeight:"bold", fontSize:"25px"}}>해당 시험의 점수는 <span style={{color:"red"}}>{item}점</span> 입니다.</p>
              <Table responsive>
                <thead>
                  <tr>
                    <td>문제 번호</td>
                    <td>문제 내용</td>
                    <td> 배   점 </td>
                    <td> 정   답 </td>
                    <td>입력한 답</td>
                    <td> 여   부 </td>
                    <td> 해   설 </td>
                  </tr>
                </thead>
                <tbody>
                  {
                    answer.map((item, index) => {
                      const { studentTestAnswerContent, testQuiz } = item;
                      const { quiz } = testQuiz;
                      const { quizContents, quizEachScore, quizAnswer, quizExplain } = quiz;
                      return (
                        <tr>
                          <td>{index + 1} </td>
                          <td>{quizContents} </td>
                          <td>{quizEachScore} </td>
                          <td>{quizAnswer} </td>
                          <td>{studentTestAnswerContent}</td>
                          <td hidden={checkTrue(quizAnswer, studentTestAnswerContent)}> 정답  </td>
                          <td hidden={checkFalse(quizAnswer, studentTestAnswerContent)}> 오답  </td>
                          <td> {quizExplain}  </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  // 학생 점수를 반환하기 위한 리듀서
  item: state.studenttestreducers.datas,

  // 시험 문제 정보를 얻기 위한 리듀서
  testquiz: state.testquizreducers.items,

  // 학생이 입력한 답을 얻기 위한 리듀서
  answer: state.studentanswerreducers.items
});

export default withRouter(connect(mapStateToProps, null)(ListOfStudentTestScore));