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
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import Adminroutes from "AdminRoutes.js";

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  //라우터 가져오기
  getRoutes = routes => {
    return routes.map((prop, key) => { //라우터를 다 꺼내서
      if (prop.collapse) { //라우터의 collapse가 true면
        return this.getRoutes(prop.views); // /admin 뒤로 들어오는 routes안에 view들
      }

      if (prop.layout === "/admin") { //들어온 view애들의 layout이 admin이면
        return ( // /admin 으로 연결되는 애들의 라우터 설정(원래 App.js에서 하던거)
          <Route
            exact path={prop.layout + prop.path} // /admin/timeline
            component={prop.component} // Timeline
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  //sidebarMini 컨트롤
  handleMiniClick = () => {
    // document.body.classList 클래스에 ~?
    if (document.body.classList.contains("sidebar-mini")) {//클래스명에 "sidebar-mini"가 포함되있으면
      this.setState({ sidebarMini: false }); 
    } else {
      this.setState({ sidebarMini: true });
    }
    document.body.classList.toggle("sidebar-mini");
    // toggle()  >class 이름을 toggle(삭제 or 추가)
  };

  render() {
    return (
      // 전체 페이지
      <div className="wrapper"> 
        {/* 1.sidebar */}
        <Sidebar
          {...this.props}
          routes={Adminroutes}
          bgColor= "brown"
          activeColor= "warning"
        />
        {/* 2. sidebar 제외한 전체 페이지 */}
        <div className="main-panel" ref="mainPanel">
          {/* 상단바 */}
          <AdminNavbar {...this.props} handleMiniClick={this.handleMiniClick} />
          {/* 메인 내용 */}
          <Switch>{this.getRoutes(Adminroutes)}</Switch>
          {// we don't want the Footer to be rendered on full screen maps page
          this.props.location.pathname.indexOf("full-screen-map") !==
          -1 ? null : (
            // 바닥
            <Footer fluid />
          )}
        </div>
      </div>
    );
  }
}

export default Admin;
