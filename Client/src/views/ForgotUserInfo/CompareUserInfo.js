// /**
//  * Listof Article
//  * @author: 
//  * 
//  * @description: 
//  * */
import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ForgotUserInfoActions } from '../../Actions';

import { Card, CardHeader, CardTitle, CardBody, Row, Col, Form, FormGroup, Input, Button, CardText } from "reactstrap";

class CompareUserInfo extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.state = { open: false };
  }

  state = {
    username: "",
    name: "",
    phone: "",
    open: false
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      username : this.state.username,
      name: this.state.name,
      phone: this.state.phone,
    });


    this.props.compareUserInfo(this.state.username, this.state.name, this.state.phone)
    .then(response => {
      if(this.props.data === true){
        alert("메일인증으로 넘어갑니다.");
        this.props.history.push("/login/compare/forgotpassword");
      }else{
        alert("입력한 회원정보 중 일치하지 않는 정보가 있습니다.")
      }
    })
  };

  // =====
  openModal() {
    this.setState({
      open: true
    });
  }
  closeModal() {  //팝업 닫기
    this.setState({
       open: false 
      });
  }
  // =====
  onChangeUsername = (e) => {
    this.setState({
      username :  e.target.value
    });
  };

  onChangeName = (e) => {
    this.setState({
      name :  e.target.value
    });
  };

  onChangePhone = (e) => {
    this.setState({
      phone :  e.target.value
    });
  };


  render() {
    return (

      <div className="content">
        <div className="FindUserId">
        <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">회원정보 확인</CardTitle>
                </CardHeader>
                <CardBody>
                   <Form onSubmit = {e => this.onSubmit(e)}>
                   <label>ID</label>
                     <FormGroup>
                       <Input placeholder="ID를 입력하세요" type="text" value={this.state.username} onChange={this.onChangeUsername} />
                     </FormGroup>
                     <label>Name</label>
                     <FormGroup>
                       <Input placeholder="이름을 입력하세요" type="text" value={this.state.name} onChange={this.onChangeName} />
                     </FormGroup>
                     <label>Phone</label>
                     <FormGroup>
                       <Input placeholder="전화번호를 입력하세요 ex)010-1234-5678" type="text" value={this.state.phone} onChange={this.onChangePhone}/>
                     </FormGroup>
                     <Button className="btn-round" color="info" type="submit" onClick={this.openModal}>
                     찾기
                   </Button>
                  </Form>
                 </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username : state.forgotuserinforeducers.username,
  name : state.forgotuserinforeducers.name,
  phone : state.forgotuserinforeducers.phone,
  // username : state.forgotuserinforeducers.username
  data : state.forgotuserinforeducers.result
});

const mapDispatchToProps = (dispatch) => ({
  compareUserInfo: (username, name,phone) => dispatch(ForgotUserInfoActions.CompareUserInfo(username, name,phone))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompareUserInfo));
