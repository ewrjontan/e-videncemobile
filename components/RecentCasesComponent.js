import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { connect } from 'react-redux';
import Loading from './LoadingComponent';

/** 
 * for json server testing
import { INCIDENTDATABASE } from '../shared/incidentDatabase';
import { baseUrl } from '../shared/baseUrl';
import { fetchIncidents } from '../redux/ActionCreators';
*/



const mapStateToProps = state => {
    return {
        incidents: state.incidents
    };
}



class RecentCases extends Component {

    static navigationOptions = {
        title: 'Recent Cases',
        headerStyle: {
            backgroundColor: '#FFD600',
        },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
    };

    
    render(){

        const { navigate } = this.props.navigation;

        const renderIncidents = ({item}) => {
            return(
                <View style={styles.button}>
                    <Button title={item.incidentNumber}

                    //for mongodb server
                    onPress={() => navigate('DisplayCase', {incidentId: item._id, incidentNumber: item.incidentNumber})}

                    //for json server
                    //onPress={() => navigate('DisplayCase', {incidentId: item.id, incidentNumber: item.incidentNumber})}
                    />
                </View>
            );
        };
        
        if (this.props.incidents.isLoading) {
            return <Loading />;
        }

        if (this.props.incidents.errMess) {
            return (
                <View style={styles.errMess}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.props.incidents.errMess}</Text>
                </View>
            );
        }


        return (
            <View style={{marginTop: 30}}>

                <FlatList
                    data={this.props.incidents.incidents.reverse().slice(0,10)}
                    renderItem={renderIncidents}
                    //keyExtractor={item => item.id.toString()} //for json server
                    keyExtractor={item => item._id.toString()} //for mongodb server
                    extraData={this.state}

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
    },
    button: {
        marginBottom: 10,
        width: '90%',
        marginHorizontal: 20
    },
    errMess: {
        justifyContent: 'center',
        marginTop: 200,
        alignItems: 'center'
    }
})

export default connect(mapStateToProps)(RecentCases);
