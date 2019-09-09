/**
 * HWARTICLE REDUCER
 * @author: 영빈
 */

import { ActionTypes } from '../utils/ActionTypeList';

// The initial state
const initialState = {
    items: [],
    page: 1,
    size: 10,
    totalCount: 0
};


const HwArticleReducers = (state = initialState, action) => {
    const { items, totalCount } = state;
    const { payload } = action;

    switch (action.type) {
        case ActionTypes.CREATE_HWARTICLE_SUCCESS:
            if (payload !== undefined && payload !== null) {
                return {
                    ...state,
                    items: [
                        ...items,
                        payload.data
                    ],
                    totalCount: totalCount + 1,
                    HwArticleId : payload.data.hwArticleId
                };
            }
            return state;

        case ActionTypes.UPDATE_HWARTICLE_SUCCESS:
            if (payload !== undefined && payload !== null) {
                return {
                    ...state,
                    item: [
                        ...items,
                        payload.data
                    ],
                    updateresult: payload.data
                };
            }
            return state;


        case ActionTypes.LISTOF_HWARTICLE_SUCCESS:
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

        case ActionTypes.RETRIEVE_HWARTICLE_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        items: (data.items === undefined ? [] : data.items),
                        datas: data
                    };
                }
            }
            return state;

        case ActionTypes.DELETE_HWARTICLE_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                return {
                    ...state,
                    items: items.filter(item => item.id !== data.id),
                    totalCount: totalCount - 1
                };
            }
            return state;

        case ActionTypes.FINDMY_HWARTICLE_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        // items: (datas.items === undefined ? [] : data.items),
                        data: data
                    };
                }
            }
            return state;

        case ActionTypes.FINDMY_HWARTICLE_FORTEACHER_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        // items: (datas.items === undefined ? [] : data.items),
                        data: data
                    };
                }
            }
            return state;

        case ActionTypes.FINDMY_HWARTICLE_FORTEACHER_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        items: (data.items === undefined ? [] : data.items),
                        data: data
                    };
                }
            }
            return state;

        case ActionTypes.LOGOUT:
            return initialState;

        default:
            return state;


    }

}

export default HwArticleReducers;