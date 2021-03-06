import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import { fetchUpdatedIncidentValues } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        incidents: state.incidents,
        loginReducer: state.loginReducer
    };
};

const mapDispatchToProps = {
    /*fetchUpdatedIncidentValues: (incidentId, incidentNumber, newIncidentLocation, newIncidentNature, newDate, items) => (fetchUpdatedIncidentValues(incidentId, incidentNumber, newIncidentLocation, newIncidentNature, newDate, items))*/
    fetchUpdatedIncidentValues

};


function Saving(){
    return (
        <View style={styles.savingView}>
            <ActivityIndicator size='large' color='black' />
            <Text style={styles.savingText}>Saving . . .</Text>
        </View>
    );
}


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
            incidentLocationErrorMessage: '',
            incidentNatureErrorMessage: '',
            saving: false,
            currentLocation: '',
            currentNature: '',
            currentDateAndTime: '',
            currentIncidentId: '',
            currentItems: '',
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
        const incident = this.props.incidents.incidents.filter(incident => incident._id === passedIncidentId)[0];
        console.log('My incident:');
        console.log(incident);

        this.setState({
            incidentNumber: incident.incidentNumber,
            incidentLocation: incident.incidentLocation,
            incidentNature: incident.nature,
            incidentDateAndTime: incident.date,
            currentLocation: incident.incidentLocation,
            currentNature: incident.nature,
            currentDateAndTime: incident.date,
            currentIncidentId: incident._id,
            //currentItems: incident.items
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

    handleSave = () => {
        console.log("save button clicked");
        
        console.log('current values');
        console.log(this.state.currentLocation, this.state.currentNature, this.state.currentDateAndTime);
        
        let inputIncidentLocation = this.state.incidentLocation.toUpperCase();
        let inputIncidentNature = this.state.incidentNature.toUpperCase();
        let inputIncidentDateAndTime = this.state.incidentDateAndTime;

        console.log('New values');    
        console.log(inputIncidentLocation, inputIncidentNature, inputIncidentDateAndTime);

        //reset state of error message
        this.setState({incidentLocationErrorMessage: '', incidentNatureErrorMessage: ''});

        //error messages
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
    

        if (inputIncidentLocation !== this.state.currentLocation || inputIncidentNature !== this.state.currentNature || inputIncidentDateAndTime !== this.state.currentDateAndTime){
            Alert.alert(
                'Are you sure you want to save these changes?',
                '',
                [
                    {
                        text: 'No',
                        onPress: () => console.log('Cancel pressed'),
                        style:'cancel'
                    },
                    {text: 'Yes', onPress: () => {
                        console.log('ok pressed');
                        
                        //add await and navigate back to main case page
                        const { navigate } = this.props.navigation;

                        //this.props.fetchUpdatedIncidentValues(this.state.currentIncidentId, this.state.incidentNumber, inputIncidentLocation, inputIncidentNature, inputIncidentDateAndTime, this.state.currentItems);

                        this.props.fetchUpdatedIncidentValues(this.state.currentIncidentId, this.state.incidentNumber, inputIncidentLocation, inputIncidentNature, inputIncidentDateAndTime, this.props.loginReducer.token);


                        this.setState({saving: true});
                        
                        //wait for props to get updated
                        setTimeout(() => {                            
                            navigate('DisplayCase', {incidentId: this.state.currentIncidentId, incidentNumber: this.state.incidentNumber}) 
                        },2000);

                        }
                    }
                ]
            );    
        }else{
            Alert.alert(
                'No Changes Have Been Made',
                '',
                [
                    {text: 'Ok', onPress: () => console.log('ok pressed')}
                ]
            );      
        }


    }
    
    render(){
        
        if (!this.state.saving){
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
                        <Button title="Save" onPress={this.handleSave} />
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
            return <Saving />
        }
    }
}

const styles = StyleSheet.create({
    input:{
        height: 20,
        margin: 12,
        borderWidth: 1,
    },
    savingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    savingText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCase);
