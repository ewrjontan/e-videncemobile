import React, { Component, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Input, Button, Picker } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import Loading from './LoadingComponent';

import { postIncident } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        incidents: state.incidents
    };
};

const mapDispatchToProps = {
    postIncident: (incidentNumber, incidentLocation, nature, date) => (postIncident(incidentNumber, incidentLocation, nature, date))
};


class EditCase extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDatePickerVisible: false,
            setDatePickerVisibility: false,
            incidentNumber: '',
            incidentLocation: '',
            incidentNature: '',
            incidentDateAndTime: null,
            incidentNumberErrorMessage: '',
            incidentLocationErrorMessage: '',
            incidentNatureErrorMessage: '',
            loading: false
        };
    }

    componentDidMount(){
        console.log('xxxxx edit case component xxxxxxxxxxx');
        this.setCurrentValues();
    }

    static navigationOptions = {
        title: 'Edit Case Information',
        headerStyle: {
            backgroundColor: '#FFD600',
        },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
    };

    setCurrentValues(){
        const passedIncidentId = this.props.navigation.getParam('incidentId');
        const incident = this.props.incidents.incidents.filter(incident => incident.id === passedIncidentId)[0];

        this.setState({
            incidentNumber: incident.incidentNumber,
            incidentLocation: incident.incidentLocation,
            incidentNature: incident.nature,
            incidentDateAndTime: incident.date
        });
    }

    showDatePicker = () => {
        console.log("show date picker works");
        this.setState({setDatePickerVisibility: true});
        this.setState({isDatePickerVisible: true});
    };

    hideDatePicker = () => {
        this.setState({setDatePickerVisibility: false});
        this.setState({isDatePickerVisible: false});

    };

    handleDateConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        this.setState({incidentDateAndTime: date.toString() });
        this.hideDatePicker();
    };

    handleSubmit = () => {
        console.log("submit button clicked");
        console.log('length: ');
        
        console.log(this.state.incidentNumber, this.state.incidentLocation, this.state.incidentNature, this.state.incidentDateAndTime);
        
        let futureIncidentId = this.props.incidents.incidents.length;
        let inputIncidentNumber = this.state.incidentNumber.toUpperCase();
        let inputIncidentLocation = this.state.incidentLocation.toUpperCase();
        let inputIncidentNature = this.state.incidentNature.toUpperCase();
        let inputIncidentDateAndTime = this.state.incidentDateAndTime;

        console.log(futureIncidentId);

        const { navigate } = this.props.navigation;

        //for checking presence of special characters and spaces
        const regExPattern = new RegExp(/^[A-Za-z0-9]+$/);
        
        //reset state of error message
        this.setState({incidentNumberErrorMessage: '', incidentLocationErrorMessage: '', incidentNatureErrorMessage: ''});

        //error messages
        if ((inputIncidentNumber.length > 7) || (inputIncidentNumber.length < 6)){
            return this.setState({incidentNumberErrorMessage: 'Incident number must be between 6 and 7 characters long'}); 
        }
        
        if (!regExPattern.test(inputIncidentNumber)){
            return this.setState({incidentNumberErrorMessage: 'Incident number must consist of only letters and numbers'});
        }

        //check existance of incident
        //console.log(this.props.incidents.incidents);

        let incidentArray = this.props.incidents.incidents.filter(incident => incident.incidentNumber === inputIncidentNumber);

        console.log(incidentArray);

        if (incidentArray.length === 1){
            console.log('case exists!');
            return this.setState({incidentNumberErrorMessage: 'Incident already exists, please a enter new incident'});
        }

        console.log('Checking location');
        //check location is entered    
        if (inputIncidentLocation !== '' ){
            console.log('location is valid');
        }else{
            return this.setState({incidentLocationErrorMessage: 'Please enter incident location'});
        }

        //check nature is entered    
        if (inputIncidentNature !== '' ){
            console.log('Nature is valid');
        }else{
            return this.setState({incidentNatureErrorMessage: 'Please enter incident nature'});
        }

        //check date and time is selected    
        if (inputIncidentDateAndTime !== null ){
            console.log('date and time is selected');
        }else{
            return this.setState({incidentNatureErrorMessage: 'Please select the date and time of incident'});
        }

        this.props.postIncident(inputIncidentNumber, inputIncidentLocation, inputIncidentNature, inputIncidentDateAndTime);
        console.log('case created!');

        //reset state
        this.setState({incidentNumber:'', incidentLocation: '', incidentNature: '', incidentDateAndTime: null, loading: true});

        //navigate('TabNavigation', {incidentId: 'test'});

        setTimeout (() => {
            navigate('DisplayCase', {incidentId: futureIncidentId, incidentNumber: inputIncidentNumber});
        }, 5000);


    }
    
    render(){
        
        if (!this.state.loading){
            return (
                <View style={{marginTop: 30}}>

                    <Input 
                        disabled
                        style={{textAlign: 'center'}}
                        placeholder='Enter Incident Number'
                        onChangeText={incidentNumber => this.setState({incidentNumber: incidentNumber})}
                        value={this.state.incidentNumber}
                        errorMessage={this.state.incidentNumberErrorMessage}
                    />

                    <Input 
                        style={{textAlign: 'center'}}
                        placeholder='Enter Location of Incident'
                        onChangeText={incidentLocation => this.setState({incidentLocation: incidentLocation})}
                        value={this.state.incidentLocation}
                        errorMessage={this.state.incidentLocationErrorMessage}
                    />  

                    <Input 
                        style={{textAlign: 'center'}}
                        placeholder='Enter Nature of Incident'
                        onChangeText={incidentNature => this.setState({incidentNature: incidentNature})}
                        value={this.state.incidentNature}
                        errorMessage={this.state.incidentNatureErrorMessage}

                    />      
                    

                    <Text style={{textAlign: 'center', fontSize: 18}}>{this.state.incidentDateAndTime}</Text>

                    <View style={{width: '90%', margin: 20}}>
                        <Button title="Select Date and Time of Incident" onPress={this.showDatePicker} type="outline" />
                    </View>

                    <View style={{width: '90%', margin: 20}}>
                        <Button title="Save" onPress={this.handleSubmit} />
                    </View>
                    

                    <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode="datetime"
                        onConfirm={this.handleDateConfirm}
                        onCancel={this.hideDatePicker}
                    />


                </View>
            );
        }else{
            return <Loading />
        }
    }
}

const styles = StyleSheet.create({
    input:{
        height: 20,
        margin: 12,
        borderWidth: 1,

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCase);
