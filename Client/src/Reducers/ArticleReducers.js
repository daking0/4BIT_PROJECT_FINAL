/**
 * ARTICLE REDUCER
 * @author: dakyung
 * 
 * @description: 
 * ARTICLE ACTIONS 에 대한 리듀서 정의
 * 
 * @param: ArticleReducers
 * CREATE_ARTICLE_SUCCESS
 * UPDATE_ARTICLE_SUCCESS
 * LISTOF_ARTICLE_SUCCESS
 * RETRIEVE_ARTICLE_SUCCESS
 * DELETE_ARTICLE_SUCCESS
 * LOGOUT
 * */
import { ActionTypes } from '../utils/ActionTypeList';

 //The initial state
const initialState = {
  items: [],
  page: 1,
  size: 20,
  totalCount: 0,
};
  

const ArticleReducers = (state = initialState, action,noticestate=initialState) => {
  const { items, totalCount } = state;
  const { payload } = action;         
  const { nitems } =noticestate;                              

  switch (action.type) {
    case ActionTypes.CREATE_ARTICLE_SUCCESS :
      if (payload !== undefined && payload !== null) {
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
      
      case ActionTypes.UPDATE_ARTICLE_SUCCESS:
      if (payload !== undefined && payload !== null) {
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

    // case ActionTypes.CLEAR_SUCCESS:
    //   return initialStateTodo;

    case ActionTypes.LISTOF_ARTICLE_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;
        if (data !== undefined && data !== null) {
          return {
            ...state,
            items: (data.items === undefined ? [] : data.items),
            page: data.page,
            size: data.size,
            totalCount: (data.totalCount === undefined ? 0 : data.totalCount),
          };
        }
      }
      return state;
      
    case ActionTypes.RETRIEVE_ARTICLE_SUCCESS:
        if (payload !== undefined && payload !== null) {
          const { data } = payload;
          if (data !== undefined && data !== null) {
            return {
              ...state,
              // items: (data.items === undefined ? [] : data.items),
              datas : data
            };
          }
        }
        return state;

    case ActionTypes.DELETE_ARTICLE_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;
        return {
          ...state,
          items: items.filter(item => item.id !== data.id),
          totalCount: totalCount - 1
        };
      }
      return state;



    case ActionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
}

export default ArticleReducers;
