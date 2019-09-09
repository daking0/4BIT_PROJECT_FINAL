/**
 * REPLY REDUCER
 * @author: dakyung
 * 
 * @description: 
 * REPLY ACTIONS 에 대한 리듀서 정의
 * 
 * @param:
 * LISTOF_REPLY_SUCCESS
 * CREATE_REPLY_SUCCESS
 * */
import { ActionTypes } from '../utils/ActionTypeList';

//The initial state
const initialState = {
    items: []
};

const ReplyReducers = (state = initialState, action) => {
    const { items } = state;
    const { payload } = action;

    switch (action.type) {

        case ActionTypes.LISTOF_REPLY_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        items: (data.items === undefined ? [] : data.items)
                    };
                }
            }
            return state;

        case ActionTypes.RETRIEVE_REPLY_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        items: (data.items === undefined ? [] : data.items),
                        // articleContents :data.articleContents,
                        datas: data
                    };
                }
            }
            return state;


        case ActionTypes.CREATE_REPLY_SUCCESS:
            if (payload !== undefined && payload != null) {
                return {
                    ...state,
                    items: [
                        ...items,
                        payload.data
                    ]
                };
            }
            return state;

        default:
            return state;

        case ActionTypes.UPDATE_ARTICLE_SUCCESS:
            if (payload !== undefined && payload !== null) {
                return {
                    ...state,
                    items: [
                        ...items,
                        payload.data
                    ],
                    updateresult: payload.data
                };
            }
            return state;
    }
}

export default ReplyReducers;

// const ArticleReducers = (state = initialState, action) => {
//   const { items, totalCount } = state;
//   const { payload } = action;                                       

//   switch (action.type) {
//     case ActionTypes.CREATE_ARTICLE_SUCCESS :
//       if (payload !== undefined && payload !== null) {
//         return {
//           ...state,
//           items: [
//             ...items,
//             payload.data
//           ],
//           totalCount: totalCount + 1
//         };
//       }
//       return state;

//       case ActionTypes.UPDATE_ARTICLE_SUCCESS:
//       if (payload !== undefined && payload !== null) {
//         return {
//           ...state,
//           items: [
//             ...items,
//             payload.data
//           ],
//           updateresult : payload.data
//         };
//       }
//       return state;

//     // case ActionTypes.CLEAR_SUCCESS:
//     //   return initialStateTodo;

//     case ActionTypes.LISTOF_ARTICLE_SUCCESS:
//       if (payload !== undefined && payload !== null) {
//         const { data } = payload;
//         if (data !== undefined && data !== null) {
//           return {
//             ...state,
//             items: (data.items === undefined ? [] : data.items),
//             page: data.page,
//             size: data.size,
//             totalCount: (data.totalCount === undefined ? 0 : data.totalCount),
//           };
//         }
//       }
//       return state;

//     case ActionTypes.RETRIEVE_ARTICLE_SUCCESS:
//         if (payload !== undefined && payload !== null) {
//           const { data } = payload;
//           if (data !== undefined && data !== null) {
//             return {
//               ...state,
//               items: (data.items === undefined ? [] : data.items),
//               articleContents :data.articleContents,
//               datas : data
//             };
//           }
//         }
//         return state;

//     case ActionTypes.DELETE_ARTICLE_SUCCESS:
//       if (payload !== undefined && payload !== null) {
//         const { data } = payload;
//         return {
//           ...state,
//           items: items.filter(item => item.id !== data.id),
//           totalCount: totalCount - 1
//         };
//       }
//       return state;



//     case ActionTypes.LOGOUT:
//       return initialState;

//     default:
//       return state;
//   }
// }

// export default ArticleReducers;
