// /**
//  * Listof Article
//  * @author: dakyung
//  * 
//  * @description: 
//  * -현재 선택한 게시판에 해당하는 모든 게시물 목록을 출력 (현재는 articleId, articleTitle 출력)
//  * ArticleMain.js에서 import하여 사용 (이 컴포넌트 자체로는 사용되지 않고있음)
//  * 
//  * @param:
//  * DeleteArticle(articleId) - remove 버튼 클릭시 작동
//  * RetrieveArticle(boardId,articleId) -목록 선택시 해당 게시물의 내용을 보여준다
//  * 
//  * 
//  * */
// import React, { useState, useEffect } from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { ArticleActions } from '../../../Actions/ArticleActions';
// import { ReplyActions } from '../../../Actions/ReplyActions';


// // reactstrap components
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Table,
//   Row,
//   Col,
//   Container
// } from "reactstrap";

// class ListofArticles extends React.Component {
//   constructor(props) {
//     super(props);
//     this.retrieveHandler = this.retrieveHandler.bind(this)
//     this.CompareUser = this.CompareUser.bind(this)
//   }

//   state = {
//     boardId: ""
//   }

//   //컴포넌트 생성과정, render 전
//   // componentWillMount() {
//   //   this.props.listofArticle(1, 10, this.props.boardId);
//   //   console.log("componentWil", this.props.boardId, "pro", this.state.boardId);
//   // }

//   retrieveHandler = (e, boardId, articleId) => {
//     e.stopPropagation();
//     const url = boardId + "/" + articleId;

//     this.props.listofReply(boardId, articleId) //댓글을 먼저 불러오고나서 
//       .then(response => {
//         this.props.retrieveArticle(boardId, articleId) //상세 내용으로 들어가야함
//           .then(response => {
//             console.log('>>>>>>>>>>>>>>>>>>', response); 
//             this.props.history.push(url);
//           });
//       })
//   };

//   //현재 user의 권한과 게시판 권한 비교
//   CompareUser = () => {
//     if (this.props.user.role.roleCode === "role_admin") { //권한해당하면
//       return false //버튼 보여줌
//     } else {
//       return true
//     }
//   }

//   render() {
//     console.log("왓니2", this.state.boardId)
//     console.log("왓니3", this.props.boardId)
//     // const {boardId} = this.props;
//     // this.props.listofArticle(1,10,this.props.boardId)
//     const itemstest = []
//     console.log(itemstest)
//     // {this.props.items.articleTitle}
//     return (
//       <div className="content">
//         <Row>
//           <Col md="12">
//             <Card>
//               <CardBody>
//                 {/* <Row>
//                     <Col md="12"> */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle tag="h4">{this.props.boardId}</CardTitle>
//                   </CardHeader>
//                   <CardBody className="table-full-width table-hover">
//                     <Table responsive>
//                       <thead>
//                         <tr>
//                           <th>글 번호</th>
//                           <th>제목</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {
//                           this.props.items.map((item, index) => {
//                             const { articleId, articleTitle } = item;
//                             itemstest.push(articleId);
//                             return (
//                               <tr key={index}>
//                                 <td onClick={e => this.retrieveHandler(e, this.props.boardId, articleId)}> {articleId} </td>
//                                 <td onClick={e => this.retrieveHandler(e, this.props.boardId, articleId)}> {articleTitle} </td>
//                               </tr>
                              
//                             );
//                           })
//                         }
//                       </tbody>
//                     </Table>
                    
//                   </CardBody>
//                 </Card>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div >
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   items: state.articlereducers.items//리듀서의 index.js에서 지정해둔 이름으로 인식
//   , datas: state.articlereducers.datas,
//   user: state.auth.userDetails
// });

// const mapDispatchToProps = (dispatch) => ({
//   retrieveArticle: (boardId, articleId) => dispatch(ArticleActions.RetrieveArticle(boardId, articleId))
//   , listofReply: (boardId, articleId) => dispatch(ReplyActions.ListofReply(boardId, articleId))
//   , listofArticle: (page, size, boardId) => dispatch(ArticleActions.ListofArticle(page, size, boardId))
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListofArticles));

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
import moment from 'moment';
import PaginationComponent from '../../pagination/Pagination';


// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

