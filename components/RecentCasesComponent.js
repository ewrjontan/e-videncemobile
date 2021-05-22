import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Card, Input, Button, Picker } from 'react-native-elements';

import { INCIDENTDATABASE } from '../shared/incidentDatabase';




class RecentCases extends Component {
    constructor(props){
        super(props);
        this.state = {
            incidentDatabase: INCIDENTDATABASE
        };
    }

    static navigationOptions = {
        title: 'Recent Cases',
        headerStyle: {
            backgroundColor: '#FFD600',
        },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
    };

    
    /*handleSubmit = () => {
        console.log("submit button clicked");
    }*/
    
    render(){

        const renderIncidents = ({item}) => {
            return(
                <Text>{item.incidentNumber}</Text>
            )
        }
    
        return (
            <View style={{marginTop: 30}}>

                <FlatList
                    data={this.state.incidentDatabase}
                    renderItem={renderIncidents}
                    keyExtractor={item => item.id.toString()}
                />
                

            </View>
        );
    }
}

const styles = StyleSheet.create({
    input:{
        height: 20,
        margin: 12,
        borderWidth: 1,

    }
})

export default RecentCases;
