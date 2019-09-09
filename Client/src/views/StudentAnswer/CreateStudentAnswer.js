/**
 * Create StudentAnswer
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
import {TestQuizActions} from '../../Actions';
import { StudentAnswerActions } from '../../Actions/StudentAnswerActions';

import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Form,
    InputGroupAddon,
    InputGroup,
    Button,
    Input
} from "reactstrap";

// 학생이 시험을 응시하는 페이지
class CreateStudentAnswer extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this)
        const { testId } = this.props.test;

        this.listofTestQuiz = this.props.listofTestQuiz(testId)
    }

    state = {
        no1: '',
        no2: '',
        no3: '',
        no4: '',
        no5: '',
        no6: '',
        no7: '',
        no8: '',
        no9: '',
        no10: '',


    }

    handlingChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        console.log("클릭했다아ㅏㅏ")
        e.preventDefault();
        const len = this.props.item.length;
        const studentTestId = this.props.item[len - 1].studentTestId;
        console.log("학생 시험 번호 : " + studentTestId);

        const testQuizLen = this.props.testQuiz.length;

        const answer = [
            this.state.no1,
            this.state.no2,
            this.state.no3,
            this.state.no4,
            this.state.no5,
            this.state.no6,
            this.state.no7,
            this.state.no8,
            this.state.no9,
            this.state.no10];

        for (let i = 0; i < testQuizLen; i++) {

            const testQuizId = this.props.testQuiz[i].testQuizId;
            const studentAnswer = answer[i];
            console.log("시험 문제 번호 :  " + testQuizId);
            console.log("학생 답 : " + answer[i]);

            this.props.createStudentAnswer(studentTestId, testQuizId, studentAnswer);
        }
        this.props.history.push(`/student/testId=${this.props.test.testId}`);
    }

    render() {
        return (
            <div className="content">
                <div className="StudentAnswerInput">
                    <Row>
                    <Col md="10">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">시험 응시</CardTitle>
                                </CardHeader>
                                <CardBody>
                                
                                    <Form onSubmit={e => this.onSubmit(e)}>
                                        <h5> 문제 1: {this.props.testQuiz[0].quiz.quizContents} &nbsp; &ensp; &emsp; &nbsp; &ensp; 배점 : {this.props.testQuiz[0].quiz.quizEachScore}</h5>
                                        <Col md="6">
                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">답</InputGroupAddon> 
                                        <Input type="text" name="no1"  value={this.state.no1} onChange={this.handlingChange} />
                                        </InputGroup> <br />
                                        </Col>

                                        <h5> 문제 2: {this.props.testQuiz[1].quiz.quizContents} &nbsp; &ensp; &emsp; &nbsp; &ensp; 배점 : {this.props.testQuiz[1].quiz.quizEachScore}</h5> 
                                        <Col md="6">
                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">답</InputGroupAddon> 
                                        <Input type="text" name="no2" value={this.state.no2} onChange={this.handlingChange} />
                                        </InputGroup> <br />
                                        </Col>

                                        <h5>문제 3: {this.props.testQuiz[2].quiz.quizContents} &nbsp; &ensp; &emsp; &nbsp; &ensp; 배점 : {this.props.testQuiz[2].quiz.quizEachScore} </h5>
                                        <Col md="6">
                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">답</InputGroupAddon> 
                                        <Input type="text" name="no3" value={this.state.no3} onChange={this.handlingChange} />
                                        </InputGroup> <br />
                                        </Col>

                                        <h5>문제 4: {this.props.testQuiz[3].quiz.quizContents} &nbsp; &ensp; &emsp; &nbsp; &ensp; 배점 : {this.props.testQuiz[3].quiz.quizEachScore} </h5>
                                        <Col md="6">                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">답</InputGroupAddon> 
                                        <Input type="text" name="no4" value={this.state.no4} onChange={this.handlingChange} />
                                        </InputGroup> <br />
                                        </Col>

                                        <h5>문제 5: {this.props.testQuiz[4].quiz.quizContents} &nbsp; &ensp; &emsp; &nbsp; &ensp; 배점 : {this.props.testQuiz[4].quiz.quizEachScore} </h5>
                                        <Col md="6">                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">답</InputGroupAddon> 
                                        <Input type="text" name="no5" value={this.state.no5} onChange={this.handlingChange} />
                                        </InputGroup> <br />
                                        </Col>

                                        <h5>문제 6: {this.props.testQuiz[5].quiz.quizContents} &nbsp; &ensp; &emsp; &nbsp; &ensp; 배점 : {this.props.testQuiz[5].quiz.quizEachScore} </h5>
                                        <Col md="6">                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">답</InputGroupAddon> 
                                        <Input type="text" name="no6" value={this.state.no6} onChange={this.handlingChange} />
                                        </InputGroup> <br />
                                        </Col>

                                        <h5>문제 7: {this.props.testQuiz[6].quiz.quizContents} &nbsp; &ensp; &emsp; &nbsp; &ensp; 배점 : {this.props.testQuiz[6].quiz.quizEachScore} </h5> 
                                        <Col md="6">                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">답</InputGroupAddon> 
                                        <Input type="text" name="no7" value={this.state.no7} onChange={this.handlingChange} />
                                        </InputGroup> <br />
                                        </Col>

                                        <h5>문제 8: {this.props.testQuiz[7].quiz.quizContents} &nbsp; &ensp; &emsp; &nbsp; &ensp; 배점 : {this.props.testQuiz[7].quiz.quizEachScore} </h5>
                                        <Col md="6">
                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">답</InputGroupAddon> 
                                        <Input type="text" name="no8" value={this.state.no8} onChange={this.handlingChange} />
                                        </InputGroup> <br />
                                        </Col>

                                        <h5>문제 9: {this.props.testQuiz[8].quiz.quizContents} &nbsp; &ensp; &emsp; &nbsp; &ensp; 배점 : {this.props.testQuiz[8].quiz.quizEachScore} </h5> 
                                        <Col md="6">                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">답</InputGroupAddon>
                                        <Input type="text" name="no9" value={this.state.no9} onChange={this.handlingChange} />
                                        </InputGroup> <br />
                                        </Col>

                                        <h5>문제 10: {this.props.testQuiz[9].quiz.quizContents} &nbsp; &ensp; &emsp; &nbsp; &ensp; 배점 : {this.props.testQuiz[9].quiz.quizEachScore} </h5> 
                                        <Col md="6">
                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">답</InputGroupAddon> 
                                        <Input type="text" name="no10" value={this.state.no10} onChange={this.handlingChange} />
                                        </InputGroup> <br />
                                        </Col>
                                        
                                        <Button color="successs">제출하기</Button>
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
    // 학생 시험번호를 얻기위한 리듀서
    item: state.studenttestreducers.items,

    // 시험 문제 번호를 얻기 위한 리듀서
    testQuiz: state.testquizreducers.items,

    // 시험 번호를 얻기위한 리듀서 >> 시험 문제 리스트를 뽑기 위해
    test: state.testgroupreducers.datas
});

const mapDispatchToProps = (dispatch) => ({
    // 시험문제 리스트 실행
    listofTestQuiz: (testId, page, size) => dispatch(TestQuizActions.ListOfTestQuiz(testId, page, size)),

    // 학생이 제출하기 버튼을 클릭했을 때 생성되는 학생 답
    createStudentAnswer: (studentTestId, testQuizId, studentAnswer) => dispatch(StudentAnswerActions.CreateStudentAnswer(studentTestId, testQuizId, studentAnswer))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateStudentAnswer));