/**
 * Read Counsel
 * @author: 황서영
 * 
 * @description: 
 * - 강사 학생현황 페이지에 상담내역 읽어오는 컴포넌트
 * 
 * @param:
 * readCounsel(readCounsel)
 * 
 * */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { CounselActions } from '../../../Actions/CounselActions';
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
    Button
  } from "reactstrap";

class RetrieveCounsel extends React.Component{

    constructor(props){
        super(props);
        this.updateCounselHandler = this.updateCounselHandler.bind(this)
        this.state = {
            horizontalTabs: "home",
            verticalTabs: "info",
            pageTabs: "homePages",
            openedCollapses: ["collapseOne", "collapse1"]
          };
    }

    updateCounselHandler = (e, studentId) => {
        e.stopPropagation();
        this.props.readCounsel(studentId)
        .then(response => {
            this.props.history.push("/teacher/studentstatus/modify");
        })
    }

    collapsesToggle = collapse => {
        let openedCollapses = this.state.openedCollapses;
        if (openedCollapses.includes(collapse)) {
          this.setState({
            openedCollapses: openedCollapses.filter(item => item !== collapse)
          });
        } else {
          openedCollapses.push(collapse);
          this.setState({
            openedCollapses: openedCollapses
          });
        }
      };

    render(){
        const { user, counsel} = this.props.student;
        const {username, name} = user;
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
                    <CardTitle tag="h5"  style={{  fontFamily: "Nanum Myeongjo"}} >학생 상담 내역</CardTitle>
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
                        <Row>
                        {ReactHtmlParser(counsel)}
                        </Row>
                        <Row> 
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        </Row>
                        <Row>
                        <Button color="info" onClick={(e) => this.updateCounselHandler(e, this.props.student.studentId)}>
                            <span className="btn-label">
                            <i className="nc-icon nc-settings-gear-65" />
                            </span>
                            상담내역 작성
                        </Button>
                        </Row>
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

//  const RetrieveCounsel = ({student, readCounsel, history}) => {
     
//     const [outputStudent, setOutputStudent] = useState(null);
//     useEffect(() => {
//         if(outputStudent !== undefined) {
//             if(outputStudent === null){
//                 readCounsel(studentId)
//                 .then(response => {
//                     const {student} = response.payload.data;
//                     setOutputStudent(student);
//                 })
//             }
//         }
//     })

//     const {studentId, user, counsel} = student;
//     const {username, name} = user;

//      //수정버튼
//      const updateCounselHandler = (e, studentId) => {
//          e.stopPropagation();
//          readCounsel(studentId)
//          .then(response => {
//              history.push("/study/studentstatus/modify");
//          })
//      }

//      return(
//          <div>
//              <li>
//              학생번호 : {username} <br/>
//              학생이름 : {name}<br/>
//              상담내용 : {counsel}
//              </li> 
//              <button type="button" className="btn btn-success" onClick={e=>updateCounselHandler(e, studentId)}>수정</button>
//          </div>
//      );
//  };

 const mapStateToProps = (state) => ({
    student : state.counsel.student
 });

 const mapDispatchToProps = (dispatch) => ({
    readCounsel : (studentId) => dispatch(CounselActions.ReadCounsel(studentId))
 });

 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetrieveCounsel));