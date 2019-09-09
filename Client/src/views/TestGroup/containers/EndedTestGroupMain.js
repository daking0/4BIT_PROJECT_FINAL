/**
 * Article Main
 * @author: chaeyeon
 * 
 * @description: 
 * 반별 시험 진행완료 전체 출력
 * 
 * @param:
 * listOfEndedTestGroup(page, size)
 * 
 * */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { ListOfEndedTestGroup } from '../TestGroupIndex';
import { TestGroupActions } from '../../../Actions/TestGroupActions';
import Bitchartview from "../../Bitchartview.jsx";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

const EndedTestGroupMain = ({ listOfEndedTestGroup, history }) => {
    listOfEndedTestGroup(1, 10);

    return (
        <div className="content">
            {/* <div className="EndedTestGroupMain"> */}
                <Card>
                <CardHeader>
                    <h5 style={{  fontFamily: "Nanum Myeongjo"}}>지난 시험 리스트</h5>
                    </CardHeader>
                <CardBody>
                     <Bitchartview/>
                    <ListOfEndedTestGroup />
                </CardBody>
            {/* </div> */}
            </Card>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    listOfEndedTestGroup: (page, size) => dispatch(TestGroupActions.ListOfEndedTestGroup(page, size))
});

export default withRouter(connect(null, mapDispatchToProps)(EndedTestGroupMain));