class ListofArticles extends React.Component {
  constructor(props) {
    super(props);
    this.retrieveHandler = this.retrieveHandler.bind(this)
    this.CompareUser = this.CompareUser.bind(this)
  }

  state = {
    boardId: ""
    ,url : ""
  }

  //컴포넌트 생성과정, render 전
  componentWillMount() {
    // console.log(this.props.match.params.page)
    const requestPage = this.props.match.params.page === null? 1 : this.props.match.params.page;
    this.props.listofArticle(requestPage,10, this.props.boardId)

    // this.props.listofArticle(1, 10, this.props.boardId);
    // console.log("componentWil", this.props.boardId, "pro", this.state.boardId);
  }

  componentDidMount(){
    if(this.props.user.role.roleCode === "role_student"){
      this.setState({
        url : "/student/board/"
      })
    }
    else if(this.props.user.role.roleCode === "role_teacher"){
      this.setState({
        url : "/teacher/board/"
      })
    }
    else if(this.props.user.role.roleCode === "role_admin"){
      this.setState({
        url : "/admin/board/"
      })
    }
  }

  
  retrieveHandler = (e, boardId, articleId) => {
    e.stopPropagation();

    this.props.listofReply(boardId, articleId) //댓글을 먼저 불러오고나서 
      .then(response => {
        this.props.retrieveArticle(boardId, articleId) //상세 내용으로 들어가야함
          .then(response => {
            const page= 1
            this.props.history.push(this.state.url+boardId + "/"+page+"/" + articleId);
            console.log('>>>>>>>>>>>>>>>>>>', response);
            console.log(this.state.url+boardId + "/1" + articleId)
           
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

  render() {
  
    const itemstest = []
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                {/* <Row>
                    <Col md="12"> */}
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4" style={{  fontFamily: "Nanum Myeongjo"}}>{
                      this.props.items.map((item, index) => {
                        if(index===0){
                          const { boardTypeList} = item;
                          const { boardName} = boardTypeList;
                          return (<div>{ boardName} </div>);
                        }
                        // else{
                        //   return(<br/>);
                        // }
                      })
                      //this.props.items[0]
                      }</CardTitle>
                  </CardHeader>
                  <CardBody className="table-full-width table-hover">
                    <Table>
                      <thead className="text-primary">
                        <tr>
                          <th className="text-center">글 번호</th>
                          <th className="text-center">제목</th>
                          <th className="text-center">작성자</th>
                          <th className="text-center">작성일</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.props.items.map((item, index) => {
                            const { articleId, articleTitle, articleCreateDate, user, articleNumber } = item;
                            const {name} = user;
                            //const {articleLastNumber} = boardTypeList;
                            // const pagenum =articleLastNumber -((this.props.articlereducers.page-1)*10)
                            var time = articleCreateDate;
                            var createDate = moment(time).format('YYYY-MM-DD HH:mm')
                            itemstest.push(articleId);
                            return (
                              <tr key={index}>
                                <td className="text-center" onClick={e => this.retrieveHandler(e, this.props.boardId, articleId)}> {articleNumber} </td>
                                <td className="text-center" onClick={e => this.retrieveHandler(e, this.props.boardId, articleId)}> {articleTitle} </td>
                                <td className="text-center" onClick={e => this.retrieveHandler(e, this.props.boardId, articleId)}> {name} </td>
                                <td className="text-center" onClick={e => this.retrieveHandler(e, this.props.boardId, articleId)}> {createDate} </td>
                              </tr>
                              
                            );
                          })
                        }
                      </tbody>
                    </Table>
                    <PaginationComponent baseUrl={this.state.url+ this.props.boardId} page={this.props.articlereducers.page} size={this.props.articlereducers.size} totalCount={this.props.articlereducers.totalCount} />
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.articlereducers.items//리듀서의 index.js에서 지정해둔 이름으로 인식
  , datas: state.articlereducers.datas,
  user: state.auth.userDetails,
  articlereducers : state.articlereducers
});

const mapDispatchToProps = (dispatch) => ({
  retrieveArticle: (boardId, articleId) => dispatch(ArticleActions.RetrieveArticle(boardId, articleId))
  , listofReply: (boardId, articleId) => dispatch(ReplyActions.ListofReply(boardId, articleId))
  , listofArticle: (page, size, boardId) => dispatch(ArticleActions.ListofArticle(page, size, boardId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListofArticles));
