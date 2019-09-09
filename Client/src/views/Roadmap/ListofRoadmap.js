/**
 * Listof Roadmap
 * @author: SEONGHYEON
 * 
 * @description: 
 * -현재 선택한 게시판에 해당하는 모든 게시물 목록을 출력 (현재는 roadmapStageNo,roadmapSubject,roadmapChapter 출력)
 * RoadmapMain.js에서 import하여 사용 (이 컴포넌트 자체로는 사용되지 않고있음)
 * 
 * @param:
 * RetrieveRoadmap(roadmapStageNo) -목록 선택시 해당 게시물의 내용을 보여준다
 * 
 * */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RoadmapActions } from '../../Actions/RoadmapActions';
import { MyInfoActions } from '../../Actions/MyInfoActions';
import { Retrieve } from './Retrieve.css';

import {
  Badge,
  Card,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Row,
  Col
} from "reactstrap";

const ListofRoadmap = ({ items,info, retrieveRoadmap, listofRoadmap, getstudentprofile,getlastRoadmap, history, user, lastresult }) => {
  
  useEffect(() => {
    console.log("dd")
    listofRoadmap();
    getstudentprofile(user.userId)
    getlastRoadmap(user.userId)
  }, []);

  // useEffect(() => {
  //   console.log("dd")
  //   listofRoadmap()
  //   .then(response=>{
  //     getstudentprofile(user.userId)
  //   })
  //   // .then(response=>{
  //   //   getlastRoadmap(user.userId)
  //   // })
    
  // }, []);

  // useEffect(() => {
  //   console.log("dd")
  //   getlastRoadmap(user.userId)
  //   .then(response=>{
  //     listofRoadmap()
  //   })
  //   .then(response=>{
  //     getstudentprofile(user.userId)
  //   })
    
  // }, []);

  

  const { userId } = user; //현재 로그인 유저의 userId

  const retrieveHandler = (e, roadmapStageNo) => {
    e.stopPropagation();
    
    if(roadmapStageNo <= info.roadmapLast){
    retrieveRoadmap(roadmapStageNo)
      .then(response => {
        const url = "/student/roadmap/" + roadmapStageNo;
        console.log('>>>>>>>>>>>>>>>>>>', response);
        history.push(url);
      });
    }else {
      alert("Stage"+info.roadmapLast+"를 먼저 풀고 도전하세요");
    }
  };

  // const colorhandler =(roadmapStageNo) =>{
  //   if(lastresult <= roadmapStageNo){
  //     return style={{backgroundColor:"red"}}
  //   }
  // }

  // console.log("뭐니",colorhandler(1))

const a= () =>{ return {backgroungColor:'red'}}

  return (
    <>
      <div className="content">
        <div className="header text-center" style={{marginRight:"250px"}}>
          <h2 className="title">Roadmap</h2>
        </div>
        <Row>
          <Col md="1"></Col>
          <Col md="8">
            <Card className="card-timeline card-plain">
              <CardBody>
                <ul className="timeline">
                  {
                    items.map((item, index) => { //하나씩 뽑자
                      const { roadmapStageNo, roadmapSubject, roadmapChapter } = item;
                      console.log(item)
                      if (roadmapStageNo % 2 == 1 && lastresult > roadmapStageNo) {
                        return (
                          <li className="timeline">
                            <div className="timeline-badge success">
                              <i className="nc-icon nc-user-run" />
                            </div>

                            <div className="timeline-panel">
                              <div className="timeline-heading">
                                <Badge color="success" pill>
                                  <td onClick={e => retrieveHandler(e, roadmapStageNo)} > Stage {roadmapStageNo} </td>
                                </Badge>
                              </div>

                              <div className="timeline-body">
                              <div className="fontsize1">
                                {/* <div style={colorhandler(roadmapStageNo)}> */}
                                {/* <div style={{backgroundColor:"#ffccdd"}}> */}
                                <p>
                                  <td style={{fontSize:"18px"}} 
                                  onClick={e => retrieveHandler(e, roadmapStageNo)} > 과목명 : {roadmapSubject} </td>
                                </p>
                                <td style={{fontSize:"18px"}}
                                onClick={e => retrieveHandler(e, roadmapStageNo)}> 챕터명 : {roadmapChapter} </td>
                              </div>
                              </div>
                            </div>
                          </li>
                        );
                      }else if (roadmapStageNo % 2 == 1 && lastresult == roadmapStageNo) {
                        return (
                          <li className="timeline">
                            <div className="timeline-badge success">
                              <i className="nc-icon nc-user-run" />
                            </div>

                            <div className="timeline-panel"  style={{backgroundColor:"#FFDAB9"}}>
                              <div className="timeline-heading">
                                <Badge color="success" pill>
                                  <td onClick={e => retrieveHandler(e, roadmapStageNo)} > Stage {roadmapStageNo} </td>
                                </Badge>
                              </div>

                              <div className="timeline-body">
                              {/* <div className="fontsize1"> */}
                                {/* <div style={colorhandler(roadmapStageNo)}> */}
                                <div>
                                <p>
                                  <td style={{fontSize:"18px"}} 
                                  onClick={e => retrieveHandler(e, roadmapStageNo)} > 과목명 : {roadmapSubject} </td>
                                </p>
                                <td style={{fontSize:"18px"}}
                                onClick={e => retrieveHandler(e, roadmapStageNo)}> 챕터명 : {roadmapChapter} </td>
                              </div>
                              </div>
                            </div>
                          </li>
                        );
                      }
                      else if (roadmapStageNo % 2 ==1){
                        return (
                          <li className="timeline">
                            <div className="timeline-badge ">
                              <i className="nc-icon nc-user-run" />
                            </div>

                            <div className="timeline-panel"  style={{backgroundColor:"#DCDCDC"}}>
                              <div className="timeline-heading">
                                <Badge pill>
                                  <td onClick={e => retrieveHandler(e, roadmapStageNo)} > Stage {roadmapStageNo} </td>
                                </Badge>
                              </div>

                              <div className="timeline-body">
                              {/* <div className="fontsize1"> */}
                                {/* <div style={colorhandler(roadmapStageNo)}> */}
                                <div>
                                <p>
                                  <td style={{fontSize:"18px"}} 
                                  onClick={e => retrieveHandler(e, roadmapStageNo)} > 과목명 : {roadmapSubject} </td>
                                </p>
                                <td style={{fontSize:"18px"}}
                                onClick={e => retrieveHandler(e, roadmapStageNo)}> 챕터명 : {roadmapChapter} </td>
                              </div>
                              </div>
                            </div>
                          </li>
                        );
                      }


                      else if(roadmapStageNo % 2 == 0 && lastresult > roadmapStageNo) {
                        return (
                          <li className="timeline-inverted">
                            <div className="timeline-badge warning">
                              <i className="nc-icon nc-user-run" />
                            </div>

                            <div className="timeline-panel">
                              <div className="timeline-heading">
                                <Badge color="warning" pill>
                                  <td onClick={e => retrieveHandler(e, roadmapStageNo)}> Stage {roadmapStageNo} </td>
                                </Badge>
                              </div>

                              <div className="timeline-body">
                              <div>
                                <p>
                                  <td style={{fontSize:"18px"}} 
                                  onClick={e => retrieveHandler(e, roadmapStageNo)}> 과목명 : {roadmapSubject} </td>
                                </p>
                                <td style={{fontSize:"18px"}}
                                onClick={e => retrieveHandler(e, roadmapStageNo)}> 챕터명 : {roadmapChapter} </td>
                              </div>
                              </div>
                            </div>
                          </li>
                        );
                      }
                      else if(roadmapStageNo % 2 == 0 && lastresult == roadmapStageNo) {
                        return (
                          <li className="timeline-inverted">
                            <div className="timeline-badge warning">
                              <i className="nc-icon nc-user-run" />
                            </div>

                            <div className="timeline-panel"  style={{backgroundColor:"#FFDAB9"}}>
                              <div className="timeline-heading">
                                <Badge color="warning" pill>
                                  <td onClick={e => retrieveHandler(e, roadmapStageNo)}> Stage {roadmapStageNo} </td>
                                </Badge>
                              </div>

                              <div className="timeline-body">
                              <div>
                                <p>
                                  <td style={{fontSize:"18px"}} 
                                  onClick={e => retrieveHandler(e, roadmapStageNo)}> 과목명 : {roadmapSubject} </td>
                                </p>
                                <td style={{fontSize:"18px"}}
                                onClick={e => retrieveHandler(e, roadmapStageNo)}> 챕터명 : {roadmapChapter} </td>
                              </div>
                              </div>
                            </div>
                          </li>
                        );
                      }
                      else {
                        return (
                          <li className="timeline-inverted">
                            <div className="timeline-badge">
                              <i className="nc-icon nc-user-run" />
                            </div>

                            <div className="timeline-panel"  style={{backgroundColor:"#DCDCDC"}}>
                              <div className="timeline-heading">
                                <Badge pill>
                                  <td onClick={e => retrieveHandler(e, roadmapStageNo)}> Stage {roadmapStageNo} </td>
                                </Badge>
                              </div>

                              <div className="timeline-body">
                              <div className="fontsize1">
                                <p>
                                  <td style={{fontSize:"18px"}} 
                                  onClick={e => retrieveHandler(e, roadmapStageNo)}> 과목명 : {roadmapSubject} </td>
                                </p>
                                <td style={{fontSize:"18px"}}
                                onClick={e => retrieveHandler(e, roadmapStageNo)}> 챕터명 : {roadmapChapter} </td>
                              </div>
                              </div>
                            </div>
                          </li>
                        );
                      }
                    })
                  }
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.userDetails,
  items: state.roadmapreducers.items, //리듀서의 index.js에서 지정해둔 이름으로 인식
  info: state.myinforeducers.data
  ,lastresult: state.roadmapreducers.lastresult
});

const mapDispatchToProps = (dispatch) => ({
  listofRoadmap: () => dispatch(RoadmapActions.ListofRoadmap()),
  retrieveRoadmap: (roadmapStageNo) => dispatch(RoadmapActions.RetrieveRoadmap(roadmapStageNo)),
  getstudentprofile: (userId) => dispatch(MyInfoActions.GetStudentProfile(userId))
  ,getlastRoadmap :(userId) => dispatch(RoadmapActions.GetRoadmapLast(userId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListofRoadmap));