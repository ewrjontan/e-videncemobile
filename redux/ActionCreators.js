import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { Alert } from 'react-native';
//import AsyncStorage from @react-native-community/async-storage;

//xxxxxxxxxxx For Users

// Login
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInput),
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
        )
        .then((response) => response.json())
        .then((json) => {
          if (json.success === true) { // response success checking logic could differ
            let userToken = json.token;
            dispatch(setLoginState({ ...json, token: json.token, userId: json.userId })); // our action is called here
            //dispatch(fetchIncidents({ ...json, userToken: json.token}));
            dispatch(fetchIncidents(userToken));
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

//logout
export const logout = () => {
    
    return (dispatch) => {  // don't forget to use dispatch here!

    return fetch(baseUrl + 'users/logout'
       )
        .then((response) => response.json())
        .then((json) => {
          if (json.success === true) { // response success checking logic could differ
            dispatch(setLoginState({ ...json, token: null, userId: null })); // our action is called here
            
            //added for asyncstorage
            /*const storeData = async (value) => {
                try {
                    console.log('storing token actioncreator');
                    console.log(value.token);
                    AsyncStorage.setItem('userToken', value.token)
                } catch (e) {
                  // saving error
                }
            };

            storeData(json);*/

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


//for registration
export const register = (registrationInput) => {

    console.log('action creator registration input');
    const { username, password, firstname, lastname, agency, email } = registrationInput;
    console.log('sending this to server');
    console.log(JSON.stringify(registrationInput));

    //return (dispatch) => {  // don't forget to use dispatch here!

    //return (dispatch) => {console.log('hello!')}

    return fetch(baseUrl + 'users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationInput),
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
        )
        .then((response) => response.json())
        .then((json) => {
        //console.log('my json');
        //console.log(json);  
          if (json.success === true) { // response success checking logic could differ
            console.log('my json2');
            console.log(json); 
            //Alert.alert('Registration Successful', 'Welcome to E-Vidence! Please login to your account to get started.');
            
            //dispatch(login({ ...json, token: json.token })); // our action is called here
            //dispatch(login({ username: registrationInput.username, password: registrationInput.password})); // our action is called here
            //dispatch(message('hello this is the dispatch function!'));    
          } else {
            //Alert.alert('Registration Failed', 'Username already exists, please login to your account.');
            console.log('error, username already exists');
          }
        })
        .catch((err) => {
            //Alert.alert('Registration Failed', 'Some error occured, please retry' + err);
            console.log(err);
        });
    };
//};

function message(message) {
    Alert.alert(message);
}

/*const setLoginState = (loginData) => {
    return {
        type: ActionTypes.SET_LOGIN_STATE,
        payload: loginData,
    };
};*/

export const fetchUser = (userData) => dispatch => {
    console.log("this is my action creator passed userId");
    console.log(userData.userId, userData.userToken);
    return fetch(baseUrl + 'users/' + userData.userId, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userData.userToken
        }
    })
        .then(response => {
            console.log(response);
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    //throw error;
                    console.log(error);
                }
            },
            error => {
                const errMess = new Error(error.message);
                //throw errMess;
                console.log(errMess);

            })
        .then(response => response.json())
        .then(userInfo => dispatch(addUser(userInfo)))
        .catch(error => dispatch(userFailed(error.message)));
};

export const addUser = userInfo => ({
    type: ActionTypes.ADD_USER,
    payload: userInfo
});

export const userFailed = errMess => ({
    type: ActionTypes.USER_FAILED,
    payload: errMess
});

//For incidents

//export const fetchIncidents = (userData) => dispatch => {
export const fetchIncidents = (userToken) => dispatch => {

    console.log('token at incident action creater');
    //console.log(userData);
    return fetch(baseUrl + 'incidents', {
        headers: {
            "Content-Type": "application/json",
            //"Authorization": "Bearer " + userData.userToken
            "Authorization": "Bearer " + userToken
        }
    })
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

export const postIncident = (incidentNumber, incidentLocation, nature, date, userToken) => dispatch => {
    console.log(' made it to action creater');
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
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken
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

//export const fetchUpdatedIncidentValues = (incidentId, incidentNumber, newIncidentLocation, newIncidentNature, newDate, items) => dispatch => {
export const fetchUpdatedIncidentValues = (incidentId, incidentNumber, newIncidentLocation, newIncidentNature, newDate, userToken) => dispatch => {

    console.log('made it to action creators');

    return fetch(baseUrl + 'incidents/' + incidentId, {
        method: "PUT",
        body: JSON.stringify({
            incidentNumber: incidentNumber,
            incidentLocation: newIncidentLocation,
            nature: newIncidentNature,
            date: newDate,
            //items: items
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken
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
    //.then(response => dispatch(fetchIncidents()))
    .then(json => dispatch(fetchIncidents({ ...json, userToken: userToken})))
    .catch(error => {
        //console.log('post incident', error.message);
        alert('Your incident could not be modified\nError: ' + error.message);
    });
};


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Items xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

export const fetchItems = (incidentId, userToken) => dispatch => {

    return fetch(baseUrl + 'incidents/' + incidentId + '/items', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken
        }
    })
    
    //return fetch(baseUrl + 'items')
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

export const postItem = (incidentId, incidentNumber, type, locationFound, description, date, userToken) => dispatch => {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx made it to action creator');
    const newItem = {
        type,
        locationFound,
        description, 
        date
    };

    return fetch(baseUrl + 'incidents/' + incidentId + '/items', {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken
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
    //.then(response => dispatch(fetchItems(incidentId, userToken)))
    .then(() => dispatch(fetchIncidents(userToken)))
    .catch(error => {
        //console.log('post incident', error.message);
        alert('Your item could not be added\nError: ' + error.message);
    });
};

export const CREATE_ITEM = newItem => ({
    type: ActionTypes.CREATE_ITEM,
    payload: newItem
});

export const updateItem = (incidentId, itemId, newItemType, newItemLocation, newItemDescription, newItemDate, userToken) => dispatch => {

    console.log('made it to action creators');

    return fetch(baseUrl + 'incidents/' + incidentId + '/items/' + itemId, {
        method: "PUT",
        body: JSON.stringify({
            type: newItemType,
            locationFound: newItemLocation,
            description: newItemDescription,
            date: newItemDate,
            //items: items
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken
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
    //.then(json => dispatch(fetchItems(incidentId, userToken)))
    .then(() => dispatch(fetchIncidents(userToken)))
    .catch(error => {
        //console.log('post incident', error.message);
        alert('Your item could not be modified\nError: ' + error.message);
    });
};

