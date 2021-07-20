import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import { postItem } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        incidents: state.incidents,
        items: state.items,
        loginReducer: state.loginReducer
    };
};

const mapDispatchToProps = {
    //postItem: (incidentNumber, type, locationFound, description, date, itemNumber) => (postItem(incidentNumber, type, locationFound, description, date, itemNumber))
    postItem

};


function Saving(){
    return (
        <View style={styles.savingView}>
            <ActivityIndicator size='large' color='black' />
            <Text style={styles.savingText}>Saving . . .</Text>
        </View>
    );
}


class AddItem extends Component {
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
            incidentId: this.props.navigation.getParam('incidentId'),
            incidentNumber: this.props.navigation.getParam('incidentNumber')
        };
    }

    componentDidMount(){
        console.log('xxxxx add item component xxxxxxxxxxx');
    }

    static navigationOptions = {
        title: 'Add Item',
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
        //console.warn("A date has been picked: ", date);
        this.setState({itemDateAndTime: date.toString() });
        this.hideDatePicker();
    };

    handleAddItem = () => {
        console.log("save button clicked");
        
        let itemType = this.state.itemType;
        let itemLocation = this.state.itemLocation;
        let itemDate = this.state.itemDateAndTime;
        let itemDescription = this.state.itemDescription;

        /*let incidentItems = this.props.items.items.filter(item => item.incidentNumber === this.state.incidentNumber);
        let itemNumber = incidentItems.length + 1;*/

        //console.log('item Number: ' + itemNumber);


        console.log('current values');

        console.log(itemType, itemLocation, itemDate, itemDescription);
        

        //reset state of error message
        this.setState({itemTypeErrorMessage: '', itemLocationErrorMessage: '', itemDescriptionAndDateErrorMessage: ''});

        //error messages

        //check type is entered    
        if (itemType !== '' ){
            console.log('type is valid');
        }else{
            return this.setState({itemTypeErrorMessage: 'Please enter item type'});
        }

        //check location is entered    
        if (itemLocation !== '' ){
            console.log('location is valid');
        }else{
            return this.setState({itemLocationErrorMessage: 'Please enter location found'});
        }

        //check description is entered    
        if (itemDescription !== '' ){
            console.log('description is valid');
        }else{
            return this.setState({itemDescriptionAndDateErrorMessage: 'Please enter item description'});
        }

        //check date and time is selected    
        if (itemDate !== null ){
            console.log('date and time is selected');
        }else{
            return this.setState({itemDescriptionAndDateErrorMessage: 'Please select the date and time of collection'});
        }

        //incidentId, itemType, itemLocation, itemDescription, itemDate

        const { navigate } = this.props.navigation;

        this.props.postItem(this.state.incidentId, this.state.incidentNumber, itemType, itemLocation, itemDescription, itemDate, this.props.loginReducer.token);

        this.setState({saving: true});
        
        //wait for props to get updated
        setTimeout(() => {                            
            navigate('DisplayCase', {incidentId: this.state.incidentId, incidentNumber: this.state.incidentNumber}) 
        },2000);
        
    }

    handleSaveAndAddItem = () => {
        console.log('Will allow you to save item, and continue entering more items.');

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
                        autoCorrect={false}
                    >

                    </TextInput>
            
                    <Text style={styles.errorMessage}>{this.state.itemDescriptionAndDateErrorMessage}</Text>

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
        height: 100
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

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
