/**
 *  Register EXPORT
 * @author: 황서영
 * 
 * @description: components 에서 export 
 * StudentRegister : 학생 등록 폼 
 * TeacherRegister : 강사 등록 폼
 * 
 * @description: containers 에서 export 
 * RegisterMember : 관리자 등록화면
 *
 */

// components 
export { default as StudentRegister } from './components/StudentRegister';
export { default as TeacherRegister} from './components/TeacherRegister'; 

// containers
export { default as RegisterMember } from './containers/RegisterMember';