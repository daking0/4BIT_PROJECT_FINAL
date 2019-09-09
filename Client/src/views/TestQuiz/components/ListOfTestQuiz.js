/**
 * List Of TestQuiz
 * @author: chaeyeon
 * 
 * @description:
 * 
 * @param : ListOfTestQuiz(testId)
 * 
 * */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col
} from "reactstrap";

const ListOfTestQuiz = ({data, items, hiistory }) => {
    const {testName} = data;
    return (
        <div className="content">
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4"> {testName}문제</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <td>문제 번호</td>
                                    <td>문제 내용</td>
                                    <td>배점</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        items.map((item, index) => {
                                            const { quiz } = item;
                                            const { quizContents, quizEachScore } = quiz;
                                            return (
                                                <tr>
                                                    <td>{index+1} </td>
                                                    <td>{quizContents} </td>
                                                    <td>{quizEachScore} </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = (state) => ({
    data: state.testgroupreducers.datas,
    items: state.testquizreducers.items
});

export default withRouter(connect(mapStateToProps, null)(ListOfTestQuiz));