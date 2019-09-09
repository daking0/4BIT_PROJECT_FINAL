

// /**
//  * @author: Lee JH
//  * 
//  * @description: 
//  * */
// import React,{useState} from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { ForgotUserInfoActions } from '../../../Actions/ForgotUserInfoActions';

// function useFormInput() {
//     const [value, setValue] = useState('');
//     const onChange = (e) => setValue(e.target.value);
//     return { 
//       value,
//       onChange
//     }
//   }
  
//   const FindPassword = ({ findPassword, match,history ,result}) => {
//     const emailInput = useFormInput('');
  
//     const onSubmit = (e) => {
//       e.preventDefault();
//       const email =emailInput.value;
//       if (email.length > 0) {
//         findPassword(email)
//       }
//       console.log(result)
//     };
  
//     return (
//       <div className="FindPassword">
//         <h5>비밀번호찾기</h5>
//         <form onSubmit={e => onSubmit(e)}>
//           <div className="input-group mb-3">
//           <input type="text" {...emailInput} className="form-control" placeholder="email을 입력하세요" />
//             <div className="input-group-append">
//               <button className="btn btn-outline-primary" type="submit">찾기</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     );
//   }
  
//   const stateToProps = (state) =>({
//       result : state.forgotuserinforeducers.result
//   })
//   const mapDispatchToProps = (dispatch) => ({
//     findPassword: (email) => dispatch(ForgotUserInfoActions.FindPassword(email))
//   });
  
//   export default withRouter(connect(stateToProps, mapDispatchToProps)(FindPassword));




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

class FindPassword extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.state = { open: false };
  }

  state = {
    email : "",
    open: false
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      email: this.state.email,
    });

      this.props.findPassword(this.state.email)
      .then(response => {
        console.log(response)
        { response.payload.data.nothing === "해당 이메일로 가입된 회원정보가 존재하지 않습니다." ? alert(response.payload.data.nothing) : alert(response.payload.data.find)}
        this.props.history.push("/")
      })
  };

  // this.props.compareUserInfo(this.state.username, this.state.name, this.state.phone)
  //   .then(response => {
  //     if(this.props.data === true){
  //       alert("메일인증으로 넘어갑니다.");
  //       this.props.history.push("/forgotuserinfo/findpassword");
  //     }else{
  //       alert("입력한 회원정보 중 일 치하지 않는 정보가 있습니다.")
  //     }
  //   })
  // };

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

  onChangeEmail = (e) => {
    this.setState({
      email :  e.target.value
    });
  };

  render() {
    return (

      <div className="content">
        <div className="FindPassword">
        <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">PW 찾기</CardTitle>
                </CardHeader>
                <CardBody>
                   <Form onSubmit = {e => this.onSubmit(e)}>
                     <label>Email</label>
                     <FormGroup>
                       <Input placeholder="E-mail 을 입력하세요" type="text" value={this.state.email} onChange={this.onChangeEmail} />
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
  email : state.forgotuserinforeducers.email,
  data : state.forgotuserinforeducers.result
});

const mapDispatchToProps = (dispatch) => ({
findPassword: (email) => dispatch(ForgotUserInfoActions.FindPassword(email))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FindPassword));