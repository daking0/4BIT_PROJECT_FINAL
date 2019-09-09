/**
 * Retrieve Article
 * @author: dakyung
 * 
 * @description: 
 * -현재 선택한 글에 해당하는 게시물 내용을 출력
 * -user와 글 작성 user의 id가 똑같이 userId로 이름이 겹치기 때문에 
 * 글작성 user는 data.user.userId, user는 userId로 사용
 * -댓글이 있으면 가져오기
 * 
 * -listofreply 액션을 실행하고 retrieve 액션 실행하고나서 retrieve컴포넌트로 넘어가야 댓글마다 수정,삭제버튼 생성에 오류가 안생긴다
 * @param:
 * RetrieveArticle(boardId,articleId) 
 * ArticleActions.DeleteArticle(articleId)
 * ReplyActions.ListofReply(boardId,articleId)
 * */
import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from "react-redux";
import { ListofReply, CreateReply } from "../ArticleIndex";
import { ArticleActions } from '../../../Actions/ArticleActions';
import { ReplyActions } from '../../../Actions/ReplyActions';
import { FileActions } from 'Actions';
// import { CreateReply, ListofReply } from '../ArticleIndex';
import ReactHtmlParser from 'react-html-parser';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Table,
  Row,
  Col,
  Container
  ,
  Button
} from "reactstrap";
import moment from 'moment';

const RetrieveArticles = ({ data, user, retrieveArticle, deleteArticle, listofReply, listofFiles, downloadFiles, filedata, match, history }) => {
  const { articleTitle, articleId, articleContents, articleCreateDate } = data; //이 글에 대한 정보
  // var content = contents.current.value; //현재 쓰여진 내용
  //  content = content.replace(/(?:\r\n|\r|\n)/g,'<br/>');
  // articleContents = articleContents.slice(0, articleContents.length);
  //  articleContents = articleContents.replace(/(<br>|<br\/>|<br \/>)/g, "\n");
  // console.log(articleContents)
  const { userId,name} = user; //현재 로그인 된 유저의 userId                                                         
  const { boardId } = match.params;
  console.log(match.params.boardId)

  var time = articleCreateDate;
  var createDate = moment(time).format('YYYY-MM-DD HH:mm')

  // 댓글 리스트 가져오기
  const [replyitems, setItems] = useState([]);

  useEffect(() => {
    if (replyitems !== undefined) { //undeined 체크를 안해주면 무한패치됨
      if (replyitems.length === 0) { //아무것도 없으면
        listofReply(boardId, articleId) //댓글 가져오기
          .then(response => {//listofReply액션 성공했으면
            const { items } = response.payload.data; //꺼내서
            setItems(items); //set해주기
          })
          .then(response => {
            listofFiles(articleId)
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
  });


  //수정버튼 
  const updateArticleHandler = (e, articleId) => {
    e.stopPropagation();
    retrieveArticle(boardId, articleId)
      .then(response => {
        console.log(match)
        console.log(history.location)
        console.log(history)
        history.push(history.location.pathname+"/modify");
      })
  };

  //삭제버튼
  const deleteHandler = (e, articleId) => {
    e.stopPropagation();
    deleteArticle(articleId)
      .then(response => {
        console.log(history.location)
        // history.push(history.location.pathname + boardId +this.props.page);
        window.history.back();
      })
  };

  //파일다운로드
  const downloadHandler = (e, fileOriginName) => {
    e.stopPropagation();
    downloadFiles(fileOriginName)
      .then(response => {
        console.log(response)
        console.log(response.payload.config.url);
        window.location="http://localhost:8080/fileupload/files/"+fileOriginName;
      })
  };

  //현재 user와 글을 쓴 user가 같은 user인지 비교
  const CompareUser = () => {
    if (data.user.userId === userId) { //같은 유저이면
      console.log(data.user.userId,userId)
      return false //hidden= false -> 버튼 보여줌
    } else {
      console.log("22",data.user.userId,userId)
      return true
    }
  }

  return (
    <div className="content">
      <Row>
        <Col md ="10">
          <Card >
            <CardHeader tag="h4" style={{fontFamily:"Nanum Myeongjo"}}>
              {articleTitle}
            </CardHeader>
            <CardBody style={{fontSize:"15px", marginLeft:"15px"}}>
              <Row>
                <Col md="3">
                  게시글번호 : {articleId} <br />
                </Col>
                <Col md="3">
                  작성자 : {data.user.name}
                </Col>
                <Col md="4">
                  작성일 : {createDate}
                </Col>
                </Row>
                <br></br>
                <br></br>
                <Row style={{width: "80%" , height:"300px",border:"1px grey solid"}}>
               
                <Col >
                  {ReactHtmlParser(articleContents)}  <br />
                </Col>
                </Row>
              <br></br>
              <Row>
              {/* style={{ backgroundColor: "#fff2e6" }} */}
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
                  <Button color="warning" onClick={e => updateArticleHandler(e, articleId)} hidden={CompareUser()}>
                    수정
                  </Button>
                  <Button color="danger" onClick={e => deleteHandler(e, articleId)}  hidden={CompareUser()} style={{margin:"8px"} }>
                    
                    삭제
                  </Button>
                </Col>
              </Row>
            </CardBody>

            <CardFooter >
              <Card style={{ width: '80%', padding:"20px",backgroundColor:"#DCDCDC" }}>
                <CreateReply />
                <ListofReply />
              </Card>

            </CardFooter>
          </Card>
          
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <Card> 
            댓글
            <CreateReply />
            <ListofReply />
          </Card>
        </Col>
      </Row> */}
    </div>
  );
}


const mapStateToProps = (state) => ({
  data: state.articlereducers.datas,
  user: state.auth.userDetails //현재 user의 userDetails
  , filedata: state.filereducers.items
});

const mapDispatchToProps = (dispatch) => ({
  retrieveArticle: (boardId, articleId) => dispatch(ArticleActions.RetrieveArticle(boardId, articleId)),
  deleteArticle: (articleId) => dispatch(ArticleActions.DeleteArticle(articleId)),
  listofReply: (boardId, articleId) => dispatch(ReplyActions.ListofReply(boardId, articleId)),
  listofFiles: (articleId) => dispatch(FileActions.ListOfFiles(articleId)),
  downloadFiles: (filename) => dispatch(FileActions.DownloadFiles(filename))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetrieveArticles));