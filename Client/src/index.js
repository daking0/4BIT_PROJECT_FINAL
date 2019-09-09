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
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
import { multiClientMiddleware } from 'redux-axios-middleware';
import rootReducers from 'Reducers';

import AuthLayout from "layouts/Auth.jsx";
import AdminLayout from "layouts/Admin.jsx";
import StudentLayout from "layouts/Student.jsx";
import TeacherLayout from "layouts/Teacher.jsx";

import Login from "./views/pages/Login.jsx";
import CompareUserInfo from 'views/ForgotUserInfo/CompareUserInfo.js';
import FindPassword  from 'views/ForgotUserInfo/FindPassword.js';
import FindUserId  from 'views/ForgotUserInfo/FindUserId.js';

// import { BrowserRouter as Router } from 'react-router-dom';
import axiosMiddleware from 'redux-axios-middleware';
import { StateLoader, interceptors, onErrorHandler } from './utils';
import * as serviceWorker from './serviceWorker';

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

const hist = createBrowserHistory();

//axios는  promise 기반 http client
const clientId = '762f6bbb-a257-11e9-9b39-0242ac120002';
const clientSecret = 'c16b2a8b36678a7440caeda356534ef2fa75699098bb7d58d499541024e53a51';

const client = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    'Cache-Control': 'no-cache'
  },
  responseType: 'json'
});

const middlewareConfig = {
  interceptors, //권한주는 미들웨어
  onError: onErrorHandler
};

const logger = createLogger({
  collapsed: true
});

const stateLoader = new StateLoader();

const store = createStore(
  rootReducers, //combine해서 한번에 리듀서 받기
  stateLoader.loadState(),
  applyMiddleware(axiosMiddleware(client, middlewareConfig), logger, thunk)
);

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});


{/* <BrowserRouter
  basename={optionalString}
/> */}

// const location = {
//   path: "/student",
//   state: { User: "/student" }
// }

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/teacher" render={props => <TeacherLayout {...props} />} />
        <Route path="/student" render={props => <StudentLayout {...props} />} />
        <Route exact path="/login/compare/forgotpassword" component={FindPassword}/>
        <Route exact path="/login/compare/forgotid" component={FindUserId}/>
        <Route exact path="/login/compare" component={CompareUserInfo}/>
        <Route exact path="/" component={Login}/>
        
        {/* <Route exact path="board/:boardId/:articleId/modify" component={UpdateArticles}/> */}
        {/* <Redirect to="/admin/dashboard"/> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can hchange
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();