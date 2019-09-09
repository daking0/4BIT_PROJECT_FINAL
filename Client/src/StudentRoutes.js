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
import OriginDashboard from "views/OriginDashboard.jsx";
import bitchartview from "views/Bitchartview.jsx";
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

import { ArticleMain, RetrieveArticles, UpdateArticles, CreateArticles } from "views/Article/ArticleIndex.js";
// import { RetrieveArticles } from "views/Article/ArticleIndex.js";

import { CreateTestGroup, TestGroupMain, EndedTestGroupMain, RetrieveTestGroup, UpdateTestGroup } from "views/TestGroup/TestGroupIndex.js";

import { CreateStudentAnswer, ListOfStudentTestScore } from "views/StudentAnswer/StudnetAnswerIndex.js";

import { ListOfTestQuiz } from "views/TestQuiz/TestQuizIndex";

import { ListofRoadmap, RetrieveRoadmap } from "views/Roadmap/Roadmapindex.js";

import {
  ListOfHomework, ListOfEndedHomework, RetrieveHomework, CreateHomework,
  UpdateHomework, HomeworkMain, EndedHomeworkMain
} from "views/Homework/HomeworkIndex.js";

import {
  ListOfHwArticle, RetrieveHwArticle, CreateHwArticle,
  UpdateHwArticle, CreateHwReply, ListOfHwReply, HwArticleMain
} from "views/HwArticle/HwArticleIndex.js";

import { ReadMyInfo, UpdateMyInfo } from './views/MyInfo/MyInfoIndex'
import ReadMyPointLog from "views/PointLog/components/ReadMyPointLog";

import ListofAttends from 'views/Attend/components/ListofAttends.js';
import UpdateReply from "views/Article/components/UpdateReply";

