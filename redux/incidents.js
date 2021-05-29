import * as ActionTypes from './ActionTypes';

export const incidents = (state = { isLoading: true, errMess: null, incidents: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_INCIDENTS:
            return {...state, isLoading: false, errMess: null, incidents: action.payload};
        
        case ActionTypes.INCIDENTS_LOADING:
            return {...state, isLoading: true, errMess: null, incidents: []}

        case ActionTypes.INCIDENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        /*
        case ActionTypes.ADD_COMMENT:
            const newComment = action.payload;
            newComment.id = state.comments.length;

            return {...state, comments: state.comments.concat(newComment)};*/

        default:
            return state;
    }
};