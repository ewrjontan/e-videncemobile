import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CreateCase from './CreateCaseComponent';
import RecentCases from './RecentCasesComponent';
import DisplayCase from './DisplayCaseComponent';





export default createBottomTabNavigator({
  RecentCases: RecentCases,
  CreateCase: CreateCase,
  DisplayCase: DisplayCase
});