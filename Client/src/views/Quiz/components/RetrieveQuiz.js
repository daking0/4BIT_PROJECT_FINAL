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
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { QuizActions } from '../../../Actions/QuizActions';
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Table, Row, Col, Container, Button } from "reactstrap";

class RetrieveQuiz extends React.Component {

  constructor(props) {
    super(props);
    this.updateQuizHandler = this.updateQuizHandler.bind(this);
    this.deleteQuizHandler = this.deleteQuizHandler.bind(this);
    this.compareAnswerType = this.compareAnswerType.bind(this);
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    this.state = { quizId: 0 }
  }

  componentWillMount() {
    this.props.retrieveQuiz(this.state.quizId);
    this.props.updateQuiz()
  }

  // 수정버튼
  updateQuizHandler = (e, quizId) => {
    e.stopPropagation();
    this.props.updateQuiz(quizId)
      .then(response => {
        this.props.history.push("/teacher/class/test/exbank/" + quizId);
      })

  }

  // 삭제버튼
  deleteQuizHandler = (e, quizId) => {
    e.stopPropagation();
    this.props.deleteQuiz(quizId)
      .then(response => {
        this.props.history.push("teacher/delete/quizId=" + quizId);
      })

  }


  // openModal() {
  //   this.setState({ open: true });
  // }

  // closeModal() {  //팝업 닫기
  //   this.setState({ open: false });
  // }


  compareAnswerType = (quizAnswerType) => {
    if (quizAnswerType === 0 || quizAnswerType === null || quizAnswerType === undefined) {
      return "객관식"
    } else if (quizAnswerType === 1) {
      return "주관식"
    }
  }

  render() {
    // console.log(this.props.data);
    const { quizContents, quizAnswer, quizEachScore, quizSubject, quizChapter, quizLevel, quizAnswerType, quizExplain } = this.props.data;
    const { quizId } = this.props.match.params;

    return (
      <div className="QuizInput" style={{ fontSize:"15px", fontFamily: "Nanum Myeongjo", marginLeft:"45px"}}>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">문제상세보기</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
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
                      <td>{this.compareAnswerType(quizAnswerType)}</td>
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
                <Button  onClick={e => this.updateQuizHandler(e, quizId)}>
                  <span className="btn-label">
                    <i className="nc-icon nc-check-2" />
                  </span>
                  수정
                  </Button>  
                <Button onClick={e => this.deleteQuizHandler(e, quizId)}>
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
        )
      }
    }
    
const mapStateToProps = (state) => ({
          data: state.quizReducers.datas
      });
      
const mapDispatchToProps = (dispatch) => ({
          retrieveQuiz: (quizId) => dispatch(QuizActions.RetrieveQuiz(quizId)),
        deleteQuiz: (quizId) => dispatch(QuizActions.DeleteQuiz(quizId)),
        updateQuiz: (contents, answer, eachScore, subject, chapter, level, answerType, explain) =>
        dispatch(QuizActions.UpdateQuiz(contents, answer, eachScore, subject, chapter, level, answerType, explain))
      });
      
      export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetrieveQuiz));
