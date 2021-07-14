import React, { Component } from 'react';
//import { View, Text, ScrollView, ImageBackground, StyleSheet, Button, SafeAreaView } from 'react-native';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { Card, Button, Input } from 'react-native-elements';

import { login, register } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { loginReducer } from '../redux/loginReducer';

//import AsyncStorage from '@react-native-community/async-storage';


/*const mapDispatchToProps = {
    login: (input) => (login(input)),
    register: (input) => {register(input)}
    //login
};

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        incidents: state.incidents
    };
};*/


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
                            text placeholder 
                        </Text>
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
    },
    modalLogin: { 
        justifyContent: 'center',
        marginTop: 200
    },
    modalRegister: { 
        justifyContent: 'center',
        marginTop: 100
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#FFD600',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
  });

export default Welcome;
//export default connect(null, mapDispatchToProps)(Home);
//export default connect(mapStateToProps, mapDispatchToProps)(Home);