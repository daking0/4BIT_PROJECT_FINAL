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

import { ArticleMain, RetrieveArticles, UpdateArticles, CreateArticles } from "views/Article/ArticleIndex.js";
// import { RetrieveArticles } from "views/Article/ArticleIndex.js";
import { CreateTestGroup, TestGroupMain, EndedTestGroupMain, RetrieveTestGroup, UpdateTestGroup } from "views/TestGroup/TestGroupIndex.js";

import { CreateStudentAnswer, ListOfStudentTestScore } from "views/StudentAnswer/StudnetAnswerIndex.js";

import { ListOfTestQuiz } from "views/TestQuiz/TestQuizIndex";


import {
  ListOfHomework, ListOfEndedHomework, RetrieveHomework, CreateHomework,
  UpdateHomework, HomeworkMain, EndedHomeworkMain
} from "views/Homework/HomeworkIndex.js";

import {
  ListOfHwArticle, RetrieveHwArticle, CreateHwArticle,
  UpdateHwArticle, CreateHwReply, ListOfHwReply, HwArticleMain
} from "views/HwArticle/HwArticleIndex.js";

import { CreateQuiz, ListofQuiz, RetrieveQuiz, UpdateQuiz } from "views/Quiz/QuizIndex.js";

import { ReadMyInfo, UpdateMyInfo } from './views/MyInfo/MyInfoIndex'
import { ListOfCounselStudent, RetrieveCounsel, UpdateCounsel } from 'views/Counsel/CounselIndex'

