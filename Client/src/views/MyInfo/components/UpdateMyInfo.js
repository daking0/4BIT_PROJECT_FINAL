/**
 * Update My Info
 * @author: 황서영
 * 
 * @description: 
 * - 강사, 학생 로그인 후 마이페이지 개인정보에서 개인 정보 수정하는 컴포넌트
 * 
 * @param:
 * UpdateMyInfo(user)
 * 
 * */

import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { SigninActions } from '../../../Actions/SigninActions';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col
  } from "reactstrap";

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => setValue(e.target.value);
    return { 
      value,
      onChange
    }
  }

const UpdateMyInfo = ({user, updateMyInfo, history}) => {
   
    const {userId , username, name, email, phone, password } = user;
    
    const newPassword = useFormInput('');
    const newEmail = useFormInput(email);
    const newPhone = useFormInput(phone);

    const onSubmit = (e) => {
        e.preventDefault();
        const password = newPassword.value;
        const email = newEmail.value;
        const phone = newPhone.value;

        if(password.length > 0){
            updateMyInfo(userId, password, email, phone)
            .then(response => {
                history.push("/student/mypage/myinfo")
            })
        }
    }

    return(
        <>
        <div className ="content" md="6">
        <Col md = "8">
              <Card>

                <CardHeader>
                  <h5 className="title"  style={{  fontFamily: "Nanum Myeongjo"}}>개인정보 수정</h5>
                </CardHeader>

                <CardBody>
                  <Form onSubmit={e => onSubmit(e)}>

                  <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                        <label>회원아이디</label>
                        <Input
                            defaultValue={username}
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>이름</label>
                          <Input
                            defaultValue={name}
                            disabled
                            type="text"
                          />    
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>
                          비밀번호
                          </label>
                          <Input  {...newPassword} type="text" placeholder="변경할 비밀번호를 입력하세요"/>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            E-mail
                          </label>
                          <Input  {...newEmail} type="email" />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>
                          연락처
                          </label>
                          <Input   {...newPhone} type="text" />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button color="success" type="submit">
                <span className="btn-label">
                      <i className="nc-icon nc-check-2" />
                    </span>
                    저장
                </Button>

                <Button color="danger">
                    <i className="nc-icon nc-simple-remove" />
                    취소
                  </Button>
                    </Form>
                </CardBody>
                </Card>

        </Col>
        </div>
        </>
    );

}

const mapStateToProps = (state) => ({
    user : state.auth.userDetails
 });

 const mapDispatchToProps = (dispatch) => ({
    updateMyInfo : (userId, password, email, phone) => dispatch(SigninActions.updateUserMe(userId, password, email, phone)),
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateMyInfo));