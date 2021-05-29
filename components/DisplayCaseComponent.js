import React, { Component } from 'react';

import INCIDENTDATABASE from '../shared/incidentDatabase';

import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

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
                
                <ListItem bottomDivider style={{marginBottom: 10}}>
                    <ListItem.Content>
                        <ListItem.Title>Item: {item.id} </ListItem.Title>
                        <ListItem.Title>Description: {item.description}</ListItem.Title>
                        <ListItem.Subtitle>Type: {item.type}</ListItem.Subtitle>
                        <ListItem.Subtitle>Location Found: {item.locationFound}</ListItem.Subtitle>

                    </ListItem.Content>
                
                </ListItem>
                    
            );
        };

        return(
            <ScrollView>
                <View style={styles.caseInfo}>
                    <Text>Nature of Incident: {incident.nature}</Text>
                    <Text>Date of Incident: {incident.date}</Text>
                    <Text>Location of Incident: {incident.incidentLocation}</Text>
                </View>
                

                <FlatList
                    data={incident.items}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    caseInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    }
});

export default connect(mapStateToProps)(DisplayCase);