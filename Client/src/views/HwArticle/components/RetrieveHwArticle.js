/**
 * Retrieve HwArticle
 * @author: 영빈
 * 
 * */

import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from "react-redux";
import { HwArticleActions } from '../../../Actions/HwArticleActions';
import { HwReplyActions } from '../../../Actions/HwReplyActions';
import { FileActions } from 'Actions';
import { ListOfHwReply, CreateHwReply } from '../HwArticleIndex';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Table, Row, Col, Container, Button } from "reactstrap";

const RetrieveHwArticle = ({ data, nowUser, downloadFiles, retrieveHwArticle, deleteHwArticle, listOfHwReply, listofFiles, filedata, match, history }) => {

  // 렌더링 전 미리 retrieveHwArticle을 해서 data 넣어둠
  // useEffect(() => {
  //   const { hwArticleId } = match.params;
  //   retrieveHwArticle(hwArticleId);
  // },[]);



  // 댓글 리스트 미리 가져오기
  const [replyitems, setItems] = useState([]);

  useEffect(() => {
    if (replyitems !== undefined) { //undefined 체크를 안해주면 무한패치됨
      if (replyitems.length === 0) { //아무것도 없으면
        const { hwArticleId } = match.params;
        console.log("들어왔어", hwArticleId)
        listOfHwReply(hwArticleId) //댓글 가져오기
          //     .then(response => {//listofReply액션 성공했으면
          //       if (response.payload.request.method !== "POST") {

          //       const { items } = response.payload.data; //꺼내서
          //       setItems(items); //set해주기
          //       }
          //     });

          .then(response => {
            listofFiles(hwArticleId)
              .then(response => {
                if (filedata !== []) {
                  const filedatas = filedata
                }
                console.log(response)
                console.log(filedata)
              });
          })
          ;
      }
    }
  },[]);

  const { hwArticleId } = match.params;
  const { hwSubmitDate, hwUpdateDate, hwContents, hwId, userId, user } = data; //이 글에 대한 정보
  // const { name } = user;
  const { CurrentUserId } = nowUser; //현재 로그인 된 유저의 userId

  //수정버튼 
  const updateHwArticleHandler = (e, hwArticleId) => {
    e.stopPropagation();
    retrieveHwArticle(hwArticleId)
      .then(response => {
        history.push("/student/class/assignment/hwArticle/" + hwArticleId + "/modify");
      })
  };

  //삭제버튼
  const deleteHwArticleHandler = (e, hwId) => {
    e.stopPropagation();
    deleteHwArticle(hwId)
      .then(response => {
        history.push("/student/class/assignment/list");
      })
  };


  //파일 다운로드
  const downloadHandler = (e, fileOriginName) => {
    e.stopPropagation();
    downloadFiles(fileOriginName)
      .then(response => {
        console.log(response)
        console.log(response.payload.config.url);
        window.location = "http://localhost:8080/fileupload/files/" + fileOriginName;
      })
  };

  //현재 user와 글을 쓴 user가 같은 user인지 비교
  console.log('userId: ' + userId)
  console.log('CurrentUserId: ' + CurrentUserId)

  const CompareUser = () => {
    if (userId === CurrentUserId) { //같은 유저이면
      return false //hidden= false -> 버튼 보여줌
    } else {
      return true
    }
  }

  // 시간형태 변경
  var time1 = hwSubmitDate;
  var hwSubmitDateM = moment(time1).format('YYYY-MM-DD HH:mm')
  var time2 = hwUpdateDate;
  var hwUpdateDateM = moment(time2).format('YYYY-MM-DD HH:mm')


  return (
    <div className="content">
      <Row>
        <Col>
          <Card>
          <CardHeader tag="h4" style={{fontFamily:"Nanum Myeongjo"}}>
          {user.name} 학생이 제출한 과제물 #{hwArticleId}
          </CardHeader>
          <CardBody style={{fontSize:"15px", marginLeft:"15px"}}>
              <Row>

                <Col md="3">작성일: {moment(hwSubmitDate).format("YYYY-MM-DD HH:mm:ss")}</Col>
                <Col md="3">수정일: {moment(hwUpdateDate).format("YYYY-MM-DD HH:mm:ss")}</Col>
              </Row>
              <Row style={{width: "80%" , height:"300px",border:"1px grey solid"}}>
                <Col>{ReactHtmlParser(hwContents)}</Col>
              </Row>
              
              <Row >
              <Card style={{width:"78%",padding:"5px",margin:"5px",backgroundColor:"#f0f0f5"}}>
                  <span style={{fontSize:"16px", fontWeight:"bold"}}>첨부된 파일</span> <br />
                  {
                    filedata.map((item, index) => {
                      const { fileOriginName, fileName } = item.file;
                      return (
                        <div>
                          <span key={index} onClick={e => downloadHandler(e, fileOriginName)}>
                            {fileOriginName}  <br />
                            {/* <img src="http://localhost:8080/fileupload/files/4ed19164718805c485120ac37bea6beb27fb1ebdb94eb3cd60108a7281a6fd40" alt="" /> */}
                          </span>
                          <a href="http://localhost:8080/fileupload/files/${fileOriginName}"></a>
                        </div>
                      )
                    })
                  }
                </Card>
                </Row>

                <Row style={{marginTop:"7px"}}>
              <Col>
                <Button color="success" hidden={CompareUser()} onClick={e => updateHwArticleHandler(e, hwArticleId)}>
                  <span className="btn-label">
                    <i className="nc-icon nc-ruler-pencil" />
                  </span>
                  수정
                    </Button>
                <Button color="danger" hidden={CompareUser()} onClick={e => deleteHwArticleHandler(e, hwArticleId)}>
                  <span className="btn-label">
                    <i className="nc-icon nc-simple-remove" />
                  </span>
                  삭제
                    </Button>
              </Col>
            </Row>
            </CardBody>

                  
            <CardFooter >
              <Card style={{ width: '80%', padding:"20px",backgroundColor:"#DCDCDC" }}>
                <CreateHwReply />
                <ListOfHwReply />
              </Card>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.hwarticlereducers.datas,
  nowUser: state.auth.userDetails //현재 user의 userDetails
  , filedata: state.filereducers.items
});

const mapDispatchToProps = (dispatch) => ({
  retrieveHwArticle: (hwArticleId) => dispatch(HwArticleActions.RetrieveHwArticle(hwArticleId)),
  deleteHwArticle: (hwArticleId) => dispatch(HwArticleActions.DeleteHwArticle(hwArticleId)),
  listOfHwReply: (hwArticleId) => dispatch(HwReplyActions.ListOfHwReply(hwArticleId))
  , listofFiles: (articleId) => dispatch(FileActions.ListOfFiles(articleId))
  , downloadFiles: (filename) => dispatch(FileActions.DownloadFiles(filename))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetrieveHwArticle));
