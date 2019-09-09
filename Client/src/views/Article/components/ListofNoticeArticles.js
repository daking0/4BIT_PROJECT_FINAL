/**
 * Listof Article
 * @author: dakyung
 * 
 * @description: 
 * -현재 선택한 게시판에 해당하는 모든 게시물 목록을 출력 (현재는 articleId, articleTitle 출력)
 * ArticleMain.js에서 import하여 사용 (이 컴포넌트 자체로는 사용되지 않고있음)
 * 
 * @param:
 * DeleteArticle(articleId) - remove 버튼 클릭시 작동
 * RetrieveArticle(boardId,articleId) -목록 선택시 해당 게시물의 내용을 보여준다
 * 
 * 
 * */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ArticleActions } from '../../../Actions/ArticleActions';
import { ReplyActions } from '../../../Actions/ReplyActions';


// reactstrap components
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

class ListofArticles extends React.Component{
  constructor(props) {
    super(props);
    // this.onChangeTitle = this.onChangeTitle.bind(this)
    // this.onChangeContent = this.onChangeContent.bind(this)
    this.retrieveHandler = this.retrieveHandler.bind(this)
    this.CompareUser = this.CompareUser.bind(this)
    // this.state={
    //   boardId : ""
    // }
  }
  
//   componentWillMount(){
//     console.log("componentWillMount");
//     this.props.listofArticle(1,10,this.props.boardId);
// }

componentWillReceiveProps(){
    console.log("componentUpdate");
   this.setState=({
          boardId : this.props.boardId
        })
    this.props.listofArticle(1,10,this.state.boardId);
}


  // componentDidMount() {
  //   console.log("abc",this.props.boardId)
  //   console.log("edf",this.state.boardId)
  //   if (this.props.boardId !== this.state.boardId) {
  //     this.setState={
  //       boardId : ""
  //     }
  //     this.props.listofArticle(1,10,this.state.boardId);
  //   }
  // }

  retrieveHandler = (e, boardId, articleId) => {
    e.stopPropagation();
    const url = boardId + "/" + articleId;

    this.props.listofReply(boardId, articleId) //댓글을 먼저 불러오고나서 
      .then(response => {
        this.props.retrieveArticle(boardId, articleId) //상세 내용으로 들어가야함
          .then(response => {
            console.log('>>>>>>>>>>>>>>>>>>', response);
            this.props.history.push(url);
          });
      })
  };

  //현재 user의 권한과 게시판 권한 비교
  CompareUser = () => {
    if (this.props.user.role.roleCode === "role_admin") { //권한해당하면
      return false //버튼 보여줌
    } else {
      return true
    }
  }

  render(){
    // console.log("왓니2", this.state.boardId)
    // console.log("왓니3", this.props.boardId)
    // const {boardId} = this.props;
    // this.props.listofArticle(1,10,this.props.boardId);
    
    return (
      <div className="content">
        <Row>
          <Col md="12" style={{ backgroundColor: 'red', height: '400px' }}>
            <Card>
              <CardBody>
                  {/* <Row>
                    <Col md="12"> */}
                      <Card>
                        <CardHeader>
                          <CardTitle tag="h4">Regular Table with Colors</CardTitle>
                        </CardHeader>
                        <CardBody className="table-full-width table-hover">
                          <Table responsive>
                            <thead>
                              <tr>
                                <th>글 번호1</th>
                                <th>제목</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.props.items.map((item, index) => {
                                  const { articleId, articleTitle } = item;
                                  return (
                                    <tr key={index}>
                                      <td onClick={e => this.retrieveHandler(e, this.props.boardId, articleId)}> {articleId} </td>
                                      <td onClick={e => this.retrieveHandler(e, this.props.boardId, articleId)}> {articleTitle} </td>
                                    </tr>
                                  );
                                })
                              }
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              {/* </Col>
            </Row> */}
              </CardBody>
             </Card>
            </Col>
        </Row>
      </div >
    );
  }
}

// const ListofArticles = ({ items, retrieveArticle, listofReply,listofArticle, datas, user, match, history }) => {
  
//   const { boardId } = match.params;
//   // const boardId = "notice";
//   useEffect(() => {
//     listofArticle(1,10,boardId);
//   },[boardId]);


//   const retrieveHandler = (e, boardId, articleId) => {
//     e.stopPropagation();
//     const url = boardId + "/" + articleId;

//     listofReply(boardId, articleId) //댓글을 먼저 불러오고나서 
//       .then(response => {
//         retrieveArticle(boardId, articleId) //상세 내용으로 들어가야함
//           .then(response => {
//             console.log('>>>>>>>>>>>>>>>>>>', response);
//             history.push(url);
//           });
//       })
//   };

//   const { role } = user;
//   const { roleCode } = role;

//   //현재 user의 권한과 게시판 권한 비교
//   const CompareUser = () => {
//     if (role.roleCode === "role_admin") { //권한해당하면
//       return false //버튼 보여줌
//     } else {
//       return true
//     }
//   }
//   return (

//     <div className="content">
//       <Row>
//         <Col md="12" style={{ backgroundColor: 'red', height: '400px' }}>
//           <Card>
//             <CardBody>
//               <div className="content">
//                 <Row>
//                   <Col md="12">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle tag="h4">Regular Table with Colors</CardTitle>
//                       </CardHeader>
//                       <CardBody className="table-full-width table-hover">
//                         <Table responsive>
//                           <thead>
//                             <tr>
//                               <th>글 번호</th>
//                               <th>제목</th>
//                               <th className="text-right">Salary</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {
//                               items.map((item, index) => {
//                                 const { articleId, articleTitle } = item;
//                                 return (
//                                   <tr key={index}>
//                                     <td onClick={e => retrieveHandler(e, boardId, articleId)}> {articleId} </td>
//                                     <td onClick={e => retrieveHandler(e, boardId, articleId)}> {articleTitle} </td>
//                                   </tr>
//                                 );
//                               })
//                             }
//                     </tbody>
//                   </Table>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//             </CardBody>
//            </Card>
//           </Col>
//       </Row>
//     </div >
//   );
// }

const mapStateToProps = (state) => ({
  items: state.articlereducers.items//리듀서의 index.js에서 지정해둔 이름으로 인식
  , datas: state.articlereducers.datas,
  user: state.auth.userDetails
});

const mapDispatchToProps = (dispatch) => ({
  retrieveArticle: (boardId, articleId) => dispatch(ArticleActions.RetrieveArticle(boardId, articleId))
  , listofReply: (boardId, articleId) => dispatch(ReplyActions.ListofReply(boardId, articleId))
  ,listofArticle: (page, size,boardId) => dispatch(ArticleActions.ListofArticle(page, size,boardId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListofArticles));

// const ListofArticles = () => {
//   return (
//     <div className="content">
//       <Row>
//         <Col md="12" style={{ backgroundColor: 'red', height: '400px' }}>
//           <Card>
//             <CardBody>

//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default ListofArticles;
