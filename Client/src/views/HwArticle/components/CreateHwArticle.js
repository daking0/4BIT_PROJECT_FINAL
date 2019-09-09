/**
 * Create HwArticle
 * @author: 영빈
 * */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { HwArticleActions } from '../../../Actions/HwArticleActions';
import { FileActions } from '../../../Actions';
import ToastEditor from "../../../utils/TextEditor/ToastEditor";
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Table, Row, Col, Container, Form, FormGroup, Input, Label, Button } from "reactstrap";

class CreateHwArticle extends Component {
  constructor(props) {
    super(props);
    this.onChangeHwContents = this.onChangeHwContents.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      hwContents: ""
      , files: []
    }
  }

  onChange(e) {
    var files = e.target.files;
    this.setState({ files: [...this.state.files] });
    console.log(files);
    var filesArr = Array.prototype.slice.call(files);
    this.setState({ files: [...this.state.files, ...filesArr] });
    console.log("aaaaa");
    console.log(filesArr);
    console.log(files);
  }

  onSubmit(e, hwContents) {
    console.log('onSubmit에 들어온 hwContents 값: ' + hwContents)
    const hwId = this.props.match.params.hwId;
    // this.setState({
    //   hwContents: this.state.hwContents
    // });

    const { updateFiles } = this.props;
    console.log('files', this.state.files);

    if (hwContents.length > 0) {
      this.props.createHwArticle(hwId, hwContents)  //이 시점에서 hwArticle 만들어짐

      .then(response => {
        console.log(response)
        console.log(response.payload.data.hwArticleId)
        this.props.hwUpdateFiles(response.payload.data.hwArticleId, this.state.files)
        .then(response => {
          // const hwArticleId = response.payload.data.hwArticleId
          if (response.payload.request.method !== "POST") {

            console.log("hwArticleId >>> " +this.props.hwarticleid )
            this.props.retrieveHwArticle(this.props.hwarticleid)
              .then(response => {   // 이후 방금 만들어진 글 상세보기로 이동
                if (response.payload.request.method !== "POST") {
                  console.log("hwArticleId >>> " + this.props.hwarticleid)
                  this.props.history.push("/student/class/assignment/hwArticle/" + this.props.hwarticleid);
                }
              })
          }
        })
    })
  }
  };

  //파일추가 폼 추가 버튼
  addFileInput() {
    // var inputContents = '<input type="file" multiple onChange={this.onChange} />'
    var list = document.createElement("input");
    list.setAttribute("type", "file");
    list.setAttribute("multiple", "");

    var att = document.createAttribute("onChange");
    att.value = onchange => this.onChange.bind(this);
    list.setAttributeNode(att);
    document.getElementById('inputarea').appendChild(list);
  }

  removeFile(f) {
    this.setState({ files: this.state.files.filter(x => x !== f) });
  }

  onChangeHwContents(e, hwContents) {
    console.log('onChangeHwContents에 들어온 hwContents: ' + hwContents)

    // this.setState({
    //   hwContents: e.target.value
    // });
    this.onSubmit(e, hwContents)
  }


  render() {
    this.createHwArticle = this.createHwArticle;
    const { hwContents } = this.state;
    const hwId = this.props.match.params.hwId;

    return (
      <div className="content">
        <div className="HwArticleInput">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h5>{hwId}번 과제 제출하기</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={e => this.onSubmit(e)}>
                    <FormGroup className="has-success">
                      <ToastEditor
                        content={hwContents}
                        onChange={this.onChangeHwContents}
                      />
                    </FormGroup>
                  </Form>
                  <Row>
            <Col>
            {/* <i className="fa fa-cloud-upload" /> */}
              <input type="file" multiple onChange={this.onChange} />
              <input type="file" multiple onChange={this.onChange} />
              {this.state.files.map(x =>
                <div className="file-preview" onClick={this.removeFile.bind(this, x)}>{x.name}</div>
              )}
              {/* <Button type="submit">보내기</Button> */}
            </Col>
          </Row>
                </CardBody>

                {/* <CardFooter>
                  <Form onSubmit={e => this.onSubmit(e)}>
                    <Input type="file" />
                  </Form>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.hwarticlereducers.items,
  hwarticleid : state.hwarticlereducers.HwArticleId 
});

const mapDispatchToProps = (dispatch) => ({
  createHwArticle: (hwId, hwContents) => dispatch(HwArticleActions.CreateHwArticle(hwId, hwContents)),
  retrieveHwArticle: (hwArticleId) => dispatch(HwArticleActions.RetrieveHwArticle(hwArticleId))
  , hwUpdateFiles: (hwArticleId, files) => dispatch(FileActions.HwUpdateFiles(hwArticleId, files))

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateHwArticle));
