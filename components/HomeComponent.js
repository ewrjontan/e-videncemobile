import React, { Component } from 'react';
//import { View, Text, ScrollView, ImageBackground, StyleSheet, Button } from 'react-native';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Modal } from 'react-native';
import { Card, Button, Input } from 'react-native-elements';



class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false
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

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({
            showModal: false
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
                                onPress={() => this.toggleModal()}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Create Account"
                                onPress={() => console.log('create account button pressed')}
                            />
                        </View>
                    </View>

                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.showModal}
                        onRequestClose={() => this.toggleModal()}
                >
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>Login</Text>
                            <Input
                                placeholder='Username'
                            />
                            <Input
                                placeholder='Password'
                            />
                            <Button
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color='#5637DD'
                                title='Close'
                            />
                        </View>
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
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
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