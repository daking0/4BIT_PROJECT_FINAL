import { combineReducers } from 'redux';
import AuthenticationReducers from '../Reducers/AuthenticationReducers';
import ArticleReducers from '../Reducers/ArticleReducers';
import QuizReducers from '../Reducers/QuizReducers';
import MemberListReducers from '../Reducers/MemberListReducers';
import RegisterReducers from '../Reducers/RegisterReducers';
import ReplyReducers from '../Reducers/ReplyReducers';
import FileReducers from '../Reducers/FileReducers';
import MyInfoReducers from './MyInfoReducers';
import CounselReducers from './CounselReducers';
import RoadmapReducers from '../Reducers/RoadmapReducers';
import ClassGroupRedecers from '../Reducers/ClassGroupReducers';
import PointLogReducers from '../Reducers/PointLogReducers';

import TestQuizReducers from './TestQuizReducers';
import StudentAnswerReducers from './StudentAnswerReducers';
import StudentTestReducers from './StudentTestReducers';
import TestGroupReducers from './TestGroupReducers';

import HomeworkReducers from './HomeworkReducers';
import HwArticleReducers from './HwArticleReducers';
import HwReplyReducers from './HwReplyReducers';

import AttendLogReducers from './AttendLogReducers';
import ForgotUserInfoReducers from './ForgotUserInfoReducers';

/**
 * REDUECERS EXPORT
 * @author: dakyung
 * 
 * @description: REDUCER들을 ROOTREDUCERS로 한 번에 내보낸다
 * 
 * auth: AuthenticationReducers
 * articlereducers : ArticleReducers
 */

//rootReducers로 합해서 한 번에 내보내기
const rootReducers = combineReducers({
  auth: AuthenticationReducers, //authentication이라는 리듀서를 auth라는 이름으로 사용하겠다
  articlereducers : ArticleReducers,
  quizReducers : QuizReducers,
  memberList : MemberListReducers,
  registerMember : RegisterReducers,
  replyreducers : ReplyReducers,
  myinforeducers : MyInfoReducers,
  counsel : CounselReducers,
  filereducers : FileReducers,
  roadmapreducers : RoadmapReducers,
  classGroup : ClassGroupRedecers,
  pointlog : PointLogReducers,
  
  testgroupreducers : TestGroupReducers,
  testquizreducers : TestQuizReducers,
  studentanswerreducers :StudentAnswerReducers,
  studenttestreducers : StudentTestReducers,

  homeworkreducers : HomeworkReducers,
  hwarticlereducers : HwArticleReducers,
  hwreplyreducers : HwReplyReducers,

  attendlogreducers : AttendLogReducers,
  forgotuserinforeducers :ForgotUserInfoReducers

});

export default rootReducers;
