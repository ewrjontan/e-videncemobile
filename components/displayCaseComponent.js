import React, { Component } from 'react';

import INCIDENTDATABASE from '../shared/incidentDatabase';

import { View, Text } from 'react-native';



class DisplayCase extends Component{
    constructor(props){
        super(props);
        this.state = {
            //incidentNumber : this.props.navigation.getParam('incidentNumber')
            currentCase: ""
        };
    }

    static navigationOptions = {
        title: 'View Case',
        headerStyle: {
            backgroundColor: '#FFD600',
        },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
    };    



    render(){
        
        const incidentNumber = this.props.navigation.getParam('name', "no case being passed");


        return(
            <View>
                <Text>{incidentNumber}</Text>
            </View>
        )
    }
}



export default DisplayCase;