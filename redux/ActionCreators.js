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
        date, 
        items: []
    };

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

export const fetchUpdatedIncidentValues = (incidentId, incidentNumber, newIncidentLocation, newIncidentNature, newDate, items) => dispatch => {
    console.log('made it to action creators');

    return fetch(baseUrl + 'incidents/' + incidentId, {
        method: "PUT",
        body: JSON.stringify({
            incidentNumber: incidentNumber,
            incidentLocation: newIncidentLocation,
            nature: newIncidentNature,
            date: newDate,
            items: items
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
            if (response.ok){
                //console.log(" xxxx     response successful");
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
    .then(response => dispatch(fetchIncidents()))
    .catch(error => {
        //console.log('post incident', error.message);
        alert('Your incident could not be modified\nError: ' + error.message);
    });
};

export const postItem = (incidentId, itemType, itemLocation, itemDescription, itemDate) => dispatch => {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx made it to action creater');
    /*const newItem = {
        incidentId,
        itemType,
        itemLocation,
        itemDescription, 
        itemDate
    };*/

    return fetch(baseUrl + 'incidents/' + incidentId, {
        method: "PUT",
        body: JSON.stringify({
            items: {
                itemType,
                itemLocation,
                itemDescription,
                itemDate
            }
        }),
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
    .then(response => dispatch(fetchIncidents()))
    .catch(error => {
        //console.log('post incident', error.message);
        alert('Your item could not be added\nError: ' + error.message);
    });
};

