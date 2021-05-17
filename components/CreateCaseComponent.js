import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Card, Input } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const Example = () => {
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
  };

class CreateCase extends Component {
    constructor(props){
        super(props);
        this.state = {
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
                

                <Example/>


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
