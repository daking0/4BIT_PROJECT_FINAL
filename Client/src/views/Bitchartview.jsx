/*!

=========================================================
* Paper Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartExample9
} from "variables/bithart.jsx";

class bitchartview extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          {/* <p>
            Simple yet flexible React charting for designers &amp; developers.
            Made by our friends from{" "}
            <a
              target="_blank"
              href="https://jerairrest.github.io/react-chartjs-2/"
              rel="noopener noreferrer"
            >
              react-chartjs-2
            </a>
            , a react based wrapper over{" "}
            <a
              target="_blank"
              href="https://www.chartjs.org"
              rel="noopener noreferrer"
            >
              Chart.js
            </a>
            . Please check{" "}
            <a
              target="_blank"
              href="https://github.com/jerairrest/react-chartjs-2"
              rel="noopener noreferrer"
            >
              react-chartjs-2 documentation
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              href="https://www.chartjs.org/docs/latest/"
              rel="noopener noreferrer"
            >
              Chart.js documentation
            </a>{" "}
            .
          </p> */}
          <Row>
            <Col md="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3" style={{  fontFamily: "Nanum Myeongjo"}}>학습 성취도 그래프 </CardTitle>
                </CardHeader>
                <CardBody>
                  <span style={{color:"#f17e5d", fontSize:"16px", fontWeight:"bold"}}>우리반평균</span> <span style={{color:"blue", fontSize:"16px", fontWeight:"bold"}}>내점수</span>
                  <Line
                    data={chartExample9.data}
                    options={chartExample9.options}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>           
    );
  }
}

export default bitchartview;
