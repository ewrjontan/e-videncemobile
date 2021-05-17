import React, { Component, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";


/*const Example = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      console.warn("A date has been picked: ", date);
      
      console.log(date.toString());
      hideDatePicker();
    };
  
    return (
      <View>

        <Button title="Select Date and Time of Incident" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    );
};*/

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

    handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        this.setState({incidentDateAndTime: date.toString() });
        this.hideDatePicker();
    };
    
    render(){
    
        return (
            <View>

                <Input
                    placeholder='Enter Case Number'
                />

                <Input
                    placeholder='Enter Location of Incident'
                />  

                <Input
                    placeholder='Enter Nature of Incident'
                />      
                

                <Text style={{textAlign: 'center', fontSize: 18}}>{this.state.incidentDateAndTime}</Text>

                <View style={{width: '90%', margin: 20}}>
                    <Button title="Select Date and Time of Incident" onPress={this.showDatePicker} />
                </View>
                

                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="datetime"
                    onConfirm={this.handleConfirm}
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
