/**
 * Update Homework
 * @author: 영빈
 * */

import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { HomeworkActions } from '../../../Actions/HomeworkActions';
import ToastEditor from "../../../utils/TextEditor/ToastEditor";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Container, Form, FormGroup, Input, Label, Button } from "reactstrap";

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);
  return {
    value,
    onChange
  }
}

const UpdateHomework = ({ data, updateHomework, retrieveHomework, match, history }) => {
  const { hwId, hwName, hwDescription } = data;

  const HwNames = useFormInput(hwName) //초기값으로 기존에 저장된 데이터를 넣어준다
  const HwDescriptions = useFormInput(hwDescription)

  const onSubmit = (e) => {
    e.preventDefault();
    const hwName = HwNames.value;
    const hwDescription = HwDescriptions.value;

    if (hwDescription.length > 0) {
      updateHomework(hwId, hwName, hwDescription)
        .then(response => {
          retrieveHomework(hwId)
            .then(response => {
              console.log('>>>>>>>>>>>>>', response);
              history.push("/teacher/class/assignment/view/" + hwId);
            });
        })
    }

    console.log('hwName: ' + hwName)
  };

  return (
    <div className="content">
      <div className="HomeworkInput">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5>과제 수정하기</h5>
              </CardHeader>

              <CardBody>
                <Form onSubmit={e => onSubmit(e)}>
                  <FormGroup>
                    <FormGroup className="has-success">
                      <Input value={hwName}  {...HwNames} type="text" />
                    </FormGroup>
                    {/* <FormGroup className="has-success">
                      <ToastEditor content={hwDescription} onChange={onSubmit}/>
                    </FormGroup> */}
                    <FormGroup className="has-success">
                      <Input value={hwDescription}  {...HwDescriptions} type="textarea" />
                    </FormGroup>
                    <Button color="success">
                      <span className="btn-label">
                        <i className="nc-icon nc-check-2" />
                      </span>
                      확인
                  </Button>
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


const mapStateToProps = (state) => ({
  data: state.homeworkreducers.data  //현재 homeworkreducers 상태 내의 datas를 가져와서 datas라는 이름으로 사용
});

const mapDispatchToProps = (dispatch) => ({
  updateHomework: (hwId, hwName, hwDescription) => dispatch(HomeworkActions.UpdateHomework(hwId, hwName, hwDescription))
  , retrieveHomework: (hwId) => dispatch(HomeworkActions.RetrieveHomework(hwId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateHomework));


