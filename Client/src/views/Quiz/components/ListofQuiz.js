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
// import PaginationComponent from '../../pagination/Pagination';
import ReactTable from "react-table";

import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, FormGroup, Input, Label, Button } from "reactstrap";

function checkHasProp(prop) {
  return (prop !== undefined && prop !== null);
}

class ListofQuiz extends React.Component {

  constructor(props) {
    super(props);
    // this.onQuizidChange = this.props.onQuizidChange;
    // this.props.listofQuiz(1, 10);
  }

  state = {
    quizId: ""
  }

  // 컴포넌트 생성과정, render 전
  componentWillMount() {
    this.props.listofQuiz(1, 10);
  }


  render() {
    const { history, items, retrieveQuiz, user } = this.props;
    const { role } = user;
    const { roleCode } = role;

    // const retrieveHandler = (e, quizId) => {
    //   retrieveQuiz(quizId)
    //     .then(response => {
    //       console.log('retrieveHandler >>>>>>>', response);
    //       history.push(`/teacher/class/test/exbank/view/${quizId}`);
    //     });
    // };

    // 현재 유저의 권한 학생이 시험 볼때 답 표시 여부 비교
    const compareUser = () => {
      if (role.roleCode === "role_teacher") { //권한에 해당하면
        return false // 답이 보이게
      } else {
        return true
      }
    }

    const compareAnswerType = (quizAnswerType) => {
      if (quizAnswerType === 0 || quizAnswerType === null || quizAnswerType === undefined) {
        return "객관식"
      } else if (quizAnswerType === 1) {
        return "주관식"
      }
    }

    return (
      <Row>
        <Col md="20">
          <Card style={{ fontFamily: "Nanum Myeongjo" }} >
            {/* <CardHeader>
              <CardTitle tag="h4" >문제목록</CardTitle>
            </CardHeader> */}
            <CardBody>
              <Table>
                <thead>
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
                            <FormGroup check className="has-success">
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
