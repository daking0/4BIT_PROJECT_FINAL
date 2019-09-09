/**
 * List Of Member
 * @author: 황서영
 * 
 * @description: 
 * - 관리자 화면 멤버 리스트 화면 // 강사 + 학생
 *
 * */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import ListOfStudentByAdmin from '../components/ListOfStudentByAdmin';
import ListOfTeacherByAdmin from '../components/ListOfTeacherByAdmin';

const ListOfMember = () => {
    
    return(
        <div className = "content">
        <div>
            <ListOfTeacherByAdmin/>
            <ListOfStudentByAdmin/>
        </div>
        </div>
    );

}

export default withRouter(connect(null,null)(ListOfMember));