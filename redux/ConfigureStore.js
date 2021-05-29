import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { incidents } from './incidents';

// add persistance support for reducers
//import { persistStore, persistCombineReducers } from 'redux-persist';

//access to local storage on device, add storage support
//import storage from 'redux-persist/es/storage';

/*const config = {
    key: 'root',
    storage,
    debug: true
}*/

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
        //persistCombineReducers(config, {
            incidents
        }),
        applyMiddleware(thunk, logger)
    );

    //added for persistence
    //const persistor = persistStore(store);

    return store;
    //return { persistor, store };
}