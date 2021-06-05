import React, { Component } from 'react';

import { SafeAreaView, View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';

import { connect } from 'react-redux';



class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentDidMount(){

    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.incidentNumber,
            headerStyle: {
                backgroundColor: '#FFD600',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }        
        }
    };    

    render(){

        //get incident from props 
        const incidentId = this.props.navigation.getParam('incidentId');
        const incident = this.props.incidents.incidents.filter(incident => incident.id === incidentId)[0];

        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx       display case works: ');
        console.log('incident ID');
        console.log(incidentId);

        console.log('incident filtered');
        console.log(incident);

        console.log('params: ');
        console.log(this.props.navigation.state.params);

        //console.log('incident id: ' + incidentId);
        //console.log(this.props.navigation.state.params);
        //console.log("this is the active incident object");
        //console.log(incident);
        

        const IncidentHasItems = () => {
            if (incident.items.length !== 0){
                return(
                    <FlatList
                        data={incident.items}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                )
            }else{
                return(
                    <Text style={styles.noItems}>No items are currently submitted under this incident.</Text>
                )
            }
        }

        const renderItem = ({item}) => {
            console.log(item.id);
            return(
                
                <ListItem bottomDivider style={{marginBottom: 10}}>
                    <ListItem.Content>
                        <ListItem.Title>Item: {item.id} </ListItem.Title>
                        <ListItem.Title>Description: {item.description}</ListItem.Title>
                        <ListItem.Subtitle>Type: {item.type}</ListItem.Subtitle>
                        <ListItem.Subtitle>Location Found: {item.locationFound}</ListItem.Subtitle>

                    </ListItem.Content>
                
                </ListItem>
                    
            );
        };

        return(
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.caseInfo}>
                    <Text>Nature of Incident: {incident.nature}</Text>
                    <Text>Date of Incident: {incident.date}</Text>
                    <Text>Location of Incident: {incident.incidentLocation}</Text>

                    <View style={styles.buttonsContainer}>
                        <Button
                            title="Edit Case"
                            type="outline"
                        />
                        <Button
                            title="Add Item"
                            type="outline"
                        />
                    </View>
                </View>
                    
                <ScrollView>
                    <IncidentHasItems/>
                    
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    caseInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20
    },
    noItems: {
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 30
    }
});


export default connect(mapStateToProps)(DisplayCase);


