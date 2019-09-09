import React, { Component } from 'react';
import Editor from 'tui-editor';

import 'tui-color-picker/dist/tui-color-picker.min';
import 'tui-editor/dist/tui-editor-extColorSyntax';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
import 'tui-color-picker/dist/tui-color-picker.min.css';
import './ToastEditor.css';
import {Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Container, Form, FormGroup, Input, Label, Button} from "reactstrap";

let toastEditor;
class ToastEditor extends Component {
    constructor(){
        super();
        this.saveArticle = this.saveArticle.bind(this);
    };
    
    componentDidMount(){
        toastEditor = new Editor({
            el: document.querySelector('#editSection'),
            initialEditType: 'wysiwyg', // 'markdown'
            previewStyle: 'vertical',
            height: '300px',
            placeholder: "내용을 입력하세요",
            exts: ['colorSyntax']
        });
        console.log(this.props.content)
    };

    saveArticle(e){
        const content = toastEditor.getHtml();
        console.log(content)
        this.props.onChange(e,content);
    };

    render(){
        const {content} =this.props;
        return (
            <div id="toastEditor">
                <div id="editSection"></div>
                <Button onClick={this.saveArticle}>
                  저장
                </Button>
            </div>
        );
    };
};

export default ToastEditor;