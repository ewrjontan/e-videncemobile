import * as ActionTypes from './ActionTypes';

export const items = (state = { isLoading: true, errMess: null, items: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ITEMS:
            return {...state, isLoading: false, errMess: null, items: action.payload};
        
        case ActionTypes.ITEMS_LOADING:
            return {...state, isLoading: true, errMess: null, items: []}

        case ActionTypes.ITEMS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
        case ActionTypes.CREATE_ITEM:

            const newItem = action.payload;

            return {...state, items: state.items.concat(newItem)};
        
        default:
            return state;
    }
};