const StudentRoutes = [ //전체 시작
  { //admin/dashboard
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/student",
    invisible: true
  },

  //마이페이지
  {
    collapse: true,
    name: "마이페이지",
    icon: "nc-icon nc-badge",
    state: "MyPageCollapse",
    views: [
      {
        name: "포인트 뽑기 위한 가짜",
        path: "/mypage/point/:page",
        component: ReadMyPointLog,
        layout: "/student"
        , invisible: true
      },
      {
        name: "개인정보 수정",
        path: "/mypage/myinfo/edit",
        component: UpdateMyInfo,
        layout: "/student"
        , invisible: true
      },
      // #########보여지는 곳
      {
        name: "내 정보 확인",
        path: "/mypage/myinfo",
        mini: "MY",
        component: ReadMyInfo,
        layout: "/student"
      },
      {
        name: "내 포인트 확인",
        path: "/mypage/point/1",
        mini: "PO",
        component: ReadMyPointLog,
        layout: "/student"
      },
      { //아직 출석페이지 없음
        name: "출석현황",
        path: "/mypage/attend",
        mini: "CH",
        component: ListofAttends,
        layout: "/student"
      }

    ]
  }, //마이페이지 끝

  //공지
  {
    collapse: true,
    name: "공지",
    icon: "nc-icon nc-bank",
    state: "NoticeCollapse",
    views: [
      // { //article List
      //   // "/board/:boardId"
      //   path: "/board/:boardId",
      //   name: "아티클 뽑기 위한 가짜",
      //   mini: "AL",
      //   component: ArticleMain,
      //   layout: "/student"
      //   ,invisible : true
      // },
      { //article Create
        path: "/board/:boardId/write",
        component: CreateArticles,
        layout: "/student"
        , invisible: true
      },
      {//article Update
        path: "/board/:boardId/:page/:articleId/modify",
        component: UpdateArticles,
        layout: "/student"
        , invisible: true
      },
      { //article List
        // "/board/:boardId"
        path: "/board/:boardId/:page",
        // mini: "AL",
        component: ArticleMain,
        layout: "/student"
        , invisible: true
      },
      { //article Retrieve

        path: "/board/:boardId/:page/:articleId",
        component: RetrieveArticles,
        layout: "/student"
        , invisible: true
      },
      {
        path:"/board/:boardId/:page/:articleId/:replyId/replymodify",
        component:UpdateReply,
        layout:"/student",
        invisible : true
      },

      //###############여기부턴 보여지는 곳
      { //article List
        // "/board/:boardId"
        path: "/board/notice/1",
        name: "전체 공지",
        mini: "NT",
        component: ArticleMain,
        layout: "/student"
      },
      { //article List
        path: "/board/job/1",
        name: "취업 공고",
        mini: "JB",
        component: ArticleMain,
        layout: "/student"
      },
      { //article List
        path: "/board/project/1",
        name: "프로젝트 영상",
        mini: "PJ",
        component: ArticleMain,
        layout: "/student"
      }
    ]
  }, //공지 끝


  //수업
  {
    collapse: true,
    name: "수업",
    icon: "nc-icon nc-ruler-pencil",
    state: "ClassCollapse",
    views: [
      {
        path: "/testId=:testId",
        name: "시험 상세보기",
        mini: "RT",
        component: RetrieveTestGroup,
        layout: "/student"
        , invisible: true
      },
      {
        path: "/class/:testId/answer/write",
        name: "시험 응시",
        mini: "CT",
        component: CreateStudentAnswer,
        layout: "/student"
        , invisible: true
      },
      { //Homework Retrieve
        path: "/class/assignment/view/:hwId",
        name: "과제 내용 상세보기",
        mini: "RH",
        component: RetrieveHomework,
        layout: "/student"
        , invisible: true
      },
      { //학생이 과제 제출
        path: "/class/assignment/hwId/:hwId/hwArticle/write",
        name: "HwArticle Create",
        mini: "CA",
        component: CreateHwArticle,
        layout: "/student"
        , invisible: true
      },
      {//학생이 제출과제 수정
        path: "/class/assignment/hwArticle/:hwArticleId/modify",
        name: "HwArticle Update",
        mini: "HU",
        component: UpdateHwArticle,
        layout: "/student"
        , invisible: true
      },

      // ############보여지는 곳

      { //전체 공지
        path: "/board/class_1_notice/1",
        name: "우리반 공지",
        mini: "CN",
        component: ArticleMain,
        layout: "/student"
      },
      { //학생이 현재 진행중인 시험 리스트
        path: "/class/test",
        name: "시험",
        mini: "TS",
        component: TestGroupMain,
        layout: "/student"
      },

      //과제
      { //Homework List
        path: "/class/assignment/list",
        name: "과제",
        mini: "HW",
        component: HomeworkMain,
        layout: "/student"
      },

      { //자유게시판
        path: "/board/class_1_board/1",
        name: "자유게시판",
        mini: "FR",
        component: ArticleMain,
        layout: "/student"
      },

      { //자료게시판
        path: "/board/class_1_library/1",
        name: "자료게시판",
        mini: "CL",
        component: ArticleMain,
        layout: "/student"
      }
    ]

  },  //수업 끝


  //학습
  {
    collapse: true,
    name: "학습",
    icon: "nc-icon nc-hat-3",
    state: "StudyCollapse",
    views: [

      {
        path: "/study/endedtest/showscore/userId=:userId/testId=:testId",
        name: "점수 보기",
        mini: "LT",
        component: ListOfStudentTestScore,
        layout: "/student"
        , invisible: true
      },
      {
        path: "/testquiz/list/testId=:testId",
        name: "지난 시험-문제보기",
        mini: "LQ",
        component: ListOfTestQuiz,
        layout: "/student"
        , invisible: true
      },
      { //학생이 제출과제 보기
        path: "/class/assignment/hwArticle/:hwArticleId",
        name: "HwArticle Retrieve",
        mini: "R",
        component: RetrieveHwArticle,
        layout: "/student"
        , invisible: true
      },


      // ######################보여지는 곳
      {
        path: "/study/endedtest",
        name: "지난 시험",
        mini: "LT",
        component: EndedTestGroupMain,
        layout: "/student"
      },

      { //지난과제 리스트
        path: "/class/assignment/listended",
        name: "지난 과제",
        mini: "LA",
        component: EndedHomeworkMain,
        layout: "/student"
      },
      { //로드맵 메인
        path: "/roadmap/list",
        name: "로드맵",
        mini: "RO",
        component: ListofRoadmap,
        layout: "/student"
      },
      { //로드맵 문제
        path: "/roadmap/:roadmapStageNo",
        name: "로드맵 문제",
        mini: "AL",
        component: RetrieveRoadmap,
        layout: "/student"
        , invisible: true
      }
    ]
  }, //학습 끝


  //  #########################################################################################

  // //Pages
  // {
  //   collapse: true,
  //   name: "Pages",
  //   icon: "nc-icon nc-book-bookmark",
  //   state: "pagesCollapse",
  //   views: [
  //     {
  //       path: "/timeline",
  //       name: "Timeline",
  //       mini: "T",
  //       component: Timeline,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/login",
  //       name: "Login",
  //       mini: "L",
  //       component: Login,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/register",
  //       name: "Register",
  //       mini: "R",
  //       component: Register,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/lock-screen",
  //       name: "LockScreen",
  //       mini: "LS",
  //       component: LockScreen,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/user-profile",
  //       name: "UserProfile",
  //       mini: "UP",
  //       component: UserProfile,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // //Components
  // {
  //   collapse: true,
  //   name: "Components",
  //   icon: "nc-icon nc-layout-11",
  //   state: "componentsCollapse",
  //   views: [
  //     {
  //       path: "/buttons",
  //       name: "Buttons",
  //       mini: "B",
  //       component: Buttons,
  //       layout: "/student"
  //     },
  //     {
  //       path: "/grid-system",
  //       name: "Grid System",
  //       mini: "GS",
  //       component: GridSystem,
  //       layout: "/student"
  //     },
  //     {
  //       path: "/panels",
  //       name: "Panels",
  //       mini: "P",
  //       component: Panels,
  //       layout: "/student"
  //     },
  //     {
  //       path: "/sweet-alert",
  //       name: "Sweet Alert",
  //       mini: "SA",
  //       component: SweetAlert,
  //       layout: "/student"
  //     },
  //     {
  //       path: "/notifications",
  //       name: "Notifications",
  //       mini: "N",
  //       component: Notifications,
  //       layout: "/student"
  //     },
  //     {
  //       path: "/icons",
  //       name: "Icons",
  //       mini: "I",
  //       component: Icons,
  //       layout: "/student"
  //     },
  //     {
  //       path: "/typography",
  //       name: "Typography",
  //       mini: "T",
  //       component: Typography,
  //       layout: "/student"
  //     }
  //   ]
  // },
  // //Forms
  // {
  //   collapse: true,
  //   name: "Forms",
  //   icon: "nc-icon nc-ruler-pencil",
  //   state: "formsCollapse",
  //   views: [
  //     {
  //       path: "/regular-forms",
  //       name: "Regular Forms",
  //       mini: "RF",
  //       component: RegularForms,
  //       layout: "/student"
  //     },
  //     {
  //       path: "/extended-forms",
  //       name: "Extended Forms",
  //       mini: "EF",
  //       component: ExtendedForms,
  //       layout: "/student"
  //     },
  //     {
  //       path: "/validation-forms",
  //       name: "Validation Forms",
  //       mini: "VF",
  //       component: ValidationForms,
  //       layout: "/student"
  //     },
  //     {
  //       path: "/wizard",
  //       name: "Wizard",
  //       mini: "W",
  //       component: Wizard,
  //       layout: "/student"
  //     }
  //   ]
  // },
  // //Tables
  // {
  //   collapse: true,
  //   name: "Tables",
  //   icon: "nc-icon nc-single-copy-04",
  //   state: "tablesCollapse",
  //   views: [
  //     {
  //       path: "/regular-tables",
  //       name: "Regular Tables",
  //       mini: "RT",
  //       component: RegularTables,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/extended-tables",
  //       name: "Extended Tables",
  //       mini: "ET",
  //       component: ExtendedTables,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/react-tables",
  //       name: "React Tables",
  //       mini: "RT",
  //       component: ReactTables,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // //Maps
  // {
  //   collapse: true,
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   state: "mapsCollapse",
  //   views: [
  //     {
  //       path: "/google-maps",
  //       name: "Google Maps",
  //       mini: "GM",
  //       component: GoogleMaps,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/full-screen-map",
  //       name: "Full Screen Map",
  //       mini: "FSM",
  //       component: FullScreenMap,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/vector-map",
  //       name: "Vector Map",
  //       mini: "VM",
  //       component: VectorMap,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // //Widgets
  // {
  //   path: "/widgets",
  //   name: "Widgets",
  //   icon: "nc-icon nc-box",
  //   component: Widgets,
  //   layout: "/admin"
  // },
  // {
  //   path: "/charts",
  //   name: "Charts",
  //   icon: "nc-icon nc-chart-bar-32",
  //   component: Charts,
  //   layout: "/admin"
  // },
  // {
  //   path: "/calendar",
  //   name: "Calendar",
  //   icon: "nc-icon nc-calendar-60",
  //   component: Calendar,
  //   layout: "/admin"
  // }
];////전체 끝

export default StudentRoutes;