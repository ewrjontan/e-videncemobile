import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator, TextInput } from 'react-native';
import { Card, Input, Button, Picker } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import { fetchUpdatedIncidentValues, updateItem } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        incidents: state.incidents,
        items: state.items,
        loginReducer: state.loginReducer
    };
};

const mapDispatchToProps = {
    //fetchUpdatedIncidentValues: (incidentId, incidentNumber, newIncidentLocation, newIncidentNature, newDate, items) => (fetchUpdatedIncidentValues(incidentId, incidentNumber, newIncidentLocation, newIncidentNature, newDate, items))
    updateItem
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
            itemTypeErrorMessage: '',
            itemLocationErrorMessage: '',
            itemDescriptionAndDateErrorMessage: '',
            saving: false,
            currentItemType: '',
            currentLocation: '',
            currentDescription: '',
            currentDateAndTime: '',
            currentIncidentId: '',
            currentIncidentNumber: '',
            currentItemId: ''
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
        const passedItemId = this.props.navigation.getParam('itemId');

        const incident = this.props.incidents.incidents.filter(incident => incident._id === passedIncidentId)[0];
        
        const item = incident.items.filter(item => item._id === passedItemId)[0];

        console.log('incident is: ');
        console.log(incident);
        console.log('item is: ');
        console.log(item);
        
        this.setState({
            itemType: item.type,
            itemLocation: item.locationFound,
            itemDateAndTime: item.date,
            itemDescription: item.description,
            currentItemType: item.type,
            currentLocation: item.locationFound,
            currentDescription: item.description,
            currentDateAndTime: item.date,
            currentIncidentId: passedIncidentId,
            currentItemId: passedItemId,
            saving: false,
            currentIncidentNumber: this.props.navigation.getParam('incidentNumber')
            
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
        this.setState({itemDateAndTime: date.toString() });
        this.hideDatePicker();
    };

    handleSaveItem = () => {
        console.log("save button clicked");
        
        console.log('current values');

        console.log(this.state.currentItemType, this.state.currentLocation, this.state.currentDescription, this.state.currentDateAndTime, this.state.currentIncidentId, this.state.currentItemId);

        let inputItemType = this.state.itemType;
        let inputItemLocation = this.state.itemLocation;
        let inputItemDescription = this.state.itemDescription;
        let inputItemDate = this.state.itemDateAndTime;


        console.log('New values');    
        console.log(inputItemType, inputItemLocation, inputItemDescription, inputItemDate);


        //reset state of error message
        this.setState({itemTypeErrorMessage: '', itemLocationErrorMessage: '', itemDescriptionAndDateErrorMessage: '' });

        //error messages
        console.log('Checking location');
        //check location is entered    
        if (inputItemLocation !== '' ){
            console.log('location is valid');
        }else{
            return this.setState({itemLocationErrorMessage: 'Please enter item location.'});
        }

        //check nature is entered    
        if (inputItemType !== '' ){
            console.log('Type is valid');
        }else{
            return this.setState({itemTypeErrorMessage: 'Please enter item type.'});
        }

        //check description is entered    
        if (inputItemDescription !== '' ){
            console.log('valid item description is entered');
        }else{
            return this.setState({itemDescriptionAndDateErrorMessage: 'Please enter a valid item description.'});
        }

        //check date and time is selected    
        if (inputItemDate !== null ){
            console.log('date and time is selected');
        }else{
            return this.setState({itemDescriptionAndDateErrorMessage: 'Please select the date and time of collection.'});
        }

        //check values are different from current values
        if (inputItemType !== this.state.currentItemType || inputItemLocation !== this.state.currentLocation || inputItemDescription !== this.state.currentDescription || inputItemDate !== this.state.currentDateAndTime){
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

                        this.props.updateItem(this.state.currentIncidentId, this.state.currentItemId, inputItemType, inputItemLocation, inputItemDescription, inputItemDate, this.props.loginReducer.token);

                        this.setState({saving: true});
                        
                        //wait for props to get updated
                        setTimeout(() => {                            
                            navigate('DisplayCase', {incidentId: this.state.currentIncidentId, incidentNumber: this.state.currentIncidentNumber}) 
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
                <View style={{marginTop: 30, alignItems: 'center'}}>

                    <Input 
                        style={{textAlign: 'center'}}
                        placeholder='Enter Item Type'
                        onChangeText={input => this.setState({itemType: input})}
                        value={this.state.itemType}
                        errorMessage={this.state.itemTypeErrorMessage}

                    />

                    <Input 
                        style={{textAlign: 'center'}}
                        placeholder='Enter Location Found'
                        onChangeText={input => this.setState({itemLocation: input})}
                        value={this.state.itemLocation}
                        errorMessage={this.state.itemLocationErrorMessage}
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

                    <Text style={styles.errorMessage}>{this.state.itemDescriptionAndDateErrorMessage}</Text>

                    <Text style={{textAlign: 'center', fontSize: 18}}>{this.state.itemDateAndTime}</Text>

                    <View style={{width: '90%', margin: 20}}>
                        <Button title="Select Date and Time of Collection" onPress={this.showDatePicker} type="outline" />
                    </View>

                    <View style={{width: '90%', marginVertical: 20}}>
                        <Button title="Save Changes" onPress={this.handleSaveItem} />
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
    },
    errorMessage: {
        fontSize: 12,
        color: 'red',
        marginVertical: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
