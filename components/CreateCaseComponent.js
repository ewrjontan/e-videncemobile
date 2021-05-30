import React, { Component, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Input, Button, Picker } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";


class CreateCase extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDatePickerVisible: false,
            setDatePickerVisibility: false,
            incidentDateAndTime: null
        };
    }

    static navigationOptions = {
        title: 'Create New Case',
        headerStyle: {
            backgroundColor: '#FFD600',
        },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
    };

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
        console.warn("A date has been picked: ", date);
        this.setState({incidentDateAndTime: date.toString() });
        this.hideDatePicker();
    };

    handleSubmit = () => {
        console.log("submit button clicked");
    }
    
    render(){
    
        return (
            <View style={{marginTop: 30}}>

                <Input 
                    style={{textAlign: 'center'}}
                    placeholder='Enter Case Number'
                />

                <Input 
                    style={{textAlign: 'center'}}
                    placeholder='Enter Location of Incident'
                />  

                <Input 
                    style={{textAlign: 'center'}}
                    placeholder='Enter Nature of Incident'
                />      
                

                <Text style={{textAlign: 'center', fontSize: 18}}>{this.state.incidentDateAndTime}</Text>

                <View style={{width: '90%', margin: 20}}>
                    <Button title="Select Date and Time of Incident" onPress={this.showDatePicker} type="outline" />
                </View>

                <View style={{width: '90%', margin: 20}}>
                    <Button title="Submit" onPress={this.handleSubmit} />
                </View>
                

                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="datetime"
                    onConfirm={this.handleDateConfirm}
                    onCancel={this.hideDatePicker}
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

export default CreateCase;
