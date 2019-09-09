/**
 * List Of Ended Homework
 * @author: 영빈
 * */

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomeworkActions } from '../../../Actions/HomeworkActions';
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Container } from "reactstrap";

class ListOfEndedHomework extends React.Component {
  constructor(props) {
    super(props);
    this.retrieveHomeworkHandler = this.retrieveHomeworkHandler.bind(this)
    // this.CompareUser = this.CompareUser.bind(this)
  }

  state = {
    // boardId: ""
  }

  // 컴포넌트 생성과정, render 전
  componentWillMount() {
    this.props.listOfEndedHomework(1, 10);
  }

  retrieveHomeworkHandler = (e, hwId) => {
    e.stopPropagation();
    this.props.retrieveHomework(hwId)
      .then(response => {
        console.log('>>>>>>>>>>>>>>>', response);
        if (this.props.user.role.roleCode === "role_teacher") {
        this.props.history.push("/teacher/class/assignment/view/" + hwId);
        } else {
          this.props.history.push("/student/class/assignment/view/" + hwId);
        }
      });
  };

  //현재 user의 권한과 게시판 권한 비교
  CompareUser = () => {
    if (this.props.user.role.roleCode === "role_teacher") { //권한해당하면
      return false //버튼 보여줌
    } else {
      return true
    }
  }

  render() {
    console.log('ListOfEndedHomework.js의 render()에 진입함')

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                {/* <Row>
                    <Col md="12"> */}
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4" style={{  fontFamily: "Nanum Myeongjo"}} >지난 과제 목록</CardTitle>
                  </CardHeader>
                  <CardBody className="table-full-width table-hover">
                    <Table>
                      <thead className="text-primary">
                        <tr>
                          <th className="text-center">과제번호</th>
                          <th className="text-center">과제명</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.props.items.map((item, index) => {
                            const { hwId, hwName } = item;
                            return (
                              <tr key={index}>
                                <td className="text-center" onClick={e => this.retrieveHomeworkHandler(e, hwId)}> {hwId} </td>
                                <td className="text-center" onClick={e => this.retrieveHomeworkHandler(e, hwId)}> {hwName} </td>
                              </tr>
                            );
                          })
                        }
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.homeworkreducers.items//리듀서의 index.js에서 지정해둔 이름으로 인식
  , datas: state.homeworkreducers.data,
  user: state.auth.userDetails
});

const mapDispatchToProps = (dispatch) => ({
  retrieveHomework: (hwId) => dispatch(HomeworkActions.RetrieveHomework(hwId))
  , listOfEndedHomework: (page, size) => dispatch(HomeworkActions.ListOfEndedHomework(page, size))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListOfEndedHomework));






