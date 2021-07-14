import React from 'react';
import Home from './components/HomeComponent';
import Main from './components/MainComponent';
import AuthSwitch from './components/AuthSwitchComponent';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';

const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <AuthSwitch />
    </Provider>
    
  );
}

