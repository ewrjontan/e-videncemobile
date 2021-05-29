import React, { Component } from 'react';

import INCIDENTDATABASE from '../shared/incidentDatabase';

import { View, Text } from 'react-native';

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
            activeIncident: ""
        };
    }

    componentDidMount(){
        
        const incidentNumber = this.props.navigation.getParam('incidentNumber');
        const incident = this.props.incidents.incidents.filter(incident => incident.incidentNumber === incidentNumber)[0];

        this.setState({activeIncident: incident.incidentNumber});

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

        console.log(this.state.activeIncident);
        return(
            <View>
                <Text>{this.state.activeIncident}</Text>
            </View>
        )
    }
}



export default connect(mapStateToProps)(DisplayCase);