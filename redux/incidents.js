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
            console.log(' xxxxx MY state is:');
            console.log(state);
            const updatedIncident = action.payload;
            console.log('made it to reducer');
            console.log(updatedIncident);

            let removedIncidentArray = state.incidents.filter(incident => incident.id !== updatedIncident.id);

            console.log('removing incident');
            console.log(removedIncidentArray);

            updatedIncident.id = state.incidents.length;
            return {...state, incidents: state.incidents.concat(updatedIncident)};
        
        default:
            return state;
    }
};