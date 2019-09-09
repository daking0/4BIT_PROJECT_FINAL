import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FileActions } from '../../../Actions/FileActions';

// const FileInput = () => {
//     return(
//         <div className="filebox"> 
//         <input className="upload-name" value="파일선택" disabled="disabled"/> 
//         <label for="ex_filename">업로드</label> 
//         <input type="file" id="ex_filename" className="upload-hidden"/> 
        
//         {/* 버튼 누르면 선택창 생김 */}
//         {/* <label for="ex_file">업로드</label>
//         <input type="file" id="ex_file"/> */}
//         </div>
//     );
// }

// // export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileInput));
// export default withRouter(connect(null,null)(FileInput));


class FileInput extends React.Component {
    constructor() {
      super();
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
    state = {
      files: []
    };
    
    onChange(e) {
      var files = e.target.files;
      // console.log(files[0]);
      this.setState({ files: [...this.state.files] });
      console.log(files);
      var filesArr = Array.prototype.slice.call(files);
      this.setState({ files: [...this.state.files, ...filesArr]});
      console.log("aaaaa");
      console.log(filesArr);
      console.log(files);
    }

    onSubmit(e) {
      const { updateFiles } = this.props;
      console.log('files', this.state.files);
      e.preventDefault();
      updateFiles(2, this.state.files).then(response => console.log(response));
      // this.props.updateFiles(5,this.state.files)
      // .then(
      //   reject =>{console.log("실패")}
      // )
    }

    removeFile(f) {
         this.setState({ files: this.state.files.filter(x => x !== f) }); 
    }
    
    //파일추가 폼 추가 버튼
    addFileInput(){
      var inputContents = '<input type="file" multiple onChange={this.onChange} />'
      var list = document.createElement("input");
      list.setAttribute("type","file");
      list.setAttribute("multiple","");
      
      var att = document.createAttribute("onChange");
      att.value = onchange => this.onChange.bind(this);
      // list.setAttribute("onchange","onchange")
      // h1.setAttributeNode(att);
      
      // this.onChange = this.onChange.bind(this);
      // var c = this.onChange.bind(this);
      // list.setAttribute("onchange",{c})
      list.setAttributeNode(att);
      // list.innerHTML=inputContents;
      document.getElementById('inputarea').appendChild(list);
    }

    render() {
      return (
        <div>
          <form onSubmit={e => this.onSubmit(e)}>
          <label className="custom-file-upload" id="inputarea">
           <button type="button" onClick={this.addFileInput.bind(this)}>추가</button>
            <input type="file" multiple onChange={this.onChange} />
            <i className="fa fa-cloud-upload" /> Attach
          </label>
          {this.state.files.map(x => 
             <div className="file-preview" onClick={this.removeFile.bind(this, x)}>{x.name}</div>
           )}
           <button type="submit">보내기</button>
           </form>
        </div>
      );
    }
  }

 function mapDispatchToProps(dispatch){
    return{
      updateFiles: (articleId,files) =>
        dispatch(FileActions.UpdateFiles(articleId,files))
    }
  };
  
  export default withRouter(connect(null,mapDispatchToProps)(FileInput));