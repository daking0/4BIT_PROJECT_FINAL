/**
 * Create Article
 * @author: hyeyoung
 * 
 * @description: 
 * 시험에서 신규문제 출제할 때 
 * 
 * @param : CreateQuiz(content, answer, eachScore, subject, chapter, level, answerType, explain)
 * 
 * */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { QuizActions } from '../../../Actions/QuizActions';
import Select from "react-select";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col, FormGroup, Input, Button } from "reactstrap";

class CreateQuiz extends React.Component {

    constructor(props) {
        super(props);
        // this.onCreateQuizChange = this.onCreateQuizChange.bind(this)
        this.onChangeContent = this.onChangeContent.bind(this)
        this.onChangeAnswer = this.onChangeAnswer.bind(this)
        this.onChangeExplain = this.onChangeExplain.bind(this)
        this.onChangeSubject = this.onChangeSubject.bind(this)
        this.onChangeChapter = this.onChangeChapter.bind(this)
        this.onChangeLevel = this.onChangeLevel.bind(this)
        this.onChangeAnswerType = this.onChangeAnswerType.bind(this)
        this.onChangeEachScore = this.onChangeEachScore.bind(this)

        // this.onSubmit = this.onSubmit.bind(this)
        this.state = { // 초기값 지정
            content: "",
            answer: "",
            eachScore: "",
            subject: "",
            chapter: "",
            level: "",
            answerType: "",
            explain: ""
        };
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("버튼" + e);
        this.setState({
            content: this.state.content,
            answer: this.state.answer,
            eachScore: this.state.eachScore,
            subject: this.state.subject,
            chapter: this.state.chapter,
            level: this.state.level,
            answerType: this.state.answerType,
            explain: this.state.explain
        })

        this.props.createQuiz(this.state.content, this.state.answer, this.state.eachScore, this.state.subject, this.state.chapter, this.state.level, this.state.answerType, this.state.explain)
            .then(response => { alert("문제 추가 성공!") });

    }

    // 과목
    onChangeSubject(e) {

        this.setState({
            subject: e.value
        });
    }
    // 챕터
    onChangeChapter(e) {

        this.setState({
            chapter: e.target.value
        });
    }
    // 난이도
    onChangeLevel(e) {
        this.setState({
            level: e.value
        });
    }
    // 문제유형
    onChangeAnswerType(e) {
        this.setState({
            answerType: e.value
        });
    }
    // 배점
    onChangeEachScore(e) {
        this.setState({
            eachScore: e.value
        });
    }
    // 내용
    onChangeContent(e) {
        e.preventDefault();
        this.setState({
            content: e.target.value
        });
    }
    // 답
    onChangeAnswer(e) {
        e.preventDefault();
        this.setState({
            answer: e.target.value
        });
    }
    // 해설
    onChangeExplain(e) {
        e.preventDefault();
        this.setState({
            explain: e.target.value
        });
    }



    render() {
        this.createQuiz = this.createQuiz;
        const { content, answer, eachScore, subject, chapter, level, answerType, explain, history } = this.state;


        return (
            <div className="QuizInput">
                {this.state.alert}
                <Row>
                    <Col>
                        <Card style={{ fontSize: "13px", marginLeft: "15px", fontFamily: "Nanum Myeongjo" }}>
                            <CardHeader>
                                <CardTitle tag="h4">신규 문제 추가</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Col >
                                    <FormGroup>
                                        <Select
                                            classNamePrefix="react-select"
                                            name="subject"
                                            value={this.state.subject}
                                            onChange={(e) => this.onChangeSubject(e)}
                                            defaultValue="과목"
                                            options={[
                                                { value: "default", labal: "과목", isDisabled: true },
                                                { value: "java", label: "java" },
                                                { value: "database", label: "database" },
                                                { value: "web", label: "web" }
                                            ]}
                                            placeholder={this.state.subject}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="text" value={this.state.chpater} onChange={this.onChangeChapter} className="form-control" placeholder="챕터" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Select
                                            name="level"
                                            value={this.state.level}
                                            onChange={(e) => this.onChangeLevel(e)}
                                            defaultValue={"default"}
                                            options={[
                                                { value: "default", labal: "난이도", isDisabled: true },
                                                { value: "상", label: "상" },
                                                { value: "중", label: "중" },
                                                { value: "하", label: "하" }
                                            ]}
                                            placeholder={this.state.level}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Select
                                            name="answerType"
                                            // value={this.state.answerType}
                                            labal={this.state.answerType}
                                            onChange={(e) => this.onChangeAnswerType(e)}
                                            defaultValue={'default'}
                                            options={[
                                                { value: "default", labal: "문제유형", isDisabled: true },
                                                { value: 0, label: "주관식" },
                                                { value: 1, label: "객관식" }
                                            ]}
                                            placeholder={this.state.answerType}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Select name="eachScore"
                                            value={this.state.eachScore}
                                            onChange={(e) => this.onChangeEachScore(e)}
                                            defaultValue={'default'}
                                            options={[
                                                { value: "default", labal: "문제점수", isDisabled: true },
                                                { value: 5, label: 5 },
                                                { value: 10, label: 10 }
                                            ]}
                                            placeholder={this.state.eachScore}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="text" value={this.state.answer} onChange={this.onChangeAnswer} className="form-control" placeholder="정답" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" value={this.state.content} onChange={this.onChangeContent} className="form-control" placeholder="문제 내용" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" value={this.state.explain} onChange={this.onChangeExplain} className="form-control" placeholder="문제 해설" />

                                    </FormGroup>
                                    <Button onClick={e => this.onSubmit(e)}>
                                        문제출제
                                    </Button>

                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    quiz: state.quizReducers.items,

});

const mapDispatchToProps = (dispatch) => ({
    createQuiz: (content, answer, eachScore, subject, chapter, level, answerType, explain) => dispatch(QuizActions.CreateQuiz(content, answer, eachScore, subject, chapter, level, answerType, explain))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateQuiz));
