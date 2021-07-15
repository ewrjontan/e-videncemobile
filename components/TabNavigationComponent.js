import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import DisplayCase from './DisplayCaseComponent';
import EditCase from './EditCaseComponent';

class TabNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  
  static navigationOptions = ({navigation}) => {
    return {
        title: "test" ,
        headerStyle: {
            backgroundColor: '#FFD600',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            fontWeight: 'bold',
        }        
    }
  };    

  render(){

    return(
      <View>
        <DisplayCase/>
      </View>
    )
  }
}


const TabNavigation = createBottomTabNavigator(
  {
    TabNavigator: TabNavigator,
    EditCase: EditCase,
  },
  {
      tabBarOptions: {
          activeBackgroundColor: '#5637DD',
          inactiveBackgroundColor: '#CEC8FF',
          activeTintColor: '#fff',
          inactiveTintColor: '#808080',
          labelStyle: {fontSize: 16}
      }
  }
);

export default TabNavigation;