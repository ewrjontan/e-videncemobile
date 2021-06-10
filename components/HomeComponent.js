import React, { Component } from 'react';
//import { View, Text, ScrollView, ImageBackground, StyleSheet, Button, SafeAreaView } from 'react-native';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { Card, Button, Input } from 'react-native-elements';



class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModalLogin: false,
            showModalRegister: false,
            usernameLogin:'',
            passwordLogin:'',
            firstNameRegister:'',
            lastNameRegister:'',
            usernameRegister:'',
            passwordRegister:'',
            emailRegister:''
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

    render(){
        return (
            <View style={styles.mainContainer}>
                <ImageBackground source={require('./images/homecrimescene.jpg')} style={styles.image}>
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Your solution for timely and accurate evidence field submissions.</Text>
                    </View>

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
                        <SafeAreaView style={styles.modal}>
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
                                        console.log(this.state.usernameLogin, this.state.passwordLogin);
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
                        <SafeAreaView style={styles.modal}>
                            <Input
                                placeholder='First Name'
                                onChangeText={firstNameRegister => this.setState({firstNameRegister})}
                                value={this.state.firstNameRegister}
                            />
                            <Input
                                placeholder='Last Name'
                                onChangeText={lastNameRegister => this.setState({lastNameRegister})}
                                value={this.state.lastNameRegister}
                            />
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
                                placeholder='Email'
                                onChangeText={emailRegister => this.setState({emailRegister})}
                                value={this.state.emailRegister}
                            />
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => {
                                        this.toggleModalRegister();
                                        console.log(this.state.firstNameRegister, this.state.lastNameRegister, this.state.usernameRegister, this.state.passwordRegister, this.state.emailRegister);
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
            </View>

            
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
    modal: { 
        justifyContent: 'center',
        marginTop: 200
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

export default Home;