/**
 * Update Quiz
 * @author: hyeyoung
 * 
 * @description: 
 * -현재 선택한 문제 수정
 * 
 * @param:
 * Updatequiz(quizContents, quizAnswer, quizEachScore, quizSubject, quizChapter, quizLevel, quizId)
 * 
 * */

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { QuizActions } from '../../../Actions/QuizActions';
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Table, Row, Col, Container, Form, FormGroup, Input, Label, Button } from "reactstrap";




function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);
  return {
    value,
    onChange
  }
}

const UpdateQuiz = ({ datas, updateQuiz, match, history }) => {

  const { quizId, quizContents, quizAnswer, quizEachScore, quizSubject,
    quizChapter, quizLevel, quizAnswerType, quizExplain } = datas;

  //    초기값으로 기존에 저장된 데이터 넣어주기
  const Contents = useFormInput(quizContents)
  const Answer = useFormInput(quizAnswer)
  const EachScore = useFormInput(quizEachScore)
  const Subject = useFormInput(quizSubject)
  const Chapter = useFormInput(quizChapter)
  const Level = useFormInput(quizLevel)
  const AnswerType = useFormInput(quizAnswerType)
  const Explain = useFormInput(quizExplain)

  // 상세보기로 돌아가기
  // const gotoRetrieveQuiz = (e) => {
  //   history.push(`/teacher/class/test/exbank/view/` + quizId);
  // }

  // 리스트로 돌아가기
  const gotoListofQuiz = (e) => {
    history.push(`/teacher/class/test/exbank/list`);
  }
  // 문제유형 보이게하기
  const compareAnswerType = (quizAnswerType) => {
    if (quizAnswerType === 0) {
      return "주관식"
    } else {
      return "객관식"
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const quizId = match.params.quizId;
    const contents = Contents.value;
    const answer = Answer.value;
    const eachScore = EachScore.value;
    const subject = Subject.value;
    const chapter = Chapter.value;
    const level = Level.value;
    const answerType = AnswerType.value;
    const explain = Explain.value;

    if (contents.length > 0) {
      updateQuiz(quizId, contents, answer, eachScore, subject, chapter, level, answerType, explain)
        .then(response => {
          history.push(quizId, contents, answer, eachScore, subject, chapter, level, answerType, explain);
        })
    }
    // 
    console.log(quizId);
    console.log(contents);
  };

  return (
    <div className="QuizInput">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">문제 수정</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={e => onSubmit(e)}>
                <Col lg="5" md="6" sm="3">

                  <FormGroup>
                    과목 : <Input value={Subject} {...Subject} type="text" />
                  </FormGroup>
                  <FormGroup>
                    챕터 : <Input value={Chapter} {...Chapter} type="text" />
                  </FormGroup>
                  <FormGroup>
                    난이도 : <Input value={Level} {...Level} type="text" />
                  </FormGroup>
                  <FormGroup>
                    문제유형 : <Input value={compareAnswerType(AnswerType)} {...quizAnswerType} type="text" />
                  </FormGroup>
                  <FormGroup>
                    문제점수 : <Input value={EachScore} {...EachScore} type="text" />
                  </FormGroup>
                  <FormGroup>
                    정답 : <Input value={Answer} {...Answer} type="text" />
                  </FormGroup>
                  <FormGroup>
                    내용 : <Input value={Contents} {...Contents} type="textarea" />
                  </FormGroup>
                  <FormGroup>
                    해설 : <Input value={Explain} {...Explain} type="textarea" />
                  </FormGroup>
                  <Button color="success" size="sm">
                    <span className="btn-label">
                      <i className="nc-icon nc-check-2" />
                    </span>
                    확인
                  </Button>
                </Col>
              </Form>
            </CardBody>
            <CardFooter>
              <Button  onClick={e => gotoListofQuiz(e)}>
                <span className="btn-label">
                  <i className="nc-icon nc-check-2" />
                </span>
                돌아가기
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  datas: state.quizReducers.datas
});

const mapDispatchToProps = (dispatch) => ({
  updateQuiz: (contents, answer, eachScore, subject, chapter, level, answerType, explain) =>
    dispatch(QuizActions.UpdateQuiz(contents, answer, eachScore, subject, chapter, level, answerType, explain))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateQuiz));