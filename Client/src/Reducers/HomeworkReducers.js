/**
 * HOMEWORK REDUCER
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

const HomeworkReducers = (state = initialState, action) => {
    const { items, totalCount } = state;
    const { payload } = action;

    switch (action.type) {
        case ActionTypes.CREATE_HOMEWORK_SUCCESS:
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

        case ActionTypes.UPDATE_HOMEWORK_SUCCESS:
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


        case ActionTypes.LISTOF_HOMEWORK_SUCCESS:
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


            case ActionTypes.LISTOF_ENDEDHOMEWORK_SUCCESS:
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

        case ActionTypes.RETRIEVE_HOMEWORK_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        items: (data.items === undefined ? [] : data.items),
                        hwDescription: data.hwDescription,
                        data: data
                    };
                }
            }
            return state;

        case ActionTypes.DELETE_HOMEWORK_SUCCESS:
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

export default HomeworkReducers;