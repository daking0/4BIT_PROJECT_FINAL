import { ActionTypes } from '../utils/ActionTypeList';

 //The initial state
const initialState = {
  items: [],
  page: 1,
  size: 20,
  totalCount: 0,
};
  

const RoadmapReducers = (state = initialState, action) => {
  const { items, totalCount } = state;
  const { payload } = action;
  
  switch (action.type) {
    case ActionTypes.LISTOF_ROADMAP_SUCCESS:
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

        case ActionTypes.RETRIEVE_ROADMAP_SUCCESS:
            if (payload !== undefined && payload !== null) {
              const { data } = payload;
              if (data !== undefined && data !== null) {
                return {
                  ...state,
                  items: (data.items === undefined ? [] : data.items),
                  exerciseContents :data.exerciseContents,
                  datas : data
                };
              }
            }
            return state;

            case ActionTypes.UPDATE_ROADMAP_SUCCESS:
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

              case ActionTypes.GET_ROADMAPLAST_SUCCESS:
                if (payload !== undefined && payload !== null) {
                  return {
                      ...state,
                      lastresult: payload.data
                  };
              }
              return state;

            case ActionTypes.LOGOUT:
              return initialState;
        
            default:
              return state;
    }
}

export default RoadmapReducers;