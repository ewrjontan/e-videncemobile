import { initialState } from './initialState';
import * as ActionTypes from './ActionTypes';

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOGIN_STATE:
      console.log('my login payload');
      console.log(action.payload);
      return {
        ...state,
        ...action.payload, // this is what we expect to get back from API call and login page input
        isLoggedIn: true, // we set this as true on login
      };
    default:
      return state;
  }
};