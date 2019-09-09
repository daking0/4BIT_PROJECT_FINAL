/**
 * List Of Student
 * @author: 황서영
 * 
 * @description: 
 * - 관리자가 가입된 학생 리스트 읽어오는 컴포넌트
 *
 *  @todo : 페이지네이션..
 *
 * */

import React,{useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { ManageActions } from '../../../Actions/ManageActions';
import PaginationComponent from '../../pagination/Pagination';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Col,
    UncontrolledTooltip
  } from "reactstrap";

const ListOfStudentByAdmin = ({items, listOfStudentByAdmin}) => {
    
    const {page, size} = items;

		const [studentlist, setStudentlist] = useState([]);
		
		

    useEffect(() => {
        if(studentlist !== undefined){
            if(studentlist.length === 0){
                listOfStudentByAdmin(page, size)
                .then(response => {
                    const {items} = response.payload.data;
                    setStudentlist(items);
                    
                })
            }
        }
    },[])

    return(
        <div className="content">

            <Col md="12">

              <Card>

                <CardHeader>
                  <CardTitle tag="h6">   학생 리스트</CardTitle>
                </CardHeader>

                <CardBody>
                  <Table>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-center">학생번호</th>
                        <th className="text-center">학생이름</th>
                        <th className="text-center">이메일</th>
                        <th className="text-center">연락처</th>
                        <th className="text-center">소속클래스</th>
												<th className="text-center">관리</th>
                      </tr>
                    </thead>
                    <tbody>
					{
						studentlist.map((student,index) => {
						  const { user , classGroup } = student;
						  const { username, name, email, phone } = user;
						  const { className } = classGroup;
						  return(
									<tr key = {index}>
									<td className="text-center">{username}</td>
									<td className="text-center">{name}</td>
									<td className="text-center">{email}</td>
									<td className="text-center">{phone}</td>
									<td className="text-center">{className}</td>
									<td className="text-center">
									  {/* <Button
										className="btn-icon"
										color="info"
										id="tooltip264453216"
										size="sm"
										type="button"
									  >
										<i className="fa fa-user" />
									  </Button>{" "}
									  <UncontrolledTooltip
										delay={0}
										target="tooltip264453216"
									  >
										Like
									  </UncontrolledTooltip> */}
									  <Button
										className="btn-icon"
										color="success"
										id="tooltip366246651"
										size="sm"
										type="button"
									  >
										<i className="fa fa-edit" />
									  </Button>{" "}
									  <UncontrolledTooltip
										delay={0}
										target="tooltip366246651"
									  >
										Edit
									  </UncontrolledTooltip>
									  <Button
										className="btn-icon"
										color="danger"
										id="tooltip476609793"
										size="sm"
										type="button"
									  >
										<i className="fa fa-times" />
									  </Button>{" "}
									  <UncontrolledTooltip
										delay={0}
										target="tooltip476609793"
									  >
										Delete
									  </UncontrolledTooltip>
									</td>
								  </tr>
								 );
						      })
					}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

        </div>
    );
}

const mapStateToProps = (state) => ({
    items : state.memberList.items
})

const mapDispatchToProps = (dispatch) => ({
    listOfStudentByAdmin : (page,size) => dispatch(ManageActions.ListOfStudentByAdmin(page,size))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ListOfStudentByAdmin));