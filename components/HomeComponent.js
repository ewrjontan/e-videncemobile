import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-elements';



class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            
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
                                accessibilityLabel="Button used to Login"
                                onPress={() => console.log('login button pressed')}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Create Account"
                                accessibilityLabel="Button used to create an account"
                                onPress={() => console.log('create account button pressed')}
                            />
                        </View>
                    </View>



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
        fontSize: 18,
        marginBottom: 20
    },
    buttonContainer: {
        width: "90%",
        marginHorizontal: 20,
        marginBottom: 10
    }
  });

export default Home;