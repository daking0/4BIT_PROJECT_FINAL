/*!

=========================================================
* Paper Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SigninActions,ArticleActions, MyInfoActions } from '../../Actions'
import { ActionTypes } from '../../utils/ActionTypeList';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap";

const loginAsync = (username, password) => (dispatch) => {
  return dispatch(SigninActions.login(username, password)) //로그인 액션해
    .then(response => { 
      if (response.type === ActionTypes.LOGIN_SUCCESS) { //로그인 성공했으면
        return dispatch(SigninActions.getUserMe()) //로그인정보로 유저 찾아

      } else {
        return Promise.reject(response);
      }
    })
    .then(response => {
      if (response.type === ActionTypes.GET_USERME_SUCCESS) { //getuserme를 성공했어? 
        // this.props.history.push("/board/dashboard")
        return dispatch(ArticleActions.ListofArticle(1,10,"notice")); // 그럼 메인 notice리스트 나와
      } else {
        return Promise.reject(response);
      }
    });
}

class Login extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }
  
  constructor(props){
    super(props)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.FindIdhandler = this.FindIdhandler.bind(this)
    this.FindPwhandler = this.FindPwhandler.bind(this)
  }
  state = {
    username :"",
    password : ""
    ,
    url:""
  }

  onChangeUsername(e) {
    e.preventDefault();
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e){
    e.preventDefault();
    this.setState({
      password : e.target.value
    });
  }

  FindIdhandler(e){
    e.preventDefault();
    this.props.history.push("/login/compare/forgotid")
  }

  FindPwhandler(e){
    e.preventDefault();
    this.props.history.push("/login/compare")
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.login(this.state.username, this.state.password)

      .then(response => {
        const {role} = this.props.auth;
        const {roleCode} = role;
        if(roleCode === "role_student"){
            this.setState({
              url : "/student"})
        } else if(roleCode === "role_teacher"){
          this.setState({
          url : "/teacher"})
        } else {
          this.setState({
          url : "/admin"})
        }

        if(roleCode === "role_student"){
          this.props.getStudentProfile(this.props.auth.userId)
        } else if(roleCode === "role_teacher"){
          this.props.getTeacherProfile(this.props.auth.userId)
        }else if(roleCode === "role_admin"){
          this.props.getAdminProfile(this.props.auth.userId)
        }

        const location = {
          pathname: this.state.url+"/dashboard",
          state: { User: this.state.url }
        }
        console.log(location)
        this.props.history.push(location);
      })
      .catch(error => {
        console.log('error >> ', error);
      });
  };

  render() {
    return (
      <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className="full-page section-image">
      <div className="login-page">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form action="" className="form" method="">
                <Card className="card-login">
                  <CardHeader>
                    <CardHeader>
                      <h3 className="header text-center">FOR BITCAMP</h3>
                    </CardHeader>
                  </CardHeader>
                  <CardBody>
                  <InputGroup>
                  <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                        </InputGroupAddon>
               <Input value={this.state.username}  onChange={this.onChangeUsername} type="text" placeholder="아이디"/>
               </InputGroup>
               <InputGroup>
               <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
               <Input value={this.state.password}  onChange={this.onChangePassword} placeholder="비밀번호"
                    type="password"
                    autoComplete="off"/>
                    </InputGroup>
                <br />
              </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="btn-round mb-3"
                      color="primary"
                      href="#pablo"
                      onClick={this.onSubmit}
                    >
                      로그인
                    </Button>

                    {/* 아이디 찾기 비번찾기 컴포넌트 붙여용 */}
                    <Row>
                    <Col className="ml-auto mr-auto" mb ="3">
                    <Button color="warning" className="btn-round mb-3" onClick={e=>this.FindIdhandler(e)}>
                    <i className="nc-icon nc-zoom-split" />
                    아이디 찾기
                  </Button>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                  <Button color="warning" className="btn-round mb-3" onClick={e=>this.FindPwhandler(e)}>
                    <i className="nc-icon nc-zoom-split" />
                    비밀번호 찾기
                  </Button>
                  </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
        <div
          className="full-page-background"
          style={{
            backgroundImage: `url(${require("assets/img/bg/rawpixel-com.jpg")})`
          }}
        />
      </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth : state.auth.userDetails
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(loginAsync(username, password)),
  getStudentProfile : (userId) => dispatch(MyInfoActions.GetStudentProfile(userId)),
  getTeacherProfile : (userId) => dispatch(MyInfoActions.GetTeacherProfile(userId)),
  getAdminProfile : (userId) => dispatch(MyInfoActions.GetAdminProfile(userId)) 
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));