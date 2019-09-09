/**
 * Read My Point Log
 * @author: 황서영
 * 
 * @description: 
 * - 학생이 본인 포인트 로그 확인하는 컴포넌트
 * 
 * */


import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { PointLogActions } from '../../../Actions/PointLogActions';
import PaginationComponent from '../../pagination/Pagination';
import moment from 'moment';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col
  } from "reactstrap";


class ReadMyPointLog extends React.Component{
  constructor(props){
    super(props);
}
  state = {
    page : 1,
    size : 15,
    totalCount : 0
  }

  componentWillMount() {
    console.log(this.props.match.params.page)
    const requestPage = this.props.match.params.page === null? 1 : this.props.match.params.page;
    this.props.readPointLog(this.props.user.userId,requestPage,15)
  }

  render(){
    return(
      <div className ="content">
        <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <div className="content">
                <Row>
                  <Col md="12">
                    <Card>
                    <CardHeader>
                        <h5 className="title"  style={{  fontFamily: "Nanum Myeongjo"}}>내 포인트 현황</h5> 
                        <p className="text-primary">
                       총 획득 포인트 : {this.props.user.pointSum}
                    </p>
                    </CardHeader>
                      <CardBody className="table-full-width table-hover">
                        <Table >
                          <thead className="text-primary">
                            <tr>
                        {/* <th className="text-center">No</th> */}
                        <th className="text-center">시간</th>
                        <th className="text-center">포인트</th>
                        <th className="text-center">내용</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.items.map((item, index) => {
                        const { pointEventTime, pointAdded, pointFrom } = item;
                        var time = pointEventTime;
                        var pointEventTimeView = moment(time).format('YYYY-MM-DD HH:mm')
                        return (
                            <tr key={index}>
                                {/* <td className="text-center">{index+1}</td> */}
                                <td className="text-center">{pointEventTimeView}</td>
                                <td className="text-center">{pointAdded}</td>
                                <td className="text-center">{pointFrom}</td>
                            </tr>
                        );
                    })}
                </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <PaginationComponent baseUrl={'/student/mypage/point'} page={this.props.data.page} size={this.props.data.size} totalCount={this.props.data.totalCount} />
        </div>

        </CardBody>
        </Card>
        </Col>
      
            

        </Row>
        </div>
    );
  }

}

// function checkHasProp(prop) {
//     return (prop !== undefined && prop !== null);
// }

// function checkArrayProp(prop) {
//     return checkHasProp(prop) && Array.isArray(prop);
// }

// const ReadMyPointLog = ({ location, data, user, readPointLog }) => {
//     const [pointlog, setPointlog] = useState(data);

//     const params = new URLSearchParams(location.search);
//     const requestPage = (params.get("page") === null ? 1 : parseInt(params.get("page"), 10));

//     const { userId } = user;
//     const { page, size, totalCount, items } = pointlog;

//     useEffect(() => {
//         if (!checkHasProp(pointlog) || page !== requestPage) {
//             readPointLog(userId, requestPage, size)
//                 .then(response => {
//                     setPointlog(response.payload.data);
//                 })
//         }
//     })

//     return (
//         <div className ="content">
//         <Row>
//         <Col md="12">
//           <Card>
//             <CardBody>
//               <div className="content">
//                 <Row>
//                   <Col md="12">
//                     <Card>
//                     <CardHeader>
//                         <h5 className="title">내 포인트 현황</h5>
//                     </CardHeader>
//                       <CardBody className="table-full-width table-hover">
//                         <Table responsive>
//                           <thead>
//                             <tr>
//                         <th>시간</th>
//                         <th>포인트</th>
//                         <th>내용</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {checkArrayProp(items) ? items.map((item, index) => {
//                         const { pointEventTime, pointAdded, pointFrom } = item;
//                         var time = pointEventTime;
//                         var pointEventTimeView = moment(time).format('YYYY-MM-DD HH:mm')
//                         return (
//                             <tr key={index}>
//                                 <td >{pointEventTimeView}</td>
//                                 <td >{pointAdded}</td>
//                                 <td >{pointFrom}</td>
//                             </tr>
//                         );
//                     }) : ('')}
//                 </tbody>
//                   </Table>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//           <PaginationComponent baseUrl={'/mypage/point'} page={page} size={size} totalCount={totalCount} />
//         </div>

//         </CardBody>
//         </Card>
//         </Col>
      
            

//         </Row>
//         </div>
//     );
// }

const mapStateToProps = (state) => ({
    data: state.pointlog,
    user: state.auth.userDetails
});

const mapDispatchToProps = (dispatch) => ({
    readPointLog: (userId, page, size) => dispatch(PointLogActions.ReadPointLog(userId, page, size))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadMyPointLog));