import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator, TextInput } from 'react-native';
import { Card, Input, Button, Picker } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import { fetchUpdatedIncidentValues } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        incidents: state.incidents
    };
};

const mapDispatchToProps = {
    fetchUpdatedIncidentValues: (incidentId, incidentNumber, newIncidentLocation, newIncidentNature, newDate, items) => (fetchUpdatedIncidentValues(incidentId, incidentNumber, newIncidentLocation, newIncidentNature, newDate, items))

};


function Saving(){
    return (
        <View style={styles.savingView}>
            <ActivityIndicator size='large' color='black' />
            <Text style={styles.savingText}>Saving . . .</Text>
        </View>
    );
}


class EditItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDatePickerVisible: false,
            setDatePickerVisibility: false,
            itemType: '',
            itemLocation: '',
            itemDateAndTime: null,
            itemDescription: '',
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
        console.log('xxxxx edit item component xxxxxxxxxxx');
        this.setCurrentValues();
    }

    static navigationOptions = {
        title: 'Edit Item',
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
            incidentDateAndTime: incident.date,
            currentLocation: incident.incidentLocation,
            currentNature: incident.nature,
            currentDateAndTime: incident.date,
            currentIncidentId: incident.id,
            currentItems: incident.items
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
        this.setState({itemDateAndTime: date.toString() });
        this.hideDatePicker();
    };

    handleAddItem = () => {
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

        //this.props.postIncident(inputIncidentNumber, inputIncidentLocation, inputIncidentNature, inputIncidentDateAndTime);

        //reset state
        //this.setState({incidentNumber:'', incidentLocation: '', incidentNature: '', incidentDateAndTime: null, loading: true});

        //navigate('TabNavigation', {incidentId: 'test'});

        /*setTimeout (() => {
            navigate('DisplayCase', {incidentId: futureIncidentId, incidentNumber: inputIncidentNumber});
        }, 5000);*/

    

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
                        
                        /*async function fetchUpdatedValues(){
                            await this.props.fetchUpdatedIncidentValues(this.state.currentIncidentId, this.state.incidentNumber, inputIncidentLocation, inputIncidentNature, inputIncidentDateAndTime, this.state.currentItems);
                        };*/
                        
                        //add await and navigate back to main case page
                        const { navigate } = this.props.navigation;

                        /*fetchUpdatedValues().then(
                            console.log('updated values yo')
                            //navigate('DisplayCase', {incidentId: this.state.currentIncidentId, incidentNumber: this.state.incidentNumber})
                        );*/
                        this.props.fetchUpdatedIncidentValues(this.state.currentIncidentId, this.state.incidentNumber, inputIncidentLocation, inputIncidentNature, inputIncidentDateAndTime, this.state.currentItems);

                        this.setState({saving: true});
                        
                        //wait for props to get updated
                        setTimeout(() => {                            
                            navigate('DisplayCase', {incidentId: this.state.currentIncidentId, incidentNumber: this.state.incidentNumber}) 
                        },5000);

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
                <View style={{marginTop: 30, alignItems: 'center'}}>

                    <Input 
                        style={{textAlign: 'center'}}
                        placeholder='Enter Item Type'
                        onChangeText={input => this.setState({itemType: input})}
                        value={this.state.itemType}
                    />

                    <Input 
                        style={{textAlign: 'center'}}
                        placeholder='Enter Location Found'
                        onChangeText={input => this.setState({itemLocation: input})}
                        value={this.state.itemLocation}
                    />    

                    <TextInput 
                        style={styles.textInput}
                        onChangeText={input => this.setState({itemDescription: input})}
                        value={this.state.itemDescription}
                        placeholder="Enter Item Description"
                        placeholderTextColor='#86939e'
                        multiline
                        numberOfLines={4}
                    >

                    </TextInput>
                    

                    <Text style={{textAlign: 'center', fontSize: 18}}>{this.state.itemDateAndTime}</Text>

                    <View style={{width: '90%', margin: 20}}>
                        <Button title="Select Date and Time of Collection" onPress={this.showDatePicker} type="outline" />
                    </View>

                    <View style={{width: '90%', marginVertical: 20}}>
                        <Button title="Add Item" onPress={this.handleAddItem} />
                    </View>

                    <View style={{width: '90%'}}>
                        <Button title="Save and Add Another" onPress={this.handleSaveAndAddItem} />
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
    textInput:{
        textAlign: 'center',
        borderWidth: 1,
        fontSize: 18,
        borderColor: '#86939e',
        width: '95%',
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

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
