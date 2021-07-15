import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Modal, SafeAreaView, ActivityIndicator } from 'react-native';
import { Card, Button, Input } from 'react-native-elements';

import { login, register } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { loginReducer } from '../redux/loginReducer';

//import Loading from './LoadingComponent';
//import AsyncStorage from '@react-native-community/async-storage';


const mapDispatchToProps = {
    login: (input) => (login(input)),
    register: (input) => {register(input)}
};

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        incidents: state.incidents
    };
};


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModalLogin: false,
            showModalRegister: false,
            usernameLogin:'',
            passwordLogin:'',
            firstnameRegister:'',
            lastnameRegister:'',
            usernameRegister:'',
            passwordRegister:'',
            agencyRegister:'',
            emailRegister:'',
            loggingIn: false,
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

    toggleModalLogin() {
        this.setState({showModalLogin: !this.state.showModalLogin});
    }

    toggleModalRegister() {
        this.setState({showModalRegister: !this.state.showModalRegister});
    }

    resetForm() {
        this.setState({
            showModalLogin: false,
            showModalRegister: false,
            usernameLogin:'',
            passwordLogin:'',
            firstNameRegister:'',
            lastNameRegister:'',
            usernameRegister:'',
            passwordRegister:'',
            emailRegister:''
        });
    }

    componentDidMount() {
        //this._bootstrapAsync();    
    }

    render(){
        LoggingIn = () => {
            if (this.state.loggingIn){
                return (
                    <View style={styles.loadingView}>
                        <ActivityIndicator size='large' color='white' />
                        <Text style={styles.loadingText}>Logging In . . .</Text>
                    </View>
                );
            }else{
                return(
                    <View/>
                )
            }
        }

        return (
            <SafeAreaView style={styles.mainContainer}>
                <ImageBackground source={require('./images/homecrimescene.jpg')} style={styles.image}>
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Your solution for timely and accurate evidence field submissions.</Text>
                    </View>

                    <LoggingIn />

                    <View style={styles.containerTwo}>
                        <Text style={styles.buttonTitleText}>
                            Login or create an account to start using E-Vidence.
                        </Text>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Login"
                                onPress={() => this.toggleModalLogin()}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Create Account"
                                onPress={() => this.toggleModalRegister()}
                            />
                        </View>
                    </View>

                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.showModalLogin}
                        onRequestClose={() => this.toggleModalLogin()}
                    >
                        <SafeAreaView style={styles.modalLogin}>
                            <Input
                                placeholder='Username'
                                onChangeText={usernameLogin => this.setState({usernameLogin})}
                                value={this.state.usernameLogin}
                            />
                            <Input
                                placeholder='Password'
                                onChangeText={passwordLogin => this.setState({passwordLogin})}
                                value={this.state.passwordLogin}
                            />
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => {
                                        this.toggleModalLogin();
                                        console.log(`input ${this.state.usernameLogin} and ${this.state.passwordLogin} in login fields`);
                                        
                                        //this works, uncomment
                                        this.props.login({'username': this.state.usernameLogin, 'password': this.state.passwordLogin});
                                        this.setState({loggingIn: true});

                                        //navigates to main app stack
                                        setTimeout (() => {
                                            //this.props.navigation.navigate('App');
                                            
                                            //this works, uncomment
                                            //console.log('xxx my token');
                                            //console.log(this.props.loginReducer.token);
                                            this.setState({loggingIn: false});
                                            this.props.navigation.navigate(this.props.loginReducer.isLoggedIn ? 'App' : 'Auth');

                                        }, 2000);
                                    }}
                                    title='Login'
                                />
                            </View>
                            
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => {
                                        this.toggleModalLogin();
                                        this.resetForm();
                                    }}
                                    title='Cancel'
                                />
                            </View>                            
                            
                        </SafeAreaView>
                    </Modal>

                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.showModalRegister}
                        onRequestClose={() => this.toggleModalRegister()}
                    >
                        <SafeAreaView style={styles.modalRegister}>
                            <Input
                                placeholder='Username'
                                onChangeText={usernameRegister => this.setState({usernameRegister})}
                                value={this.state.usernameRegister}
                            />

                            <Input
                                placeholder='Password'
                                onChangeText={passwordRegister => this.setState({passwordRegister})}
                                value={this.state.passwordRegister}
                            />

                            <Input
                                placeholder='First Name'
                                onChangeText={firstnameRegister => this.setState({firstnameRegister})}
                                value={this.state.firstnameRegister}
                            />

                            <Input
                                placeholder='Last Name'
                                onChangeText={lastnameRegister => this.setState({lastnameRegister})}
                                value={this.state.lastnameRegister}
                            />

                            <Input
                                placeholder='Agency'
                                onChangeText={agencyRegister => this.setState({agencyRegister})}
                                value={this.state.agencyRegister}
                            />
                            
                            <Input
                                placeholder='Email'
                                onChangeText={emailRegister => this.setState({emailRegister})}
                                value={this.state.emailRegister}
                            />
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => {
                                        this.toggleModalRegister();
                                        console.log(this.state.usernameRegister, this.state.passwordRegister, this.state.firstnameRegister, this.state.lastnameRegister, this.state.agencyRegister, this.state.emailRegister);

                                        this.props.register({'username': this.state.usernameRegister, 'password': this.state.passwordRegister, 'firstname': this.state.firstnameRegister, 'lastname': this.state.lastnameRegister, 'agency': this.state.agencyRegister, 'email': this.state.emailRegister});

                                        //navigates to main app stack
                                        /*setTimeout (() => {
                                            //this.props.navigation.navigate('App');
                                            
                                            //this works, uncomment
                                            console.log('xxx my token');
                                            console.log(this.props.loginReducer.token);
                                            this.props.navigation.navigate(this.props.loginReducer.isLoggedIn ? 'App' : 'Auth');

                                        }, 2000);*/
                                    }}
                                    title='Create Account'
                                />
                            </View>
                            
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => {
                                        this.toggleModalRegister();
                                        this.resetForm();
                                    }}
                                    title='Cancel'
                                />
                            </View>                            
                            
                        </SafeAreaView>
                    </Modal>

                    

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
    },
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 0,
    },
    loadingText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home);