/**
 * Update Article
 * @author: chaeyeon
 * 
 * @description: 
 * -시험 수정
 * 
 * @param:
 * updateTestGroup(testId, testName, testStartTime, testEndTime, testDescription)
 * 
 * */

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { TestGroupActions } from '../../../Actions/TestGroupActions';
// import { ListofQuiz } from '../../Quiz/QuizIndex'
import { QuizActions } from '../../../Actions/QuizActions';
import { TestQuizActions } from '../../../Actions/TestQuizActions';
import ReactDatetime from "react-datetime";
import moment, { isMoment } from 'moment';



import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Button
} from "reactstrap";

// function useFormInput(initialValue) {
//     const [value, setValue] = useState(initialValue);
//     const onChange = (e) => setValue(e.target.value);
//     return {
//         value,
//         onChange
//     }
// }

// const UpdateTestGroup = ({ data, updateTestGroup, listOfTestGroup, history }) => {
//     const { testId, testName, testStartTime, testEndTime, testDescription } = data;
//     console.log("시험번호 : " + testId);

//     const name = useFormInput(testName)
//     const startTime = useFormInput(testStartTime)
//     const endTime = useFormInput(testEndTime)
//     const description = useFormInput(testDescription)


//     const onSubmit = (e) => {
//         e.preventDefault();
//         const testName = name.value;
//         const testStartTime = startTime.value;
//         const testEndTime = endTime.value;
//         const testDescription = description.value;

//         updateTestGroup(testId, testName, testStartTime, testEndTime, testDescription)
//             .then(response => {
//                 listOfTestGroup(1, 10)
//             })
//             .then(response => {
//                 history.push(`/teacher/class/test/testId=${testId}`);
//             })
//     };

//     return (
//         <div className="TestGroupUpdate">
//             <Row>
//                 <Col>
//                     <Card>
//                         <CardHeader>
//                             <CardTitle tag="h4">시험</CardTitle>
//                         </CardHeader>
//                         <CardBody>
//                             <Form onSubmit={e => onSubmit(e)}>

//                                 <FormGroup className="has-success">
//                                     시험 이름 : <Input type="textarea" {...name} />
//                                 </FormGroup>

//                                 <FormGroup>
//                                     시작 시간 : <Input type="datetime-local" {...startTime} />
//                                 </FormGroup>
//                                 <FormGroup>
//                                     종료 시간 : <Input type="datetime-local" {...endTime} />
//                                 </FormGroup>
//                                 <FormGroup className="has-success">
//                                     시험 설명 : <Input type="textarea"{...description} />
//                                 </FormGroup>
//                                 <Button >확인</Button>
//                             </Form>
//                         </CardBody>
//                     </Card>
//                 </Col>
//             </Row>
//         </div>
//     );
// }

class UpdateTestGroup extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    state = {
        testName: this.props.data.testName,
        testStartTime: this.props.data.testStartTime,
        testEndTime: this.props.data.testEndTime,
        testDescription: this.props.data.testDescription
    }

    handlingChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeTestStartTime(value) {
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


    onSubmit(e) {
        e.preventDefault();

        this.state.testDescription = this.state.testDescription.replace(/(?:\r\n|\r|\n)/g, '<br/>');

        this.props.updateTestGroup(this.props.data.testId, this.state.testName, this.state.testStartTime, this.state.testEndTime, this.state.testDescription)
            .then(response => {
                this.props.retrieveTestGroup(this.props.data.testId);
            })
            .then(response => {
                this.props.history.push(`/teacher/testId=${this.props.data.testId}`);
            })
    }

    render() {
       
        return (
            <div className="TestGroupUpdate">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                            <CardHeader tag="h4"  style={{  fontFamily: "Nanum Myeongjo"}}>시험 수정</CardHeader>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={e => this.onSubmit(e)}>
                                    <FormGroup className="has-success">
                                        시험 이름 <br />
                                        <Input type="text" name="testName" value={this.state.testName} onChange={this.handlingChange} />
                                    </FormGroup>

                                    <FormGroup>
                                        시작 시간 <br />
                                        <ReactDatetime
                                            dateFormat={"YYYY-MM-DD"}
                                            timeFormat={"HH:mm:ss"}
                                            value={moment(this.state.testStartTime)}
                                            onChange={(value) => this.onChangeTestStartTime(value)}
                                            inputProps={{
                                                className: "form-control",
                                                placeholder: "시작시간 선택",
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        종료 시간 <br />
                                        <ReactDatetime
                                            dateFormat={"YYYY-MM-DD"}
                                            timeFormat={"HH:mm:ss"}
                                            value={moment(this.state.testEndTime)}
                                            onChange={(value) => this.onChangeTestEndTime(value)}
                                            inputProps={{
                                                className: "form-control",
                                                placeholder: "종료시간 선택",
                                            }}
                                        />
                                    </FormGroup>

                                    <FormGroup className="has-success">
                                        시험 설명 <br />
                                        <Input type="textarea"
                                         name="testDescription"
                                         value={this.state.testDescription}
                                         onChange={this.handlingChange} />
                                    </FormGroup>
                                    <Button>
                                        <span class="btn-label">
                                            <i class="nc-icon nc-check-2"></i>
                                        </span>
                                        확인
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.testgroupreducers.datas
});

const mapDispatchToProps = (dispatch) => ({
    updateTestGroup: (testId, name, startTime, endTime, description) => dispatch(TestGroupActions.UpdateTestGroup(testId, name, startTime, endTime, description)),
    retrieveTestGroup: (testId) => dispatch(TestGroupActions.RetrieveTestGroup(testId)),
    listofQuiz: (page, size) => dispatch(QuizActions.ListofQuiz(page, size))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateTestGroup));