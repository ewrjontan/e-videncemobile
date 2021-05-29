import React, { Component } from 'react';

import INCIDENTDATABASE from '../shared/incidentDatabase';

import { View, Text } from 'react-native';

import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        incidents: state.incidents
    };
};


class ViewCase extends Component{
    constructor(props){
        super(props);
        this.state = {
            //incidentNumber : this.props.navigation.getParam('incidentNumber')
            activeIncident: ""
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
        
        const incidentId = this.props.navigation.getParam('incidentId');
        const incident = this.props.incidents.incidents.filter(incident => incident.id === incidentId)[0];

        console.log(incident);
        return(
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
}



export default connect(mapStateToProps)(ViewCase);