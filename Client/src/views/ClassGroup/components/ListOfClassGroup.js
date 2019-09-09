/**
 * List Of ClassGroup
 * @author: 황서영
 * 
 * @description: 
 * - 관리자가 등록된 클래스 전체 읽어오는 컴포넌트
 *
 * */

import React,{useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { ManageActions } from '../../../Actions/ManageActions';
import moment from 'moment';

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

const ListOfClassGroup = ({items, listOfClassGroup}) => {
    
    const {page, size} = items;

    const [classlist, setClasslist] = useState([]);

    useEffect(() => {
        if(classlist !== undefined){
            if(classlist.length === 0){
                listOfClassGroup(page, size)
                .then(response => {
                    const {items} = response.payload.data;
                    setClasslist(items);
                    
                })
            }
        }
    },[])


    return(
            <div className = "content">
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h6"  style={{  fontFamily: "Nanum Myeongjo"}} >클래스 리스트</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table>
                    <thead className="text-primary">
                      <tr>
												<th className="text-center">과정코드</th>
                        <th className="text-center">클래스 이름</th>
                        <th className="text-center">소속 센터</th>
                        <th className="text-center">시작일</th>
                        <th className="text-center">종료일</th>
												{/* <th className="text-center">담당강사</th> */}
												<th className="text-center">관리</th>
                      </tr>
                    </thead>
                    <tbody>
					{
						classlist.map((classgroup,index) => {
						  const { classId, className, classStartDate, classEndDate, branch} = classgroup;
						  const { branchName } = branch;
							var time1 = classStartDate;
							var startDate = moment(time1).format('YYYY-MM-DD HH:mm')
							var time2 = classEndDate;
							var endDate = moment(time2).format('YYYY-MM-DD HH:mm')
                      return(
                        <tr key = {index}>
									<td className="text-center">{classId}</td>
									<td className="text-center">{className}</td>
									<td className="text-center">{branchName}</td>
									<td className="text-center">{startDate}</td>
									<td className="text-center">{endDate}</td>
									{/* <td className="text-center">{name}</td> */}
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
    items : state.classGroup.items
})

const mapDispatchToProps = (dispatch) => ({
    listOfClassGroup : (page,size) => dispatch(ManageActions.ListOfClassByAdmin(page,size))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ListOfClassGroup));