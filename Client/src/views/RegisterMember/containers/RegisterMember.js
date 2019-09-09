/**
 * RegisterMember
 * 
 * @author: 황서영
 * 
 * @description: 
 * 관리자가 학생, 강사를 등록하는 화면
 * 
 **/

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StudentRegister from '../components/StudentRegister';
import TeacherRegister from '../components/TeacherRegister';
import Select from "react-select";

import {
    Card,
    CardHeader,
    CardBody,
    Col
  } from "reactstrap";
  

class RegisterMember extends React.Component {

    constructor(props){
      super(props);
    }

    state = {
      value: "1"
    }

    _onChange (e){
      if(e.value === "1"){
          this.setState({
            value : "1"
          })
      }else{
          this.setState({
            value : "2"
          })
      }
    }
    
    render(){
      const {value} = this.state;
        return(
            <div className="content" md ="6">
              <Col md = "8">
              <Card>
              <CardHeader>
                  <h5 className="title"  style={{  fontFamily: "Nanum Myeongjo"}}>회원등록</h5>
                </CardHeader>
                <CardBody>
                <Col lg="" md="5" sm="5">
                              <Select
                                className="react-select primary"
                                classNamePrefix="react-select"
                                name="singleSelect"
                                value={this.state.singleSelect}
                                onChange={(e) => this._onChange(e)
                                }
                                options={[
                                  {
                                    value: "",
                                    label: "구분",
                                    isDisabled: true,
                                    
                                  },
                                  { value: "1", label: "학생"},
                                  { value: "2", label: "강사"}
                                ]}
                                placeholder="학생/강사 선택"
                              />
                </Col>
                
                <StudentRegister hidden={value !== "1"}/>
                <TeacherRegister hidden={value !== "2"}/>
                </CardBody>
                </Card>
                </Col>
            </div>
        );
    }
    
}

export default withRouter(connect()(RegisterMember));