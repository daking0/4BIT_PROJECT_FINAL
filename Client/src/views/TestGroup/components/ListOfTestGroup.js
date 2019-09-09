/**
 * listOfTestGroup
 * @author: chaeyeon
 * 
 * @description: 
 * -반별 시험 진행 중 전체 출력
 * 
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TestGroupActions } from '../../../Actions/TestGroupActions';
import { Moment } from "moment";
import moment from 'moment';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container
} from "reactstrap";

// 진행 중이거나 진행 예정인 시험 리스트를 출력한다
// const ListOfTestGroup = ({ item, user, retrieveTestGroup, history }) => {

//   const { role } = user;
//   const { roleCode } = role;
//   console.log(roleCode);
//   console.log(role.roleCode);

//   const retrieveHandler = (e, testId) => {
//     if (role.roleCode === "role_teacher") {
//       e.stopPropagation();
//       retrieveTestGroup(testId)
//         .then(response => {
//           console.log(response);
//           history.push(`/teacher/testid=${testId}`);
//         });
//     } else {
//       e.stopPropagation();
//       retrieveTestGroup(testId)
//         .then(response => {
//           console.log(response);
//           history.push(`/testId=${testId}`);
//         });
//     }

//   };

//   return (
//     <div className="content">
//       <Row>
//         <Col>
//           <Card>
//             <CardBody>
//               <Table responsive>
//                 <thead>
//                   <tr>
//                     <th>시험 이름</th>
//                     <th>시작 시간</th>
//                     <th>종료 시간</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {
//                     item.map((item, index) => {
//                       const { testId, testName, testStartTime, testEndTime } = item;
//                       return (
//                         <tr key={index}>
//                           <td onClick={e => retrieveHandler(e, testId)}> {testName} </td>
//                           <td> {moment(testStartTime).format('YYYY-MM-DD HH:mm')} </td>
//                           <td> {moment(testEndTime).format('YYYY-MM-DD HH:mm')} </td>
//                         </tr>
//                       );
//                     })
//                   }
//                 </tbody>
//               </Table>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

class ListOfTestGroup extends React.Component {

  constructor(props) {
    super(props);
    this.retrieveHandler = this.retrieveHandler.bind(this);
  }

  retrieveHandler = (e, testId) => {
    if (this.props.user.role.roleCode === "role_teacher") {
      e.stopPropagation();
      this.props.retrieveTestGroup(testId)
        .then(response => {
          console.log(response);
          this.props.history.push(`/teacher/testid=${testId}`);
        });
    } else {
      e.stopPropagation();
      this.props.retrieveTestGroup(testId)
        .then(response => {
          console.log(response);
          this.props.history.push(`/student/testId=${testId}`);
        });
    }
  };

  render() {
    return (
      <div className="content">
        <Row>
        <Col md="12">
            <Card>
            <CardBody className="table-full-width table-hover">
                <Table responsive>
                  <thead  className="text-primary">
                    <tr>
                      <th className="text-center">시험 이름</th>
                      <th className="text-center">시작 시간</th>
                      <th className="text-center">종료 시간</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      this.props.item.map((item, index) => {
                        const { testId, testName, testStartTime, testEndTime } = item;
                        return (
                          <tr key={index}>
                            <td className="text-center" onClick={e => this.retrieveHandler(e, testId)}> {testName} </td>
                            <td className="text-center" onClick={e => this.retrieveHandler(e, testId)}> {moment(testStartTime).format('YYYY-MM-DD HH:mm')} </td>
                            <td className="text-center" onClick={e => this.retrieveHandler(e, testId)}> {moment(testEndTime).format('YYYY-MM-DD HH:mm')} </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  // 진행 중/진행 예정 시험들에 대한 정보를 얻기 위한 리듀서
  item: state.testgroupreducers.items,
  
  // role_code를 얻기 위한 리듀서 >> role_code에 따라 경로가 다르다
  user: state.auth.userDetails //현재 user의 userDetails
});

const mapDispatchToProps = (dispatch) => ({
  // 해당 시험 상세보기
  retrieveTestGroup: (testId) => dispatch(TestGroupActions.RetrieveTestGroup(testId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListOfTestGroup));
