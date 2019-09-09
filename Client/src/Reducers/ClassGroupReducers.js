
import { ActionTypes } from '../utils/ActionTypeList';

const initialClassGroup = {
    items:[]
};

const ClassGroupReducers = (state = initialClassGroup, action) =>{
    const {items} = state;
    const { payload } = action;

    switch (action.type) {
        case ActionTypes.REGISTER_CLASSGROUP_SUCCESS :
            if(payload !== undefined && payload !== null){
                const { data } = payload;
                return {
                    items: [
                        ...items,
                        payload.data
                    ]
                };
            }
            return state;

            
            case ActionTypes.LIST_CLASS_ALL_SUCCESS :
                    if(payload !== undefined && payload !== null){
                        const { data } = payload;
                        return {
                            ...state,
                            items: (data.items === undefined ? [] : data.items),
                            page: data.page,
                            size: data.size
                        };
                    }
            return state;

        default:
            return state;
    }
}
export default ClassGroupReducers;