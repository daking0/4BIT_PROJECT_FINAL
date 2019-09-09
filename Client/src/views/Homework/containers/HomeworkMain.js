/**
 * Homework Main
 * @author: 영빈
 * */

import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from "react-redux";
import { ListOfHomework } from '../HomeworkIndex';
import { HomeworkActions } from '../../../Actions/HomeworkActions';
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Container, Button } from "reactstrap";

class HomeworkMain extends React.Component {
  constructor(props) {
    super(props);
    // this.CompareUser = this.CompareUser.bind(this)
  }

  // 현재 user의 권한과 게시판 권한 비교
  CompareUser = () => {
    if (this.props.user.role.roleCode === "role_teacher") { //권한해당하면
      return false //버튼 보여줌
    } else {
      return true
    }
  }

  render() {
    const nameOfUser = this.props.user.name;
    const pointOfUser = this.props.user.pointSum;
    // const userName = this.props.user.
    return (
      <div className="content" >
        <Row>
          <Col md="2">
            <Button color="warning" hidden={this.CompareUser()} onClick={e => this.props.history.push("/teacher/class/assignment/write")} >
              <span className="btn-label">
                <i className="nc-icon nc-simple-add" />
              </span>
              과제 출제
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
          <ListOfHomework />
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
  listOfHomework: (page, size) => dispatch(HomeworkActions.ListOfHomework(page, size))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeworkMain));
