// /**
//  * Register ClassGroup
//  * @author: Lee JH
//  *  update : 황서영
//  * @description:
//  *  클래스 등록 폼
//  * 
//  * @param: 
//  */


import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { ClassGroupActions } from '../../../Actions/ClassGroupActions';
import Select from "react-select";
import ReactDatetime from "react-datetime";

import {
    Card,
    CardHeader,
    CardBody,
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col
  } from "reactstrap";
import moment, { isMoment } from 'moment';



class RegisterClassGroup extends React.Component{
    constructor(props){
        super(props);
        this.onChangeClassName = this.onChangeClassName.bind(this)
        this.onChangeStartDate = this.onChangeStartDate.bind(this)
        this.onChangeEndDate = this.onChangeEndDate.bind(this)
        this.onChangeSubject = this.onChangeSubject.bind(this)
        this.onChangeCode = this.onChangeCode.bind(this)
    
    }

    state ={
        className : "",
        startDate : "",
        endDate : "",
        subject : "",
        branchCode : ""
    }



    onSubmit(e){
        e.preventDefault();
        this.setState({
            className : this.state.className,
            startDate : this.state.startDate,
            endDate : this.state.endDate,
            subject : this.state.subject,
            branchCode : this.state.branchCode
        })
        console.log('onsubmit::endData >> ', this.state.endDate);

        if(this.state.className.length > 0){
            this.props.registerClassGroup(this.state.className,this.state.startDate,this.state.endDate,this.state.subject,this.state.branchCode)
            .then(response => {
                this.props.history.push('/admin/manage/class/list')
            })  
        }
        
    }

    onChangeClassName(e){
        this.setState({
            className : e.target.value
        })
    }

    
    onChangeStartDate(value){

        let startDate;
        if (isMoment(value)) {
            startDate = value.format();
        } else {
            startDate = moment(value).format();
        }
        this.setState({
            startDate :startDate
        });
        
    }

    onChangeEndDate(value){
        let endDate;
        if (isMoment(value)) {
            endDate = value.format();
        } else {
            endDate = moment(value).format();
        }
        this.setState({
            endDate : endDate
        });
    }
    
    onChangeSubject(e){
        this.setState({
            subject : e.target.value
        })
    }

    onChangeCode(e){
        this.setState({
            branchCode : e.value
        })
    }

    render(){

        return(
            <div className="content" md ="6">
        <Col md = "8">
        <Card>
        <CardHeader>
            <h5 className="title"  style={{  fontFamily: "Nanum Myeongjo"}} >클래스 등록</h5>
          </CardHeader>
          <CardBody>
        <Form onSubmit={e => this.onSubmit(e)}>

                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup >
                        <label>클래스 이름</label>
                        <Input
                            placeholder="과정명"
                            type="text"
                            value = {this.state.className}
                            onChange={(e) =>this.onChangeClassName(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                        <label>과목명</label>
                        <Input
                            placeholder="과목명"
                            type="text"
                            value = {this.state.subject}
                            onChange={e =>this.onChangeSubject(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                    <Col className="pr-1" md="6">
                    <FormGroup>
                        <label>시작일</label>
                    <ReactDatetime
                      dateFormat ={"YYYY-MM-DD"}
                      timeFormat ={"hh:mm"}
                      value = {moment(this.state.startDate)}
                      onChange={(value) => this.onChangeStartDate(value)}
                      closeOnSelect = {true}
                      inputProps={{
                        className: "form-control",
                        placeholder: "시작일 선택"
                      }}
                      
                    />
                    </FormGroup>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="pr-1" md="6">
                    <FormGroup>
                        <label>종료일</label>
                    <ReactDatetime
                    dateFormat ={"YYYY-MM-DD"}
                    timeFormat ={"hh:mm"}
                      value ={moment(this.state.endDate)}
                      onChange={(value) => this.onChangeEndDate(value)}
                      closeOnSelect = {true}
                      inputProps={{
                        className: "form-control",
                        placeholder: "종료일 선택"
                    }}
                    
                    />
                    </FormGroup>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="pr-1" md="6">
                    <label>소속 센터</label>
                    <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            name="singleSelect"
                            value={this.state.singleSelect}
                            onChange={(e) =>this.onChangeCode(e)}
                            options={[
                                {
                                value: "",
                                label: "구분",
                                isDisabled: true,
                                
                                },
                                { value: "sinchon", label: "신촌"},
                                { value: "gangnam", label: "강남"},
                                { value: "seocho", label: "서초"}
                            ]}
                            placeholder="소속 센터 선택"
                            />
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
            </CardBody>
        </Card>
        </Col>
    </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    registerClassGroup: (className, startDate, endDate, subject, branchCode) => dispatch(ClassGroupActions.RegisterClassGroup(className, startDate, endDate, subject, branchCode))
});

export default withRouter(connect(null, mapDispatchToProps)(RegisterClassGroup));
