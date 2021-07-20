import React, { Component } from 'react';
import { SafeAreaView, View, Text, FlatList, ScrollView, StyleSheet, Alert } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from './LoadingComponent';
import { fetchItems } from '../redux/ActionCreators';
import { connect } from 'react-redux';


//for json server testing
//import INCIDENTDATABASE from '../shared/incidentDatabase';


const mapDispatchToProps = {
    //fetchItems,    
};


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
            incident: '',
            incidentNumber: ''
        };
    }

    componentDidMount(){

        console.log('displayCase Component running');
        //console.log('xxxxxxxxxxxxxx params: ');
        //console.log(this.props.navigation.state.params);

        //for static navigation options, won't work unless passed as property due to loading slowly?
        const incidentNumber = this.props.navigation.getParam('incidentNumber');
        this.setState({incidentNumber: incidentNumber });
        //this.props.navigation.setParams(incidentNumber);
        console.log('incidentnumber' + this.state.incidentNumber);

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
        
        const incidentNumber = this.props.navigation.getParam('incidentNumber');

        
        //for mongodb server
        //const incident = this.props.incidents.incidents.filter(incident => incident._id === incidentId)[0];
        
        const incident = this.props.incidents.incidents.filter(incident => incident.incidentNumber === incidentNumber)[0];

        //for json server
        //const incident = this.props.incidents.incidents.filter(incident => incident.id === incidentId)[0];

        //used for items in incidents json object
        const IncidentHasItems = () => {
            console.log('xxx Itemsxxxx');
            console.log(incident);
            console.log('incident id is: ' + incident._id);

            if (incident.items.length !== 0){
                return(
                    <FlatList
                        data={incident.items}
                        renderItem={renderItem}
                        //keyExtractor={item => item.id.toString()}//for json server
                        keyExtractor={item => item._id.toString()}//for mongodb server
                        extraData={this.state}
                    />
                )
            }else{
                return(
                    <Text style={styles.noItems}>No items are currently submitted under this incident.</Text>
                )
            }
        }

        const renderItem = ({item}) => {
            console.log('item: ' + item._id);
            return(

                <SwipeRow rightOpenValue={-100}>
                    <View style={styles.editView}>
                        <TouchableOpacity
                            style={styles.editTouchable}
                            onPress={() => navigate('EditItem', {
                                incidentId: incident._id, incidentNumber: this.props.navigation.getParam('incidentNumber'), itemId: item._id
                            })}
                        >
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                
                    <ListItem bottomDivider style={{marginBottom: 0}}>
                        <ListItem.Content>
                            <ListItem.Title>Item: {incident.items.indexOf(item) + 1} </ListItem.Title>
                            <ListItem.Title>Description: {item.description}</ListItem.Title>
                            <ListItem.Subtitle>Type: {item.type}</ListItem.Subtitle>
                            <ListItem.Subtitle>Location Found: {item.locationFound}</ListItem.Subtitle>
                            <ListItem.Subtitle>Collected: {item.date}</ListItem.Subtitle>

                        </ListItem.Content>
                    
                    </ListItem>
                </SwipeRow>
                    
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
                                incidentId: incident._id
                            })}
                        />
                        <Button
                            title="Add Item"
                            type="outline"
                            onPress={() => navigate('AddItem', {
                                incidentId: incident._id, incidentNumber: this.props.navigation.getParam('incidentNumber')
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
    },
    editView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    editTouchable: {
        backgroundColor: '#007bff',
        height: '100%',
        justifyContent: 'center'
    },
    editText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(DisplayCase);


