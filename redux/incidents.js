import * as ActionTypes from './ActionTypes';

export const incidents = (state = { isLoading: true, errMess: null, incidents: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_INCIDENTS:
            return {...state, isLoading: false, errMess: null, incidents: action.payload};
        
        case ActionTypes.INCIDENTS_LOADING:
            return {...state, isLoading: true, errMess: null, incidents: []}

        case ActionTypes.INCIDENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
        case ActionTypes.CREATE_INCIDENT:
            const newIncident = action.payload;
            newIncident.id = state.incidents.length;

            return {...state, incidents: state.incidents.concat(newIncident)};

        case ActionTypes.UPDATE_INCIDENT:
            const updatedValues = action.payload;
            console.log('made it to incident reducer');
            console.log(updatedValues);

        default:
            return state;
    }
};