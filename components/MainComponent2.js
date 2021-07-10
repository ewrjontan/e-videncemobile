import React, { Component } from 'react';
//import { View, Text, ScrollView, ImageBackground, StyleSheet, Button, SafeAreaView } from 'react-native';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { Card, Button, Input } from 'react-native-elements';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { login } from '../redux/ActionCreators';
import { connect } from 'react-redux';

//screens
import RecentCases from './RecentCasesComponent';
import ViewCase from './ViewCaseComponent';
import DisplayCase from './DisplayCaseComponent';
import MainComponent from './MainComponent';
import Home from './HomeComponent';
import AuthLoadingScreen from './AuthLoading';



//const AppStack = createStackNavigator({ Main: HomeScreen});
const AuthStack = createStackNavigator({ Home: Home});

export default createAppContainer(
    createSwitchNavigator(
      {
        //AuthLoading: AuthLoadingScreen,
        App: MainComponent,
        Auth: AuthStack,
      },
      {
        initialRouteName: 'Auth',
      }
    )
  );

