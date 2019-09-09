/**
 * Read My Info
 * @author: 황서영
 * 
 * @description: 
 * - 강사, 학생 로그인 후 마이페이지에서 개인 정보 읽는 페이지
 * 
 * 리듀서 초기 세팅 때문에 userDetails에서 user 정보를 받아오는 상황
 * 그래서 렌더링이 안되고 있음
 * 
 * */

 import React,{useState, useEffect} from 'react';
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
  


 const ReadMyInfo = ({user, getUserMe, history}) => {

    const {username, name, email, phone} = user;

    const [outputInfo, setOutputInfo] = useState([]);

    useEffect(() => {
        if(outputInfo !== undefined) {
            if(outputInfo === null){
                getUserMe()
                .then(response => {
                    const{data} = response.payload.data;
                    setOutputInfo(data);
                })
            }
        }
    })


    const updateMyInfoHandler = (e)=>{
        e.stopPropagation();
        history.push('/student/mypage/myinfo/edit');
    }

     return(
        <>
        <div className ="content" md="6">
        <Col md = "8">
              <Card>
                <CardHeader>
                  <h5 className="title"  style={{  fontFamily: "Nanum Myeongjo"}}>내 정보</h5>
                </CardHeader>
                <CardBody>
                  <Form>

                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                        <label>회원아이디</label>
                        <Input
                            defaultValue={username}
                            disabled
                            type="text"
                          />
                          <p className="form-control-static">
                          {username}
                          </p>
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
                          <p className="form-control-static">
                            {name}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            E-mail
                          </label>
                          <Input placeholder={email} disabled type="email" />
                          <p className="form-control-static">
                          {email}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>
                          연락처
                          </label>
                          <Input placeholder={phone} disabled type="text" />
                          <p className="form-control-static">
                          {phone}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                
                </Form>
                </CardBody>
                </Card>

                <Button color="info" onClick={e => updateMyInfoHandler(e)}>
                    <span className="btn-label">
                      <i className="nc-icon nc-settings-gear-65" />
                    </span>
                    개인정보 수정
                </Button>
              </Col>
              </div>
         </>
     );
 };

 const mapStateToProps = (state) => ({
    user : state.auth.userDetails
 });

 const mapDispatchToProps = (dispatch) => ({
    getUserMe : (userId) => dispatch(SigninActions.getUserMe(userId)) 
});

 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadMyInfo));