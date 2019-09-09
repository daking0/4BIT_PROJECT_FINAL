/**
 * Update Counsel
 * @author: 황서영
 * 
 * @todo : text 박스로 변경
 * 
 * @description: 
 * - 강사 학생현황 페이지에 학생 상담 내역을 수정하는 컴포넌트
 * 
 * @todo
 * 수정시 <br/> 태그 문제 해결해야함
 * 
 * 
 * */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { CounselActions } from '../../../Actions/CounselActions';
// import HtmlReactParser from 'html-react-parser';
import ReactHtmlParser from 'react-html-parser';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    Col,
    Row,
    Button,
    Input,
    FormGroup,
    Form
  } from "reactstrap";
import { object } from 'prop-types';

class UpdateCounsel extends React.Component{
    constructor(props){
        super(props);
        this.onChangeCounsel = this.onChangeCounsel.bind(this)
        this.state = {
            counsel : this.props.student.counsel,
            studentId : this.props.student.studentId,
            horizontalTabs: "home",
            verticalTabs: "info",
            pageTabs: "homePages",
            openedCollapses: ["collapseOne", "collapse1"],
        }
    }

    onChangeCounsel(e){
        this.setState({
            counsel : e.target.value
        })

    }

    onSubmit(e, studentId) {

        this.state.counsel =  this.state.counsel.replace(/(?:\r\n|\r|\n)/g,'<br/>')

        e.preventDefault();
        this.setState({
            counsel :  this.state.counsel
        })

        if(this.state.counsel.length > 0){
            this.props.updateCounsel(studentId, this.state.counsel)
            .then(response => {
                this.props.readCounsel(studentId)
            })
            .then(response => {
                this.props.history.push("/teacher/studentstatus/view")
            })
        }
    }

    render(){
        const {user} = this.props.student;
        const {username, name} = user;
        let counsel = this.state.counsel;

        return(
            <>
            <div className="content">
               <Col md="9">
                 <Card>
                   <CardBody>
                     <div
                       aria-multiselectable={true}
                       className="card-collapse"
                       id="accordion"
                       role="tablist"
                     >
                       <CardTitle tag="h5"  style={{  fontFamily: "Nanum Myeongjo"}}>학생 상담 내역</CardTitle>
                       <Card className="card-plain">
                         <CardHeader role="tab">
                           <a
                             aria-expanded={this.state.openedCollapses.includes(
                               "collapseOne"
                             )}
                             href="#pablo"
                             data-parent="#accordion"
                             data-toggle="collapse"
                             onClick={() => this.collapsesToggle("collapseOne")}
                           >
                             학생번호 : {username}&nbsp; &nbsp; &nbsp; &nbsp;학생이름 : {name}{" "}
                             <i className="nc-icon nc-minimal-down" />
                           </a>
                         </CardHeader>
                         <Collapse
                           role="tabpanel"
                           isOpen={this.state.openedCollapses.includes(
                             "collapseOne"
                           )}
                         >
                           <CardBody>
                           <Form onSubmit={e => this.onSubmit(e, this.state.studentId)}>
                           <Row>
                            <Col className="pr-1" md="11">
                                <FormGroup >
                                <Input
                                    type="textarea"
                                    value = {counsel}
                                    // value = {HtmlReactParser(counsel).map(
                                    //     (value,index)=>{
                                    //       if(index%2 === 0){
                                    //         return (
                                    //         <div><p>{value}</p></div>);
                                    //       }else{
                                    //         return (
                                    //           <div><br/></div>);
                                    //       }
                                          
                                    //   })
                                    // }
                                    onChange={(e) =>this.onChangeCounsel(e)}
                                />
                                </FormGroup>
                            </Col>
                            </Row>
                        <Row> 
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        </Row>
                           <Row>
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
                           </Row>
                           </Form>
                           </CardBody>
                         </Collapse>
                       </Card>
                     </div>
                   </CardBody>
                 </Card>
               </Col>
           </div>
               </>
        );
    }


}

// function useFormInput(intialValue) {
//     const [value, setValue] = useState(intialValue);
//     const onChange = (e) => setValue(e.target.value);
//     return{
//         value,
//         onChange
//     }
// }

// const UpdateCounsel = ({student, updateCounsel, readCounsel, history}) => {
//     const {studentId, counsel, user} = student;
//     const { username, name } = user;

//     const newCounsel = useFormInput(counsel);

//     const onSubmit = (e) => {
//         e.preventDefault();
//         const counsel = newCounsel.value;

//         if(counsel.length > 0){
//             updateCounsel(studentId, counsel)
//             .then(response => {
//                 readCounsel(studentId)
//             })
//             .then(response => {
//                 history.push("/study/studentstatus/view")
//             })
//         }
//     }

//     return(
//         <div className = "updateCounsel">
//             <h6>상담 내역 작성/수정</h6>
//             <form onSubmit={e=> onSubmit(e)}>
//                 <div className="input-group mb-3">
//                      학생번호 : {username} <br/>
//                      학생이름 : {name}<br/>
//                     <input type="text" {...newCounsel} className="form-control" placeholder={counsel}/>
//                     <div className="input-group-append">
//                     <button className="btn btn-outline-primary" type="submit">확인</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }

const mapStateToProps = (state) => ({
    student : state.counsel.student
 });

 const mapDispatchToProps = (dispatch) => ({
    updateCounsel : (studentId, counsel) => dispatch(CounselActions.UpdateCounsel(studentId, counsel)),
    readCounsel : (studentId) => dispatch(CounselActions.ReadCounsel(studentId))
 });

 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateCounsel));