// /**
//  * TestGroup Main
//  * @author: chaeyeon
//  * 
//  * @description: 
//  * 반별 시험 진행 중 전체 출력
//  * 
//  * @param:
//  * listOfTestGroup(page, size)
//  * 
//  * */

// import React, { useRef } from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from "react-redux";
// import { ListOfTestGroup } from '../TestGroupIndex';
// import { TestGroupActions } from '../../../Actions/TestGroupActions';

// import {
//     Card,
//     CardHeader,
//     CardBody,
//     CardTitle,
//     Table,
//     Row,
//     Col,
//     Container,
//     Button
// } from "reactstrap";

// const TestGroupMain = ({ user, listOfTestGroup, createTestGroup, history }) => {
//     listOfTestGroup(1, 10);

//     let name = useRef(''); // testName
//     let startTime = useRef(''); // testStartTime
//     let endTime = useRef(''); // testEndTime
//     let description = useRef('');

//     const { userId } = user; //현재 로그인 된 유저의 userId

//     const { role } = user;
//     const { roleCode } = role;
//     console.log(roleCode);
//     console.log(role.roleCode);

//     // 시험작성 버튼 제한
//     const CompareUser = () => {
//         if (role.roleCode === "role_student") { // 학생일 때는 
//             return true // 보이지 않음
//         } else { // 그렇지 않으면
//             return false //  보임
//         }
//     }

//     const onCreateTestGroup = (e) => {
//         e.preventDefault();
//         const testName = name.current.value;
//         const testStartTime = startTime.current.value;
//         const testEndTime = endTime.current.value;
//         const testDescription = description.current.value
//         console.log("메인테스트",testName,testStartTime,testEndTime,testDescription)
//         console.log()
//         createTestGroup(testName, testStartTime, testEndTime, testDescription) // 받은 값으로 실행
//             .then(response => {
//                 history.push("/teacher/class/test/write");
//             })
//     };

//     return (
//         <div className="content">
//             <div className="TestGroup">
//               <CardTitle tag="h4">시험 진행 중 / 진행 완료 리스트</CardTitle>
//                 <CardBody>
//                     <ListOfTestGroup />
//                 </CardBody>
//                 <Button onClick={e => onCreateTestGroup(e)} hidden={CompareUser()}>시험작성</Button>
//             </div>
//         </div>
//     );

//     // return (

//     //     <div className="TestGroup">

//     //         <div className="TestGroupList">
//     //             <ListOfTestGroup />
//     //         </div>
//     //         <form onSubmit={e => onSubmit(e)}>
//     //             <div className="input-group-append">
//     //                 <button className="btn btn-outline-primary" type="submit">시험작성</button>
//     //             </div>
//     //         </form>
//     //     </div>

//     // );
// }

// const mapStateToProps = (state) => ({
//     user: state.auth.userDetails //현재 user의 userDetails
// });

// const mapDispatchToProps = (dispatch) => ({
//     createTestGroup: (testName, testStartTime, testEndTime, testDescription) => dispatch(TestGroupActions.CreateTestGroup(testName, testStartTime, testEndTime, testDescription)),
//     listOfTestGroup: (page, size) => dispatch(TestGroupActions.ListOfTestGroup(page, size))
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestGroupMain));

/**
 * TestGroup Main
 * @author: chaeyeon
 * 
 * @description: 
 * 반별 시험 진행 중 전체 출력
 * 
 * @param:
 * listOfTestGroup(page, size)
 * 
 * */

import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { ListOfTestGroup } from '../TestGroupIndex';
import { TestGroupActions } from '../../../Actions/TestGroupActions';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Container,
    Button
} from "reactstrap";

const TestGroupMain = ({ user, listOfTestGroup, createTestGroup, history }) => {
    listOfTestGroup(1, 10);

    let name = useRef(''); // testName
    let startTime = useRef(''); // testStartTime
    let endTime = useRef(''); // testEndTime
    let description = useRef('');

    const { userId } = user; //현재 로그인 된 유저의 userId

    const { role } = user;
    const { roleCode } = role;
    console.log(roleCode);
    console.log(role.roleCode);

    // 시험작성 버튼 제한
    const CompareUser = () => {
        if (role.roleCode === "role_student") { // 학생일 때는 
            return true // 보이지 않음
        } else { // 그렇지 않으면
            return false //  보임
        }
    }

    const onCreateTestGroup = (e) => {
        e.preventDefault();
        const testName = name.current.value;
        const testStartTime = startTime.current.value;
        const testEndTime = endTime.current.value;
        const testDescription = description.current.value
        createTestGroup(testName, testStartTime, testEndTime, testDescription) // 받은 값으로 실행
            .then(response => {
                history.push("/teacher/class/test/write");
            })
    };

    return (
        <div className="content">
            <Row>
            {/* <div className="TestGroup"> */}
            <Col md="2">
            <Button  color="warning" onClick={e => onCreateTestGroup(e)} hidden={CompareUser()}>
            <span className="btn-label">
                        <i className="nc-icon nc-simple-add" />
                      </span>
                      시험 출제
                      </Button>

            </Col>
            </Row>
            <Row>
            <Col>
               
                    <ListOfTestGroup /></Col>
        </Row>
            {/* </div> */}
        </div>
    );

}

const mapStateToProps = (state) => ({
    user: state.auth.userDetails //현재 user의 userDetails
});

const mapDispatchToProps = (dispatch) => ({
    createTestGroup: (testName, testStartTime, testEndTime, testDescription) => dispatch(TestGroupActions.CreateTestGroup(testName, testStartTime, testEndTime, testDescription)),
    listOfTestGroup: (page, size) => dispatch(TestGroupActions.ListOfTestGroup(page, size))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestGroupMain));