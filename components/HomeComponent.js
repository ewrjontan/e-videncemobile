import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native';
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
            <View>
                <ImageBackground source={require('./images/homecrimescene.jpg')} style={styles.image}>
                    <Text style={styles.text}>Inside</Text>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    }
  });

export default Home;