/**
 *  StudentRegister
 * @author: 황서영
 * 
 * @description: 학생 등록 폼 컴포넌트
 *
 */

import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { ManageActions } from '../../../Actions/ManageActions';

import {
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col
  } from "reactstrap";

  class StudentRegister extends React.Component{
        
    constructor(props){
      super(props);
      this.onChangeUsername = this.onChangeUsername.bind(this)
      this.onChangePassword = this.onChangePassword.bind(this)
      this.onChangeName = this.onChangeName.bind(this)
      this.onChangeEmail = this.onChangeEmail.bind(this)
      this.onChangePhone = this.onChangePhone.bind(this)
      this.onChangeStudentBirth = this.onChangeStudentBirth.bind(this)
      this.onChangeClassId = this.onChangeClassId.bind(this)

    }


    state = {
      username : "",
      password : "",
      name : "",
      email : "",
      phone : "",
      studentBirth : "",
      classId : "",
      roleCode : 'role_student'
    }

    onSubmit(e){
      e.preventDefault();

      this.setState({
        username : this.state.username,
        password : this.state.password,
        name : this.state.name,
        email : this.state.email,
        phone : this.state.phone,
        studentBirth : this.state.studentBirth,
        classId : this.state.classId,
        roleCode : this.state.roleCode
      })
      if(this.state.username.length > 0){
          this.props.studentRegister(this.state.username, this.state.password, this.state.name, this.state.email, this.state.phone, this.state.studentBirth, this.state.classId, this.state.roleCode)
          .then(reponse => {
              this.props.history.push('/admin/manage/member/list')
          })
      }
  };
  

    onChangeUsername(e){
      this.setState({
        username : e.target.value
      })
    }
    onChangePassword(e){
      this.setState({
        password : e.target.value
      })
    }
    onChangeName(e){
      this.setState({
        name : e.target.value
      })
    }
    onChangeEmail(e){
      this.setState({
        email : e.target.value
      })
    }
    onChangePhone(e){
      this.setState({
          phone : e.target.value
      })
    }
    onChangeStudentBirth(e){
      this.setState({
          studentBirth : e.target.value
      })
    }
    onChangeClassId(e){
      this.setState({
          classId : e.target.value
      })
}

  render(){
     
    return(
      <>
      <div className ="content" md="6"  hidden ={this.props.hidden}>
      <Col md = "10">
              <p></p>
              <Row>
                <h6 className="title">&nbsp; &nbsp; &laquo;학생 등록&raquo;</h6>
              </Row>

                <Form onSubmit={e => this.onSubmit(e)}>

                <Row>
                    <Col className="pr-1" md="7">
                      <FormGroup>
                      <label>학생번호</label>
                      <Input
                          placeholder="개강일8자리+학생번호"
                          value = {this.state.username}
                          onChange={(e) =>this.onChangeUsername(e)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                    <Row>
                    <Col className="pr-1" md="7">
                      <FormGroup>
                        <label>
                        비밀번호
                        </label>
                        <Input placeholder="생년월일8자리" 
                              value = {this.state.password}
                              onChange={(e) =>this.onChangePassword(e)}
                              type="text" />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="7">
                      <FormGroup>
                        <label>이름</label>
                        <Input
                          placeholder="이름"
                          value = {this.state.name}
                          onChange={(e) =>this.onChangeName(e)}
                          type="text"
                        />    
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="7">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          E-mail
                        </label>
                        <Input placeholder="이메일" 
                        value = {this.state.email}
                        onChange={(e) =>this.onChangeEmail(e)}
                        type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col className="pr-1" md="7">
                      <FormGroup>
                        <label>
                        연락처
                        </label>
                        <Input placeholder="010-1234-5678"
                        value = {this.state.phone}
                        onChange={(e) =>this.onChangePhone(e)}
                        type="text" />
                      </FormGroup>
                    </Col>
                  </Row>

                    <Row>
                    <Col className="pr-1" md="7">
                      <FormGroup>
                        <label>
                       생년월일
                        </label>
                        <Input placeholder="19991231" 
                        value = {this.state.studentBirth}
                        onChange={(e) =>this.onChangeStudentBirth(e)}
                        type="text" />
                      </FormGroup>
                    </Col>
                  </Row>

                    <Row>
                    <Col className="pr-1" md="7">
                      <FormGroup>
                        <label>
                        과정 코드
                        </label>
                        <Input placeholder="과정코드" 
                        value = {this.state.classId}
                        onChange={(e) =>this.onChangeClassId(e)} 
                        type="text" />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button color="success" type="submit">
              <span className="btn-label">
                    <i className="nc-icon nc-check-2" />
                  </span>
                  저장
              </Button>

              {/* 취소버튼 누르면 다시 info 페이지로 보내야함 */}
              <Button color="danger">
                  <i className="nc-icon nc-simple-remove" />
                  취소
                </Button>
                  </Form>


      </Col>
      </div>
      </>
    );
  }
  }


const mapDispatchToProps = (dispatch) => ({
    studentRegister : (username, password, name, email, phone, studentBirth, classId, roleCode) => dispatch(ManageActions.RegisterStudent(username, password, name, email, phone, studentBirth, classId, roleCode))
});


export default withRouter(connect(null, mapDispatchToProps)(StudentRegister));