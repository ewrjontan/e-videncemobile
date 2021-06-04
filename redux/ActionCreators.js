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

export const postIncident = (incidentNumber, incidentLocation, nature, date) => dispatch => {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx made it to action creater');
    const newIncident = {
        incidentNumber,
        incidentLocation,
        nature,
        date
    };

    /*setTimeout (() => {
        dispatch(createIncident(newIncident));
    }, 2000);*/

    return fetch(baseUrl + 'incidents', {
        method: "POST",
        body: JSON.stringify(newIncident),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
            if (response.ok){
                //console.log("response successful");
                //console.log(response);
                return response;
            }else{
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response =>  response.json())
    .then(response => dispatch(createIncident(response)))
    .catch(error => {
        //console.log('post incident', error.message);
        alert('Your incident could not be created\nError: ' + error.message);
    });


};

export const createIncident = incident =>({
    type: ActionTypes.CREATE_INCIDENT,
    payload: incident
})