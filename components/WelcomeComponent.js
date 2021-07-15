import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { Card, Button, Input } from 'react-native-elements';

import { logout } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { loginReducer } from '../redux/loginReducer';

//import AsyncStorage from '@react-native-community/async-storage';


const mapDispatchToProps = {
    logout: () => (logout()),
};

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        incidents: state.incidents
    };
};


class Welcome extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModalLogin: false,
            showModalRegister: false,
        };
    }

    static navigationOptions = {
        title: 'E-Vidence',
        headerStyle: {
            backgroundColor: '#FFD600',
        },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
    }


    componentDidMount() {
        //this._bootstrapAsync();    
    }


    render(){

        return (
            <SafeAreaView style={styles.mainContainer}>
                <ImageBackground source={require('./images/homecrimescene.jpg')} style={styles.image}>
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Welcome to E-Vidence</Text>
                    </View>

                    <View style={styles.containerTwo}>
                        <Text style={styles.buttonTitleText}>
                            Use the side menu to add, view and modify your cases!.      
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => {
                                        //this.logOut();
                                        console.log('Logging out');

                                        this.props.logout();

                                        //navigates to main app stack
                                        setTimeout (() => {
                                            //this.props.navigation.navigate('App');
                                            
                                            //console.log('xxx my token');
                                            //console.log(this.props.loginReducer.token);
                                            this.props.navigation.navigate(this.props.loginReducer.isLoggedIn ? 'App' : 'Auth');

                                        }, 2000);
                                    }}
                                    title='Log Out'
                                />
                            </View>     

                </ImageBackground>
            </SafeAreaView>

            
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection: "column",
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },
    textContainer: {
        flex: 2,
        justifyContent: "center",
    },
    mainText: {
      color: "white",
      fontSize: 36,
      textAlign: "center",
      paddingHorizontal: 10,
    },
    containerTwo: {
        flex: 1
    },
    buttonTitleText: {
        textAlign: 'center',
        color: "white",
        fontSize: 20,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    buttonContainer: {
        width: "90%",
        marginHorizontal: 20,
        marginBottom: 10
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);