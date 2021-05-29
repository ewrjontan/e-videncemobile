import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchIncidents = () => dispatch => {
    return fetch(baseUrl + 'incidents')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(incidents => dispatch(addIncidents(incidents)))
        .catch(error => dispatch(incidentsFailed(error.message)));
};

export const addIncidents = incidents => ({
    type: ActionTypes.ADD_INCIDENTS,
    payload: incidents
});

export const incidentsFailed = errMess => ({
    type: ActionTypes.INCIDENTS_FAILED,
    payload: errMess
});