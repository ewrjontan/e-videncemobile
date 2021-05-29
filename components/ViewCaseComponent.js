import React, { Component } from 'react';

import INCIDENTDATABASE from '../shared/incidentDatabase';

import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

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
        
        const { navigate } = this.props.navigation;

        return(
            <View>
                <Input
                    placeholder='Enter Case Number'
                    style={{marginTop: 100}}
                />
                <View style={{width: '90%', margin: 20}}>
                    <Button 
                        title="Go"  
                        //nmake sure value is required
                        onPress={() => navigate('DisplayCase', {incidentId: 'hello', incidentNumber: 'bye'})}
                    />
                </View>
            </View>
        )
    }
}



export default connect(mapStateToProps)(ViewCase);