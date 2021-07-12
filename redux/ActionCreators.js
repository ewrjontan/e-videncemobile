import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { Alert } from 'react-native';
import { AsyncStorage } from '@react-native-community/async-storage';


//For login

//return fetch(baseUrl + 'users/login';

export const login = (loginInput) => {
    console.log('action creator login input');
    const { username, password } = loginInput;

    console.log(`username: ${loginInput.username}`);
    console.log(`password: ${loginInput.password}`);

    console.log('sending this to server');
    console.log(JSON.stringify(loginInput));


    return (dispatch) => {  // don't forget to use dispatch here!

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInput),
        })
        .then((response) => response.json())
        .then((json) => {
          if (json.success === true) { // response success checking logic could differ
            dispatch(setLoginState({ ...json, token: json.token })); // our action is called here
            return 'Hello this is from action creaters';
          } else {
            Alert.alert('Login Failed', 'Username or Password is incorrect');
          }
        })
        .catch((err) => {
            Alert.alert('Login Failed', 'Some error occured, please retry');
            console.log(err);
        });
    };
};

const setLoginState = (loginData) => {
    return {
        type: ActionTypes.SET_LOGIN_STATE,
        payload: loginData,
    };
};

//For incidents

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
        date/*, 
        items: [] dont need*/
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


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Items xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

export const fetchItems = () => dispatch => {
    return fetch(baseUrl + 'items')
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
        .then(items => dispatch(addItems(items)))
        .catch(error => dispatch(itemsFailed(error.message)));
};

export const addItems = items => ({
    type: ActionTypes.ADD_ITEMS,
    payload: items
});

export const itemsFailed = errMess => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: errMess
});

export const postItem = (incidentNumber, type, locationFound, description, date, itemNumber) => dispatch => {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx made it to action creater');
    const newItem = {
        incidentNumber,
        type,
        locationFound,
        description, 
        date,
        itemNumber
    };

    return fetch(baseUrl + 'items/', {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
            if (response.ok){
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
    .then(response => dispatch(CREATE_ITEM(response)))
    .catch(error => {
        //console.log('post incident', error.message);
        alert('Your item could not be added\nError: ' + error.message);
    });
};

export const CREATE_ITEM = newItem => ({
    type: ActionTypes.CREATE_ITEM,
    payload: newItem
});
