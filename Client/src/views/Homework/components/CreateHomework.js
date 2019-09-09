/**
 * Create Homework
 * @author: 영빈
 * */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { HomeworkActions } from '../../../Actions/HomeworkActions';
import ToastEditor from "../../../utils/TextEditor/ToastEditor";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Container, Form, FormGroup, Input, Label, Button } from "reactstrap";
import ReactDatetime from "react-datetime";
import moment, { isMoment } from 'moment';
import Select from "react-select";

class CreateHomework extends Component {
  constructor(props) {
    super(props);
    this.onChangeHwName = this.onChangeHwName.bind(this)
    this.onChangeHwDescription = this.onChangeHwDescription.bind(this)
    this.onChangeHomeworkEndTime = this.onChangeHomeworkEndTime.bind(this)
    this.onChangeHwSubject = this.onChangeHwSubject.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  state = {
    hwName: "",
    hwDescription: "",
    homeworkEndTime: "",
    hwSubject: ""
  }

  onChangeHomeworkEndTime(value) {
    let homeworkEndTime;
    if (isMoment(value)) {
      homeworkEndTime = value.format();
    } else {
      homeworkEndTime = moment(value).format();
    }
    this.setState({
      homeworkEndTime: homeworkEndTime
    });
  }

  onSubmit(e, hwDescription) {
    this.setState({
      hwName: this.state.hwName,
      hwDescription: this.state.hwDescription,
      homeworkEndTime: this.state.homeworkEndTime,
      hwSubject: this.state.hwSubject
    });

    if (hwDescription.length > 0) {
      this.props.createHomework(this.state.hwName, hwDescription, this.state.homeworkEndTime, this.state.hwSubject)
        .then(response => {
          this.props.history.push("/teacher/class/assignment/list");
        })
    }
  };

  // 제목(과제명)
  onChangeHwName(e) {
    e.preventDefault();
    this.setState({
      hwName: e.target.value
    });
  }

  // 과목
  onChangeHwSubject(e) {
    this.setState({
      hwSubject: e.value
    });
  }

  // 내용
  onChangeHwDescription(e, hwDescription) {
    console.log('onChangeHwDescription에 들어온 hwDescription: ' + hwDescription)
    this.setState({
      hwDescription: e.target.value
    });
    this.onSubmit(e, hwDescription);
  }

  render() {
    this.createHomework = this.createHomework;
    const { hwName, hwDescription, hwSubject, homeworkEndTime } = this.state;

    return (
      <div className="content">
        <div className="HomeworkInput">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h5>과제 출제하기</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={e => this.onSubmit(e)}>
                    <FormGroup>
                      <Row>
                        <Col>
                          제출기한 <br />
                          <ReactDatetime
                            dateFormat={"YYYY-MM-DD"}
                            timeFormat={"HH:mm"}
                            value={moment(this.state.homeworkEndTime)}
                            onChange={(value) => this.onChangeHomeworkEndTime(value)}
                            inputProps={{
                              className: "form-control",
                              placeholder: "제출기한을 입력하세요",
                            }} />
                        </Col>
                        <Col>
                          과목<br />
                          <Select
                            name="subject"
                            value={this.state.hwSubject}
                            onChange={(e) => this.onChangeHwSubject(e)}
                            options={[
                              { value: "JAVA", label: "JAVA" },
                              { value: "Python", label: "Python" },
                              { value: "Javascript", label: "Javascript" }
                            ]}
                            placeholder={this.state.hwSubject}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup className="has-success">
                      제목 <br />
                      <Input type="text" value={this.state.hwName} onChange={this.onChangeHwName} placeholder="과제명(제목)을 입력하세요" />
                    </FormGroup>
                    <FormGroup className="has-success">
                      내용 <br />
                      <ToastEditor
                        content={hwDescription}
                        onChange={this.onChangeHwDescription}
                      />
                    </FormGroup>
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

const mapDispatchToProps = (dispatch) => ({
  createHomework: (hwName, hwDescription, homeworkEndTime, hwSubject) => dispatch(HomeworkActions.CreateHomework(hwName, hwDescription, homeworkEndTime, hwSubject))
});

export default withRouter(connect(null, mapDispatchToProps)(CreateHomework));