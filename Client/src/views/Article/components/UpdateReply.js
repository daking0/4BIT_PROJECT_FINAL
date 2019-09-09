import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { ReplyActions } from '../../../Actions/ReplyActions';
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
    Form,
    Input,
    Label,
    Button
} from "reactstrap";
import { ArticleActions } from '../../../Actions/ArticleActions';
import { FileActions } from 'Actions';
import { ListofReply, CreateReply } from "../ArticleIndex";

import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => setValue(e.target.value);
    return {
        value,
        onChange
    }
}



const UpdateReply = ({ data, datas,user, retrieveArticle, deleteArticle, listofReply, listofFiles, downloadFiles, updateReply, filedata, match, history }) => {
    const { articleTitle, articleId, articleContents, articleCreateDate } = data; //이 글에 대한 정보
    // var content = contents.current.value; //현재 쓰여진 내용
    //  content = content.replace(/(?:\r\n|\r|\n)/g,'<br/>');
    // articleContents = articleContents.slice(0, articleContents.length);
    //  articleContents = articleContents.replace(/(<br>|<br\/>|<br \/>)/g, "\n");
    // console.log(articleContents)
    const { userId, name } = user; //현재 로그인 된 유저의 userId                                                         
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
                console.log(history.match)
                history.push(history.location + "/modify");
            })
    };

    //삭제버튼
    const deleteHandler = (e, articleId) => {
        e.stopPropagation();
        deleteArticle(articleId)
            .then(response => {
                console.log(history.location)
                history.push(history.location.pathname + boardId);
            })
    };

    const downloadHandler = (e, fileOriginName) => {
        e.stopPropagation();
        downloadFiles(fileOriginName)
            .then(response => {
                console.log(response)
                console.log(response.payload.config.url);
                // const url ="http://localhost:8080/fileupload/files/"+fileOriginName
                // <a href="http://localhost:8080/fileupload/files/"+fileOriginName">굿</a>
                // <Redirect to="/admin/dashboard"/>;
                window.push("http://localhost:8080/fileupload/files/" + fileOriginName)
            })
    };

    //현재 user와 글을 쓴 user가 같은 user인지 비교
    const CompareUser = () => {
        if (data.user.userId === userId) { //같은 유저이면
            return false //hidden= false -> 버튼 보여줌
        } else {
            return true
        }
    }


    const { replyContents, replyId } = datas;

    const replycontents = useFormInput(replyContents);

    const onSubmit = (e) => {
        e.preventDefault();
        const content = replycontents.value;
        if (content.length > 0) {
            updateReply(replyId, content)
                .then(response => {
                    if(user.role.roleCode == "role_student"){
                        history.push("/student/board/"+match.params.boardId+"/"+ match.params.page+"/"+articleId);
                      }else if(user.role.roleCode == "role_teacher"){
                        history.push("/teacher/board/"+match.params.boardId+"/"+ match.params.page+"/"+articleId);
                      }; 
                    // history.push("/board/" + match.params.boardId + "/" + match.params.articleId);
                })
        }
    }
    return (
        <div className="content">
            <Row>
                <Col md="10">
                    <Card >
                        <CardHeader tag="h4" style={{ fontFamily: "Nanum Myeongjo" }}>
                            {articleTitle}
                        </CardHeader>
                        <CardBody style={{ fontSize: "15px", marginLeft: "15px" }}>
                            <Row>
                                <Col md="3">
                                    게시글번호 : {articleId} <br />
                                </Col>
                                <Col md="3">
                                    작성자 : {name}
                                </Col>
                                <Col md="4">
                                    작성일 : {createDate}
                                </Col>
                            </Row>
                            <br></br>
                            <br></br>
                            <Row style={{ width: "80%", height: "300px", border: "1px grey solid" }}>

                                <Col >
                                    {ReactHtmlParser(articleContents)}  <br />
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                {/* style={{ backgroundColor: "#fff2e6" }} */}
                                <Col >
                                    첨부된 파일 <br />
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
                                </Col>
                                <Col>
                                    {/* <Button color="warning" onClick={e => updateArticleHandler(e, articleId)}>다운로드</Button> */}
                                </Col>
                            </Row>

                            <Row style={{ marginTop: "7px" }}>
                                <Col md="2" >
                                    <Button color="warning" onClick={e => updateArticleHandler(e, articleId)} hidden={CompareUser()}>
                                        수정
                                      </Button>
                                    <Button color="danger" onClick={e => deleteHandler(e, articleId)} hidden={CompareUser()} style={{ margin: "8px" }}>

                                        삭제
                                            </Button>
                                </Col>
                            </Row>

                        </CardBody>

                        <CardFooter >
                        <Card style={{ width: '80%', padding:"20px",backgroundColor:"#DCDCDC" }}>
                                <Form onSubmit={e => onSubmit(e)}>
                                <Row>
                                <Label >{name}</Label> 
                                <Col md="7">
                                 <Input type="text" {...replycontents} className="form-control" placeholder={replyContents} />
                                 </Col>
                                 <Col md="3">
                                    <Button  type="submit">
                                    <span className="btn-label">
                                        <i className="nc-icon nc-check-2" />
                                    </span>수정</Button>
                                    </Col>
                                    </Row>
                                </Form>
                            </Card>
                            <ListofReply />


                        </CardFooter>
                    </Card>

                </Col>
            </Row>

        </div>
    );
}


const mapStateToProps = (state) => ({
    data: state.articlereducers.datas,
    user: state.auth.userDetails //현재 user의 userDetails
    , filedata: state.filereducers.items,
    datas: state.replyreducers.datas
});

const mapDispatchToProps = (dispatch) => ({
    updateReply: (replyId, replycontents) => dispatch(ReplyActions.UpdateReply(replyId, replycontents))
    , retrieveArticle: (boardId, articleId) => dispatch(ArticleActions.RetrieveArticle(boardId, articleId)),
    deleteArticle: (articleId) => dispatch(ArticleActions.DeleteArticle(articleId)),
    listofReply: (boardId, articleId) => dispatch(ReplyActions.ListofReply(boardId, articleId))
    , listofFiles: (articleId) => dispatch(FileActions.ListOfFiles(articleId))
    , downloadFiles: (filename) => dispatch(FileActions.DownloadFiles(filename))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateReply))