
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

class FindUserId extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.state = { open: false };
  }

  state = {
    name: "",
    phone: "",
    open: false
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      name: this.state.name,
      phone: this.state.phone,
    });

    // console.log(this.props.data)
    if (this.state.name.length > 0) {
      this.props.findUserId(this.state.name, this.state.phone)
      .then(response => {
        // const {data} = response.payload
        { response.payload.data.nothing === "해당 이름 또는 연락처로 가입된 회원정보가 존재하지 않습니다." ? alert(response.payload.data.nothing) : alert(response.payload.data.find)}
        this.props.history.push("/")
      })
    }
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
                  <CardTitle tag="h4">ID 찾기</CardTitle>
                </CardHeader>
                <CardBody>
                   <Form onSubmit = {e => this.onSubmit(e)}>
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

// <Popup
// open={this.state.open}
// closeOnDocumentClick
// onClose={this.closeModal}>
//   {this.props.data === find ? this.props.data.find : this.props.data.nothing}
//   {/* {this.props.data.find} */}
// </Popup>


const mapStateToProps = (state) => ({
  auth : state.auth.userDetails,
  name : state.forgotuserinforeducers.name,
  phone : state.forgotuserinforeducers.phone,
  data : state.forgotuserinforeducers.data
});

const mapDispatchToProps = (dispatch) => ({
findUserId: (name,phone) => dispatch(ForgotUserInfoActions.FindUserId(name,phone))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FindUserId));