import { isAuthenticated } from "../utils";
import { ActionTypes } from '../utils/ActionTypeList';

//파일 업로드하기
// EndPoint : http://localhost:8080/fileupload/files?articleId=14
const UpdateFiles = (articleId,files) => {
  let formData = new FormData();
  files.map((file, index) => 
    formData.append('files', file));
  
  // formData.append('files', files[0]);
    return ({
      type: ActionTypes.UPDATE_FILES,
      payload: {
        request: {
          method: 'POST',
          url: `/fileupload/files?articleId=${articleId}`,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }
      }
    })
  }



  //숙제파일 업로드하기
// EndPoint : http://localhost:8080/fileupload/files?articleId=14
const HwUpdateFiles = (hwArticleId,files) => {
  let formData = new FormData();
  files.map((file, index) => 
    formData.append('files', file));
  
  // formData.append('files', files[0]);
    return ({
      type: ActionTypes.UPDATE_FILES,
      payload: {
        request: {
          method: 'POST',
          url: `/fileupload/files?articleId=${hwArticleId}`,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }
      }
    })
  }

//파일 목록 가져오기
// /articlefile/filelist?articleId=15
const ListOfFiles = (articleId) => {
    return ({
      type: ActionTypes.LISTOF_FILES,
      payload: {
        request: {
          method: 'GET',
          url: `/articlefile/filelist?articleId=${articleId}`
        }
      }
    })
  }

//파일 다운로드하기
// /fileupload/files/{fileName:.+}
const DownloadFiles = (filename) => {
  return({
    type : ActionTypes.DOWN_FILES,
    payload:{
      request :{
        method: 'GET',
        url : `/fileupload/files/${filename}`
      }
    }
  })
}


  export const FileActions = {
    UpdateFiles
    ,ListOfFiles
    ,DownloadFiles
    ,HwUpdateFiles
  };