const routes = [
  { //admin/dashboard
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/teacher",
    invisible: true
  },
  { // teacher 마이페이지
    collapse: true,
    name: "마이페이지",
    icon: "nc-icon nc-badge",
    state: "MyPageCollapse",
    views: [
      {
        name: "개인정보 수정",
        path: "/mypage/myinfo/edit",
        component: UpdateMyInfo,
        layout: "/teacher"
        , invisible: true
      },
      // ######보여지는 곳
      {
        name: "내 정보 확인",
        path: "/mypage/myinfo",
        mini: "MY",
        component: ReadMyInfo,
        layout: "/teacher"
      }
    ]
  }, // teacher 마이페이지 끝

  //공지
  {
    collapse: true,
    name: "공지",
    icon: "nc-icon nc-bank",
    state: "NoticeCollapse",
    views: [

      { //article Create
        path: "/board/:boardId/write",
        component: CreateArticles,
        layout: "/teacher"
        , invisible: true
      },
      {//article Update
        path: "/board/:boardId/:articleId/modify",
        component: UpdateArticles,
        layout: "/teacher"
        , invisible: true
      },
      { //article List
        // "/board/:boardId"
        path: "/board/:boardId/:page",
        // mini: "AL",
        component: ArticleMain,
        layout: "/teacher"
        , invisible: true
      },
      { //article Retrieve

        path: "/board/:boardId/:page/:articleId",
        component: RetrieveArticles,
        layout: "/teacher"
        , invisible: true
      },
      //###############여기부턴 보여지는 곳
      { //article List
        path: "/board/notice/1",
        name: "전체 공지",
        mini: "NT",
        component: ArticleMain,
        layout: "/teacher"
      },
      { //article List
        path: "/board/job/1",
        name: "취업 공고",
        mini: "JB",
        component: ArticleMain,
        layout: "/teacher"
      },
      { //article List
        path: "/board/project/1",
        name: "프로젝트 영상",
        mini: "PJ",
        component: ArticleMain,
        layout: "/teacher"
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

      { //article List
        // "/board/:boardId"
        path: "/board/:boardId/:page",
        name: "아티클 뽑기 위한 가짜",
        mini: "AL",
        component: ArticleMain,
        layout: "/teacher"
        , invisible: true
      },
      { //article Create
        path: "/board/:boardId/:page/write",
        component: CreateArticles,
        layout: "/teacher"
        , invisible: true
      },
      {//article Update
        path: "/board/:boardId/:page/:articleId/modify",
        component: UpdateArticles,
        layout: "/teacher"
        , invisible: true
      },
      { //article Retrieve
        path: "/board/:boardId/:page/:articleId",
        component: RetrieveArticles,
        layout: "/teacher"
        , invisible: true
      },
      //시험
      { //선생님이 시험 작성버튼 누르면 
        path: "/class/test/write",
        name: "시험 작성",
        mini: "CT",
        component: CreateTestGroup,
        layout: "/teacher"
        , invisible: true
      },

      { // 문제은행에 문제 출제
        name: "문제출제",
        path: "/class/test/exbank/write",
        component: CreateQuiz,
        mini: "C",
        layout: "/teacher"
        , invisible: true
      },
      { // 문제은행리스트 ListofQuiz
        name: "문제리스트",
        path: "/class/test/exbank/list",
        component: ListofQuiz,
        mini: "L",
        layout: "/teacher"
        , invisible: true
      },
      { // 문제은행리스트에 상셍보기 RetrieveQuiz
        name: "문제상세보기",
        path: "/class/test/exbank/view/:quizId",
        component: RetrieveQuiz,
        mini: "V",
        layout: "/teacher"
        , invisible: true
      },
      { // 문제은행 문제 수정 UpdateQuiz
        name: "문제수정",
        path: "/class/test/exbank/:quizId",
        component: UpdateQuiz,
        mini: "U",
        layout: "/teacher"
        , invisible: true
      },

      {
        path: "/testId=:testId",
        name: "시험 상세보기",
        mini: "RT",
        component: RetrieveTestGroup,
        layout: "/teacher"
        , invisible: true
      },
      {
        path: "/class/test/edit",
        name: "시험 수정",
        mini: "UT",
        component: UpdateTestGroup,
        layout: "/teacher"
        , invisible: true
      },

      { //Homework Retrieve
        path: "/class/assignment/view/:hwId",
        name: "과제 내용 상세보기",
        mini: "R",
        component: RetrieveHomework,
        layout: "/teacher"
        , invisible: true
      },
      { //선생님 과제 출제
        path: "/class/assignment/write",
        name: "HwArticle Create",
        mini: "C",
        component: CreateHomework,
        layout: "/teacher"
        , invisible: true
      },
      {//선생님 제출과제 수정
        path: "/class/assignment/view/:hwId/modify",
        name: "HwArticle Update",
        mini: "U",
        component: UpdateHomework,
        layout: "/teacher"
        , invisible: true
      },

      // ########### 보여지는 곳
      { //전체 공지
        path: "/board/class_1_notice/1",
        name: "우리반 공지",
        mini: "CN",
        component: ArticleMain,
        layout: "/teacher"
      },
      { //선생님 시험 리스트
        path: "/class/test",
        name: "시험 관리",
        mini: "TS",
        component: TestGroupMain,
        layout: "/teacher"
      },

      // 선생님 과제 출제
      { //Homework List
        path: "/class/assignment/list",
        name: "과제 관리",
        mini: "HW",
        component: HomeworkMain,
        layout: "/teacher"
      },

      { //자유게시판
        path: "/board/class_1_board/1",
        name: "자유게시판",
        mini: "FR",
        component: ArticleMain,
        layout: "/teacher"
      },

      { //자료게시판
        path: "/board/class_1_library/1",
        name: "자료게시판",
        mini: "CL",
        component: ArticleMain,
        layout: "/teacher"
      },
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
        path: "/testquiz/list/testId=:testId",
        name: "지난 시험-문제보기",
        mini: "LTQ",
        component: ListOfTestQuiz,
        layout: "/teacher"
        , invisible: true
      },

      {
        path: "/study/endedtest/showscore/userId=:userId/testId=:testId",
        name: "점수 보기",
        mini: "LTS",
        component: ListOfStudentTestScore,
        layout: "/teacher"
        , invisible: true
      },

      {
        name: "가짜현황",
        path: "/study/studentstatus/:page",
        component: ListOfCounselStudent,
        layout: "/teacher"
        , invisible: true
      },

      { //학생이 제출과제 보기
        path: "/class/assignment/hwArticle/:hwArticleId",
        name: "HwArticle Retrieve",
        mini: "R",
        component: RetrieveHwArticle,
        layout: "/teacher"
        , invisible: true
      },

      //선생님-학습
      {
        name: "상담내역 수정",
        path: "/studentstatus/modify",
        component: UpdateCounsel,
        layout: "/teacher"
        , invisible: true
      },
      {
        path: "/studentstatus/view",
        name: "상담내역",
        component: RetrieveCounsel,
        layout: "/teacher"
        , invisible: true
      },
      // ######################보여지는 곳
      {
        path: "/study/studentstatus/1",
        name: "학생현황",
        mini: "ST",
        component: ListOfCounselStudent,
        layout: "/teacher"
      },
      {
        path: "/study/endedtest",
        name: "지난 시험",
        mini: "LT",
        component: EndedTestGroupMain,
        layout: "/teacher"
      },
      { //지난과제 리스트
        path: "/class/assignment/listended",
        name: "지난 과제",
        mini: "LA",
        component: EndedHomeworkMain,
        layout: "/teacher"
      }
    ]
  }, //학습 끝


  // {//메뉴에 보여지면 안되는 애들
  //   collapse: true,
  //   state: "DangerousCollapse",
  //   views: [
      // { //article Create
      //   path: "/board/:boardId/write",
      //   component: CreateArticles,
      //   layout: "/teacher"
      // },
      // {//article Update
      //   path: "/board/:boardId/:articleId/modify",
      //   component: UpdateArticles,
      //   layout: "/teacher"
      // },
      // { //article Retrieve
      //   path: "/board/:boardId/:articleId",
      //   component: RetrieveArticles,
      //   layout: "/teacher"
      // },

      // //시험
      // { //선생님이 시험 작성버튼 누르면 
      //   path: "/class/test/write",
      //   name: "시험 작성",
      //   mini: "CT",
      //   component: CreateTestGroup,
      //   layout: "/teacher"
      // },

      // { // 문제은행에 문제 출제
      //   name: "문제출제",
      //   path: "/class/test/exbank/write",
      //   // component: CreateQuiz,
      //   mini: "C",
      //   layout: "/teacher"
      // },
      // { // 문제은행리스트 ListofQuiz
      //   name: "문제리스트",
      //   path: "/class/test/exbank/list",
      //   // component: ListofQuiz,
      //   mini: "L",
      //   layout: "/teacher"
      // },
      // { // 문제은행리스트에 상셍보기 RetrieveQuiz
      //   name: "문제상세보기",
      //   path: "/class/test/exbank/view/:quizId",
      //   // component: RetrieveQuiz,
      //   mini: "V",
      //   layout: "/teacher"
      // },
      // { // 문제은행 문제 수정 UpdateQuiz
      //   name: "문제수정",
      //   path: "/class/test/exbank/:quizId",
      //   // component: UpdateQuiz,
      //   mini: "U",
      //   layout: "/teacher"
      // },

      // {
      //   path: "/testId=:testId",
      //   name: "시험 상세보기",
      //   mini: "RT",
      //   component: RetrieveTestGroup,
      //   layout: "/teacher"
      // },
      // {
      //   path: "/class/test/edit",
      //   name: "시험 수정",
      //   mini: "UT",
      //   component: UpdateTestGroup,
      //   layout: "/teacher"
      // },

      // {
      //   path: "/testquiz/list/testId=:testId",
      //   name: "지난 시험-문제보기",
      //   mini: "LTQ",
      //   component: ListOfTestQuiz,
      //   layout: "/teacher"
      // },

      // {
      //   path: "/study/endedtest/showscore/userId=:userId/testId=:testId",
      //   name: "점수 보기",
      //   mini: "LTS",
      //   component: ListOfStudentTestScore,
      //   layout: "/teacher"
      // },


      //과제
      // { //Homework Retrieve
      //   path: "/class/assignment/view/:hwId",
      //   name: "과제 내용 상세보기",
      //   mini: "R",
      //   component: RetrieveHomework,
      //   layout: "/teacher"
      // },
      // { //선생님 과제 출제
      //   path: "/class/assignment/write",
      //   name: "HwArticle Create",
      //   mini: "C",
      //   component: CreateHomework,
      //   layout: "/teacher"
      // },
      // {//선생님 제출과제 수정
      //   path: "/class/assignment/view/:hwId/modify",
      //   name: "HwArticle Update",
      //   mini: "U",
      //   component: UpdateHomework,
      //   layout: "/teacher"
      // },


      // { //학생이 제출과제 보기
      //   path: "/class/assignment/hwArticle/:hwArticleId",
      //   name: "HwArticle Retrieve",
      //   mini: "R",
      //   component: RetrieveHwArticle,
      //   layout: "/teacher"
      // },

      // //선생님-학습
      // {
      //   name: "상담내역 수정",
      //   path : "/studentstatus/modify",
      //   component : UpdateCounsel,
      //   layout : "/teacher"
      // },
      // {
      //   path : "/studentstatus/view",
      //   name: "상담내역",
      //   component : RetrieveCounsel,
      //   layout : "/teacher"
      // }
  //   ]
  // }, //메뉴에 보여지면 안되는 애들 끝


  // ####################################################################

  //Pages
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
  //Components
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
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/grid-system",
  //       name: "Grid System",
  //       mini: "GS",
  //       component: GridSystem,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/panels",
  //       name: "Panels",
  //       mini: "P",
  //       component: Panels,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/sweet-alert",
  //       name: "Sweet Alert",
  //       mini: "SA",
  //       component: SweetAlert,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/notifications",
  //       name: "Notifications",
  //       mini: "N",
  //       component: Notifications,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/icons",
  //       name: "Icons",
  //       mini: "I",
  //       component: Icons,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/typography",
  //       name: "Typography",
  //       mini: "T",
  //       component: Typography,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  //Forms
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
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/extended-forms",
  //       name: "Extended Forms",
  //       mini: "EF",
  //       component: ExtendedForms,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/validation-forms",
  //       name: "Validation Forms",
  //       mini: "VF",
  //       component: ValidationForms,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/wizard",
  //       name: "Wizard",
  //       mini: "W",
  //       component: Wizard,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  //Tables
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
  //Maps
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
  //Widgets
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
];

export default routes;
