/**
 * LogOut
 * @author: dakyung
 * 
 * @description: 
 * -로그아웃 (버튼 누르면 !isAuthenticated(auth)를 리턴함으로 권한 사라짐)
 * 
 * @param:
 * SigninActions.logout()
 * 
 * */
import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { SigninActions } from '../../Actions'
import isAuthenticated  from '../../utils/isAuthenticated';

import {
    Button
  } from "reactstrap";

const Logout = ({auth,logout,history}) => {
    const isHiddenLogout = () => {
        return !isAuthenticated(auth);
    };
    
    const logoutHandler = (e) => {
        logout()
        history.push("/"); //logout하면 then으로 돌아오질않아서 그냥 따로 이동시켜줌
    }
    return(
        <Button type="button" color="default" onClick={e => logoutHandler(e)} hidden={isHiddenLogout()}>Logout</Button>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
  });

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(SigninActions.logout())
  });
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));