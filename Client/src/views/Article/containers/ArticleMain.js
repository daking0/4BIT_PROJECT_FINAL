// /**
//  * Article Main
//  * @author: dakyung
//  * 
//  * @description: 
//  * -ListofArticles컴포넌트를 통해 현재 선택한 게시판의 글 목록을 출력하고
//  *  Logout 컴포넌트를 통해 로그아웃 버튼 배치
//  * 
//  * @param:
//  * ListofArticle(page, size,boardId)
//  * 
//  * */
// import React from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
// import { connect } from "react-redux";
// import  {ListofArticles, ListofNoticeArticles}  from '../ArticleIndex';
// // , FileInput
// // import Logout from '../../Logout';
// import { ArticleActions } from '../../../Actions/ArticleActions';

// // reactstrap components
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Table,
//   Row,
//   Col,
//   Container,
//   Button
// } from "reactstrap";

// class ArticleMain extends React.Component{
//   constructor(props) {
//     super(props);
//     this.CompareUser = this.CompareUser.bind(this)
//   }

//     //현재 user의 권한과 게시판 권한 비교
//   CompareUser = () => {
//       if (this.props.user.role.roleCode === "role_admin") { //권한해당하면
//         return false //버튼 보여줌
//       } else {
//         return true
//       }
//     }

//   render(){
//     // console.log("얘",this.props.history)
//     // console.log("얘",this.props.location)
//     // console.log("얘",this.props.history.location.state.User)
//     const {boardId} = this.props.match.params;
//     //   const {boardId} = match.params;
//     // this.props.listofArticle(1, 10,boardId); 

//     // const location = {
//     //   pathname: this.props.history.location.state.User+"/board/"+boardId+"/write",
//     //   state: { User: this.props.history.location.state.User }
//     // }

//     this.props.history.push("/student/board/"+boardId)

//     return (
//       <div className="content">
//         <Row>
//                 <Col md="2">
//                 <Button color="warning" onClick={e => this.props.history.push("/board/"+boardId+"/write")} >
//                       <span className="btn-label">
//                       <i className="nc-icon nc-zoom-split" />
//                       </span>
//                     추가
//                     </Button>
//                     </Col>
//                     </Row>
//           <Row>
//             <Col>
//             2번
//           <ListofArticles 
//           boardId={boardId}
//           />
//           </Col>
//         </Row>
//       </div>
//     );  
//   }
// }


// const mapStateToProps = (state) => ({
//   datas : state.articlereducers.datas,
//   user: state.auth.userDetails
// })

// const mapDispatchToProps = (dispatch) => ({
//   listofArticle: (page, size,boardId) => dispatch(ArticleActions.ListofArticle(page, size,boardId))
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleMain));

/**
 * Article Main
 * @author: dakyung
 * 
 * @description: 
 * -ListofArticles컴포넌트를 통해 현재 선택한 게시판의 글 목록을 출력하고
 *  Logout 컴포넌트를 통해 로그아웃 버튼 배치
 * 
 * @param:
 * ListofArticle(page, size,boardId)
 * 
 * */
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from "react-redux";
import  {ListofArticles, ListofNoticeArticles}  from '../ArticleIndex';
// , FileInput
// import Logout from '../../Logout';
import { ArticleActions } from '../../../Actions/ArticleActions';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container,
  Button
} from "reactstrap";

class ArticleMain extends React.Component{
  constructor(props) {
    super(props);
    this.CompareUser = this.CompareUser.bind(this)
  }

    //현재 user의 권한과 게시판 권한 비교
  CompareUser = () => {
      if (this.props.user.role.roleCode === "role_admin") { //권한해당하면
        return false //버튼 보여줌
      } else {
        return true
      }
    }

  render(){
    const boardId = this.props.match.params.boardId;
    let usercode = this.props.user.role.roleCode
    let url = ""
    if(usercode === "role_student"){
      url = "/student"+"/board/"+boardId+"/write"
    }else if(usercode === "role_teacher"){
      url = "/teacher"+"/board/"+boardId+"/write"
    }else if(usercode === "role_admin"){
      url = "/admin"+"/board/"+boardId+"/write"
      console.log(url)
    }
    console.log( boardId)
    console.log("너나와봐",  this.props.match.params)
    console.log("너나와봐", this.props.match)
    console.log("너나와봐", this.props.location)
    //   const {boardId} = match.params;
    this.props.listofArticle(1, 10,boardId); 
    return (
      <div className="content">
        <Row>
                <Col md="2">
                <Button color="warning" onClick={e => this.props.history.push(url)} >
                      <span className="btn-label">
                      </span>
                    추가
                    </Button>
                    </Col>
                    </Row>
        {/* <Row>
          <Col>
          1번
          <ListofNoticeArticles/>
          </Col>
          </Row> */}
          <Row>
            <Col>
          <ListofArticles 
          boardId= {this.props.match.params.boardId}
          />
          </Col>
        </Row>
      </div>
    );  
  }
}

const mapStateToProps = (state) => ({
  datas : state.articlereducers.datas,
  user: state.auth.userDetails
})

const mapDispatchToProps = (dispatch) => ({
  listofArticle: (page, size,boardId) => dispatch(ArticleActions.ListofArticle(page, size,boardId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleMain));