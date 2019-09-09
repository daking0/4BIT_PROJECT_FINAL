/**
 * Listof AttendLog
 * @author: 이중호
 * 
 * @description: 
 * */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AttendLogActions } from '../../../Actions';
import moment from 'moment';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

class ListofAttendLog extends React.Component {
  constructor(props) {
    super(props);
    // this.onChangeTitle = this.onChangeTitle.bind(this)
    // this.onChangeContent = this.onChangeContent.bind(this)
  }

  state = {
    items : "",
    page : "",
    size : ""
  }

  //컴포넌트 생성과정, render 전
  componentWillMount() {
    console.log("유저정보 :", this.props.user.userId)
    this.props.ListofAttendLog(1, 10,this.props.user.userId);
    // console.log("componentWil", this.props.boardId, "pro", this.state.boardId);
  }


  render() {
    console.log("유저정보 :", this.props.user.userId)
    

    // const {boardId} = this.props;
    // this.props.listofArticle(1,10,this.props.boardId)
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
                    <CardTitle tag="h4"  style={{  fontFamily: "Nanum Myeongjo"}}>{this.props.user.name}님의 출석현황</CardTitle>
                  </CardHeader>
                  <CardBody className="table-full-width table-hover">
                    <Table>
                      <thead  className="text-primary">
                        <tr>
                          <th className="text-center">출석상태</th>
                          <th className="text-center">출석일시</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.props.items.map((item, index) => {
                            const { eventName, eventAttendTime } = item;
                            let eventAttendTimeM = moment(eventAttendTime).format('YYYY-MM-DD HH:mm')
                            return (
                              <tr key={index}>
                                <td className="text-center"> {eventName} </td>
                                <td className="text-center"> {eventAttendTimeM} </td>
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

// ListofAttendLog 컴포넌트가 시작이 되면 밑의 두개의 메서드가 mapStateToProps 리듀서의 상태가 props에 ListofAttendLog의 상태로 들어감
// mapDispatchToProps 는 Action의 props로 들어감
const mapStateToProps = (state) => ({
  items: state.attendlogreducers.items,//리듀서의 index.js에서 지정해둔 이름으로 인식
  user: state.auth.userDetails
});

const mapDispatchToProps = (dispatch) => ({
  ListofAttendLog: (page, size,userId) => dispatch(AttendLogActions.ListofAttendLog(page, size,userId))
});
// ListofAttendLog : 맨 위의 컴포넌트 이름
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListofAttendLog));