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
import Buttons from "views/components/Buttons.jsx";
import Calendar from "views/Calendar.jsx";
import Charts from "views/Charts.jsx";
import Dashboard from "views/Dashboard.jsx";
import ExtendedForms from "views/forms/ExtendedForms.jsx";
import ExtendedTables from "views/tables/ExtendedTables.jsx";
import FullScreenMap from "views/maps/FullScreenMap.jsx";
import GoogleMaps from "views/maps/GoogleMaps.jsx";
import GridSystem from "views/components/GridSystem.jsx";
import Icons from "views/components/Icons.jsx";
import LockScreen from "views/pages/LockScreen.jsx";
import Login from "views/pages/Login.jsx";
import Notifications from "views/components/Notifications.jsx";
import Panels from "views/components/Panels.jsx";
import ReactTables from "views/tables/ReactTables.jsx";
import Register from "views/pages/Register.jsx";
import RegularForms from "views/forms/RegularForms.jsx";
import RegularTables from "views/tables/RegularTables.jsx";
import SweetAlert from "views/components/SweetAlert.jsx";
import Timeline from "views/pages/Timeline.jsx";
import Typography from "views/components/Typography.jsx";
import UserProfile from "views/pages/UserProfile.jsx";
import ValidationForms from "views/forms/ValidationForms.jsx";
import VectorMap from "views/maps/VectorMap.jsx";
import Widgets from "views/Widgets.jsx";
import Wizard from "views/forms/Wizard.jsx";

import {ArticleMain, RetrieveArticles, UpdateArticles, CreateArticles} from "views/Article/ArticleIndex.js";
// import { RetrieveArticles } from "views/Article/ArticleIndex.js";

import ListOfMember from "views/ManageMember/containers/ListOfMember";
import RegisterMember from "views/RegisterMember/containers/RegisterMember";
import ListOfClassGroup from "views/ClassGroup/components/ListOfClassGroup";
import RegisterClassGroup from "views/ClassGroup/components/ClassGroup";

const AdminRoutes = [
  { //article Create
    path: "/board/:boardId/write",
    component: CreateArticles,
    layout: "/admin"
      ,invisible : true
  },
  { //article List
    // "/board/:boardId"
    path: "/board/:boardId/:page",
    // mini: "AL",
    component: ArticleMain,
    layout: "/admin"
      ,invisible : true
},
{ //article Retrieve
  
  path: "/board/:boardId/:page/:articleId",
  component: RetrieveArticles,
  layout: "/admin"
    ,invisible : true
},
  {//article Update
    path: "/board/:boardId/:page/:articleId/modify",
    component: UpdateArticles,
    layout: "/admin"
      ,invisible : true
  },


  { // 관리 메뉴
    collapse: true,
    name: "관리",
    icon: "nc-icon nc-tag-content",
    state : "ManageCollapse",
    views:[
      {  
        name:"회원 관리",
        path : "/manage/member/list",
        mini: "MM",
        component : ListOfMember,
        layout : "/admin"
      },

        {
          name: "회원 등록",
          path : "/manage/member/new",
          mini: "RM",
          component : RegisterMember,
          layout : "/admin"
        },

        {
          name: "클래스 관리",
          path : "/manage/class/list",
          mini: "MC",
          component : ListOfClassGroup,
          layout : "/admin"
        },
        
        {
          name: "클래스 등록",
          path : "/manage/class/new",
          mini: "RC",
          component : RegisterClassGroup,
          layout : "/admin"
        }
      ]
  },// 관리 메뉴 끝

   //공지
   {
    collapse: true,
    name: "공지",
    icon: "nc-icon nc-bank",
    state: "NoticeCollapse",
    views: [

      //############# 보여지는 곳
      { //article List
        path: "/board/:boardId",
        name: "전체 공지",
        mini: "AL",
        component: ArticleMain,
        layout: "/admin"
        ,invisible : true
      },
      { //article List
        path: "/board/notice",
        name: "전체 공지",
        mini: "NT",
        component: ArticleMain,
        layout: "/admin"
      },
      { //article List
        path: "/board/job",
        name: "취업 공고",
        mini: "JB",
        component: ArticleMain,
        layout: "/admin"
      },
      { //article List
        path: "/board/project",
        name: "프로젝트 영상",
        mini: "PJ",
        component: ArticleMain,
        layout: "/admin"
      }
    ]
  }, //공지 끝

  { //admin/dashboard
    path: "/dashboard", 
    name: "",
    // icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
    ,invisible : true
  }
 
];

export default AdminRoutes;
