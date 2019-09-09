/**
 * Ended Homework Main
 * @author: 영빈
 * */

import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from "react-redux";
import { ListOfEndedHomework } from '../HomeworkIndex';
import { HomeworkActions } from '../../../Actions/HomeworkActions';
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Container, Button } from "reactstrap";

class EndedHomeworkMain extends React.Component {
  constructor(props) {
    super(props);
    // this.CompareUser = this.CompareUser.bind(this)
  }

  //현재 user의 권한과 게시판 권한 비교
  // CompareUser = () => {
  //   if (this.props.user.role.roleCode === "role_teacher") { //권한해당하면
  //     return false //버튼 보여줌
  //   } else {
  //     return true
  //   }
  // }

  render() {
    return (
      <div className="content" >
        <Row>
          <Col>
          <ListOfEndedHomework />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  datas: state.homeworkreducers.datas,
  user: state.auth.userDetails
})

const mapDispatchToProps = (dispatch) => ({
  listOfEndedHomework: (page, size) => dispatch(HomeworkActions.ListOfEndedHomework(page, size))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EndedHomeworkMain));
