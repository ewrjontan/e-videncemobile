import React, { Component } from 'react';

import INCIDENTDATABASE from '../shared/incidentDatabase';

import { SafeAreaView, View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import EditCase from './EditCaseComponent';
import AddItem from './AddItemComponent';
import Loading from './LoadingComponent';


import { fetchItems } from '../redux/ActionCreators';

const mapDispatchToProps = {
    fetchItems,    
};

import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        incidents: state.incidents,
        items: state.items
    };
};

class DisplayCase extends Component{
    constructor(props){
        super(props);
        this.state = {
            incidentNumber: ''
        };
    }

    componentDidMount(){

        this.props.fetchItems();

        console.log('displayCase Component running');
        console.log('xxxxxxxxxxxxxx params: ');
        console.log(this.props.navigation.state.params);

        //for static navigation options, won't work unless passed as property due to loading slowly?
        const incidentNumber = this.props.navigation.getParam('incidentNumber');
        this.setState({incidentNumber: incidentNumber });
        this.props.navigation.setParams(incidentNumber);
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
        const { navigate } = this.props.navigation;

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

        

        //used for items in incidents json object
        /*const IncidentHasItems = () => {
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
        }*/

        //user for items in items json object
        const IncidentHasItems = () => {
            console.log("display case test");
            console.log(this.props.items);
            let incidentItems = this.props.items.items.filter(item => item.incidentNumber === this.state.incidentNumber);

            console.log("items in DB with matching incident number");
            console.log(incidentItems);

            if (this.props.items.isLoading) {
                return <Loading />;
            }
    
            if (this.props.items.errMess) {
                return (
                    <View style={styles.errMess}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.props.items.errMess}</Text>
                    </View>
                );
            }
    
            if (incidentItems.length !== 0){
                return(
                    <FlatList
                        data={incidentItems}
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
                        <ListItem.Subtitle>Collected: {item.date}</ListItem.Subtitle>

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
                            onPress={() => navigate('EditCase', {
                                incidentId: incident.id
                            })}
                        />
                        <Button
                            title="Add Item"
                            type="outline"
                            onPress={() => navigate('AddItem', {
                                incidentId: incident.id, incidentNumber: this.props.navigation.getParam('incidentNumber')
                            })}
                        />
                    </View>
                </View>
                    
                <IncidentHasItems/>
                    
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
    },
    errMess: {
        justifyContent: 'center',
        marginTop: 200,
        alignItems: 'center'
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(DisplayCase);


