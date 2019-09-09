/**
 * Read Counsel Student List
 * @author: 황서영
 * 
 * @description: 
 * - 강사 학생현황 페이지에 담당 반 학생들 리스트가 나오는 컴포넌트
 * 
 * @param:
 * 
 * 
 * */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {CounselActions} from '../../../Actions/CounselActions';
import PaginationComponent from '../../pagination/Pagination';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    UncontrolledTooltip,
    Button
  } from "reactstrap";

class ListOfCounselStudent extends React.Component{
    constructor(props){
        super(props);
        this.readCounselHandler = this.readCounselHandler.bind(this)

    }

    state = {
        page : 1,
        size : 10,
        totalCount : 0,
        studentId : ''
    }

    componentWillMount() {
        const requestPage = (this.props.match.params.page === null? 1 : this.props.match.params.page);
        this.props.readCounselStudentList(requestPage,5)
      }

    readCounselHandler = (e,studentId) => {
        // e.stopPropagation();
        e.preventDefault();
        this.props.readCounsel(studentId)
        .then(response => {
            this.props.history.push("/teacher/studentstatus/view");
          })

    }

    render(){

        return(
            <>
                <div className="content">
                    <Row>
                    <Col md="10">
                        <Card>
                        <CardBody>
                            <Card>
                            <CardHeader>
                                <CardTitle tag="h5"  style={{  fontFamily: "Nanum Myeongjo"}}>클래스 학생 목록</CardTitle>
                            </CardHeader>
                            <CardBody className="table-full-width table-hover">
                                <Table>
                                <thead  className="text-primary">
                                    <tr>
                                    <th className="text-center">학생 번호</th>
                                    <th className="text-center">학생 이름</th>
                                    <th className="text-center">로드맵 마지막단계</th>
                                    <th className="text-center">상담내역 확인</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                this.props.datas.items.map((student,index) => {
                                const { user, studentId, roadmapLast } = student;
                                const { username, name } = user;
                                return(
                                    <tr key = {index}>
                                        <td  className="text-center" onClick={e => this.readCounselHandler(e,studentId)}>{username}</td>
                                        <td  className="text-center" onClick={e => this.readCounselHandler(e,studentId)}>{name}</td>
                                        <td  className="text-center" onClick={e => this.readCounselHandler(e,studentId)}>{roadmapLast}단계</td>
                                        <td  className="text-center" onClick={e => this.readCounselHandler(e,studentId)}>
                                        <Button
										className="btn-icon"
										color="success"
										id="tooltip366246651"
										size="sm"
                                        type="button"
                                        onClick={e => this.readCounselHandler(e,studentId)}
									  >
										<i className="fa fa-edit" />
									  </Button>{" "}
									  <UncontrolledTooltip
										delay={0}
										target="tooltip366246651"
									  >
										Edit
									  </UncontrolledTooltip></td>
                                        </tr>
                                        );
                                    })
                                    }
                                </tbody>
                                </Table>
                            </CardBody>
                            </Card>
                            <PaginationComponent baseUrl={'/teacher/study/studentstatus'} page={this.props.datas.page} size={this.props.datas.size} totalCount={this.props.datas.totalCount} />
                        </CardBody>
                        </Card>
                    </Col>
                    </Row>
                </div >
        </>
        );
    }
}

// const ListOfCounselStudent = ({ studentDatas, readCounselStudentList, readCounsel, history}) => {

//     const{ page, size } = studentDatas;
//     const [studentdatas, setStudents] = useState([]);

//     useEffect(() => {
//         if(studentdatas !== undefined){
//             if(studentdatas.length === 0){
//                 readCounselStudentList(page, size)
//                 .then(response => {
//                     const {items} = response.payload.data;
//                     setStudents(items);
//                 })
//             }
//         }
//     })

//     const readCounselHandler = (e,studentId) => {
//         e.stopPropagation();
//         readCounsel(studentId)
//         .then(response => {
//             history.push("/study/studentstatus/view");
//           })

//     }

//     return(
//         <table className="table table-bordered">
//             <thead>
//                 <tr>
//                     <th>학생번호</th>
//                     <th>학생이름</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                   studentdatas.map((student,index) => {
//                       const { user, studentId } = student;
//                       const { username, name } = user;
//                       return(
//                         <tr key = {index}>
//                             <td onClick={e => readCounselHandler(e,studentId)}>{username}</td>
//                             <td onClick={e => readCounselHandler(e,studentId)}>{name}</td>
//                         </tr>
//                       );
//                   })
//                 }
//             </tbody>
//         </table>
//     );
// }

const mapStateToProps = (state) => ({
    datas : state.counsel
})

const mapDispatchToProps = (dispatch) => ({
    readCounselStudentList : (page, size) => dispatch(CounselActions.ReadCounselStudentList(page, size)),
    readCounsel : (studentId) => dispatch(CounselActions.ReadCounsel(studentId))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ListOfCounselStudent));