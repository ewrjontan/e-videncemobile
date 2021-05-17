import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';

class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        title: 'Account Settings',
        headerStyle: {
            backgroundColor: '#FFD600',
        },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
    }

    
    render(){
    
        return (
            <ScrollView>
                <Card
                    title="Contact Information"
                    wrapperStyle={{margin: 20}}
                >
                    <Text>1 Nucamp Way</Text>
                    <Text>Seattle, WA 98001</Text>
                    <Text style={{marginBottom: 10}}>U.S.A.</Text>

                    <Text>Phone: 1-206-555-1234</Text>
                    <Text>Email: campsites@nucamp.co</Text>

                    

                </Card>

            </ScrollView>
        );
    }
}


export default Account;
