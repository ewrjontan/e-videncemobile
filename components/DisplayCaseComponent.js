import React, { Component } from 'react';

import INCIDENTDATABASE from '../shared/incidentDatabase';

import { View, Text, FlatList, ScrollView } from 'react-native';

import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        incidents: state.incidents
    };
};


class DisplayCase extends Component{
    constructor(props){
        super(props);
        this.state = {
            //incidentNumber : this.props.navigation.getParam('incidentNumber')
        };
    }

    componentDidMount(){
    
        //for static navigation options, won't work unless passed as property due to loading slowly?
        const incidentNumber = this.props.navigation.getParam('incidentNumber');
        this.props.navigation.setParams(incidentNumber);
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.incidentNumber,
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

        //get incident from props 
        const incidentId = this.props.navigation.getParam('incidentId');
        const incident = this.props.incidents.incidents.filter(incident => incident.incidentId === incidentId)[0];


        console.log("this is the active incident object");
        console.log(incident);

        const renderItem = ({item}) => {
            console.log(item.id);
            return(
                <View>
                    <Text>Item Number: {item.id}</Text>
                    <Text>Description: {item.description}</Text>
                </View>
    
            );
        };

        return(
            <ScrollView>
                <Text>Date of Incident: {incident.date}</Text>
                <Text>Incident Location: {incident.incidentLocation}</Text>
                <Text>Nature: {incident.nature}</Text>

                <FlatList
                    data={incident.items}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(DisplayCase);