/**
 * HWREPLY REDUCER
 * @author: 영빈
 * */
import { ActionTypes } from '../utils/ActionTypeList';

//The initial state
const initialState = {
    items: []
};

const HwReplyReducers = (state = initialState, action) => {
    const { items } = state;
    const { payload } = action;

    switch (action.type) {

        case ActionTypes.LISTOF_HWREPLY_SUCCESS:
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

        case ActionTypes.RETRIEVE_HWREPLY_SUCCESS:
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


        case ActionTypes.CREATE_HWREPLY_SUCCESS:
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

        case ActionTypes.UPDATE_HWREPLY_SUCCESS:
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

export default HwReplyReducers;