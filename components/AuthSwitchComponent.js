import React, { Component } from 'react';
//import { View, Text, ScrollView, ImageBackground, StyleSheet, Button, SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//screens
import MainComponent from './MainComponent';
import Home from './HomeComponent';
//import AuthLoadingScreen from './AuthLoading';



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

