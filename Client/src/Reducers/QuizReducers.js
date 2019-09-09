/**
 * ARTICLE REDUCER
 * @author: hyeyoung
 * 
 * @description: 
 * QUIZ ACTIONS 에 대한 리듀서 정의
 * 
 * @param: QuizListReducers
 * CREATE_QUIZ_SUCCESS
 * LISTOF_QUIZ_SUCCESS
 * UPDATE_QUIZ_SUCCESS
 * DELETE_QUIZ_SUCCESS
 * */


import { ActionTypes } from '../utils/ActionTypeList';

 //The initial state
  const initialQuiz ={
    items: [],
    page: 1,
    size: 20,
    totalCount: 0
  }

 const QuizReducers = (state = initialQuiz, action) => {
     const { items, totalCount } = state;
     const { payload } = action;

     switch (action.type) {
//      퀴즈 생성
        case ActionTypes.CREATE_QUIZ_SUCCESS :
            if(payload !== undefined && payload !== null){
                return {
                    ...state,
                    items: [
                        ...items,
                        payload.data
                    ],
                    totalCount: totalCount + 1
                };
            }
            return state;

//      퀴즈 리스트 뽑아오기
        case ActionTypes.LISTOF_QUIZ_SUCCESS:
            if(payload !== undefined && payload !== null){
                const { data } = payload;
                if(data !== undefined && data !== null){
                    return{
                        ...state,
                        items:(data.items === undefined ? [] : data.items),
                        page: data.page,
                        size: data.size,
                        totalCount:(data.totalCount === undefined ? 0 : data.totalCount),
                    };
                }
            }
            return state;
// ======================================
// 퀴즈 상세보기
        case ActionTypes.RETRIEVE_QUIZ_SUCCESS:
            if(payload !== undefined && payload !== null){
                const { data } = payload;
                if(data !== undefined && data !== null){
                    return{
                        ...state,
                        // items:(data.items === undefined ? [] : data.items),
                        datas: data
                    };
                }
            }
            return state;

// ========================================
//          퀴즈 수정
        case ActionTypes.UPDATE_QUIZ_SUCCESS:
            if(payload !== undefined && payload !== null){
                return {
                    ...state,
                    items: [
                        ...items,
                        payload.data
                    ],
                    updateresult : payload.data
                };
            }
            return state;

    //      퀴즈 삭제
        case ActionTypes.DELETE_QUIZ_SUCCESS:
            if(payload !== undefined && payload !== null){
                const { data } = payload;
                return {
                    ...state,
                    items: items.filter(item => item.id !== data.id),
                    totalCount: totalCount - 1
                };
            }
            return state;

        default:
            return state;
     }
 }
 
export default QuizReducers; 