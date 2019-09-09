/**
 * Create Article
 * @author: dakyung
 * 
 * @description: 
 * 현재 선택한 게시판에 사용자가 입력한 타이틀, 내용으로 새로운 게시물 작성
 * 공부를 위해 1.커스텀 훅 2.useRef 3.statefull 의 3가지 방식으로 코드 작성해두었음.
 * 
 * @param : CreateArticle(boardId,title,content)
 * 
 * */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { ArticleActions, FileActions } from '../../../Actions';
import ToastEditor from "../../../utils/TextEditor/ToastEditor";
// import './createarticle.css';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";

class CreateArticles extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeContent = this.onChangeContent.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this);
    this.state = {
      title: "",
      content: ""
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

  onSubmit(e, content) {
    // e.preventDefault();
    console.log("aa")
    const boardId = this.props.match.params.boardId;
    this.setState({
      title: this.state.title
    });
    const { updateFiles } = this.props;
    console.log('files', this.state.files);

    if (content.length > 0) {
      this.props.createArticle(boardId, this.state.title, content)
        .then(response => {
          console.log(response)
          console.log(response.payload.data.articleId)
          updateFiles(response.payload.data.articleId, this.state.files).then(response => console.log(response));
        })
        .then(response => {
          console.log(this.props.auth.role.roleCode);
          if(this.props.auth.role.roleCode == "role_student"){
            this.props.history.push("/student/board/"+boardId+"/"+1);
          }else if (this.props.auth.role.roleCode == "role_teacher"){
            this.props.history.push("/teacher/board/"+boardId+"/"+1);
          }else if 
          (this.props.auth.role.roleCode == "role_admin"){
            this.props.history.push("/admin/board/"+boardId+"/"+1);
          };             
        });
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

  onChangeTitle(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value
    });
  }

  onChangeContent(e, content) {
    // e.preventDefault();
    console.log(content)
    this.setState({
      content: e.target.value
    });
    console.log(this.state.content)
    this.onSubmit(e, content);
  }

  render() {
    this.createArticle = this.createArticle;
    const { title, content } = this.state;
    console.log("this.props.history", this.props.history)
    console.log("this.props.history.location", this.props.history.location)
    return (
      <div className="content">
        <div className="ArticleInput">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h5>게시판 글쓰기</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={e => this.onSubmit(e)}>
                    <FormGroup className="has-success">
                      <Input type="text" value={this.state.title} onChange={this.onChangeTitle} placeholder="제목을 입력하세요" />
                    </FormGroup>
                    <FormGroup className="has-success">
                      <ToastEditor
                        content={content}
                        onChange={this.onChangeContent}
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
              </Card>
            </Col>
          </Row>
      
        </div>
      </div>
    );
  }
}


const stateToProps = (state) => ({
  auth : state.auth.userDetails
})
const mapDispatchToProps = (dispatch) => ({
  createArticle: (boardId, title, content) => dispatch(ArticleActions.CreateArticle(boardId, title, content))
  , updateFiles: (articleId, files) => dispatch(FileActions.UpdateFiles(articleId, files))
});

export default withRouter(connect(stateToProps, mapDispatchToProps)(CreateArticles));
