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
            inputIncidentNumber:"",
            inputErrorMessage: ""
        };
    }

    componentDidMount(){
        console.log(this.props);
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

    handleOnPress(){
        const { navigate } = this.props.navigation;

        //for checking presence of special characters and spaces
        const regExPattern = new RegExp(/^[A-Za-z0-9]+$/);
        
        //reset state of error message
        this.setState({inputErrorMessage: ''});

        let inputIncidentNumber = this.state.inputIncidentNumber;
        console.log(this.state.inputIncidentNumber);

        //error messages
        if ((inputIncidentNumber.length > 7) || (inputIncidentNumber.length < 6)){
            return this.setState({inputErrorMessage: 'Incident number must be between 6 and 7 characters long'}); 
        }
        
        if (!regExPattern.test(inputIncidentNumber)){
            return this.setState({inputErrorMessage: 'Incident number must consist of only letters and numbers'});
        }

        //check existance of incident
        //console.log(this.props.incidents.incidents);

        let incidentArray = this.props.incidents.incidents.filter(incident => incident.incidentNumber === inputIncidentNumber);

        console.log(incidentArray);

        if (incidentArray.length === 1){
            console.log('case exists!');
            let incidentId = incidentArray[0].id;
            console.log(incidentId);
            navigate('DisplayCase', {incidentId: incidentId, incidentNumber: inputIncidentNumber})
        }else{
            return this.setState({inputErrorMessage: 'Incident not found; create a new case or re-enter number'});
        }


            
    }


    render(){
        
        

        return(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{marginTop: 100, width: '90%'}}>
                    <Input
                        placeholder='Enter Case Number'
                        style={{textAlign: 'center'}}
                        errorMessage={this.state.inputErrorMessage}
                        onChangeText={inputText => this.setState({inputIncidentNumber: inputText.toUpperCase()})}
                    />
                </View>
                <View style={{width: '90%', margin: 20}}>
                    <Button 
                        title="Go"  
                        //nmake sure value is required
                        //onPress={() => navigate('DisplayCase', {incidentId: 'hello', incidentNumber: 'bye'})}
                        onPress={() => this.handleOnPress()}
                    />
                </View>
            </View>
        )
    }
}



export default connect(mapStateToProps)(ViewCase);