import { ActionTypes } from '../utils/ActionTypeList';
const initialState = {
    items: []
  };
const FileReducers = (state=initialState, action) => {
    const { items } = state;
    const { payload } = action;

    switch (action.type) {
        case ActionTypes.LISTOF_FILES_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                return {
                    ...state,
                    items: (data === undefined ? [] : data),
                    // items: [
                        
                    //     payload.data
                    // ]
                };
            }
            return state;

            default:
                 return state;
    }
}

export default FileReducers;
