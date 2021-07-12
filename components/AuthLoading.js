import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { setLoginState } from '../redux/ActionCreators';
import { AsyncStorage } from '@react-native-community/async-storage';


const mapDispatchToProps = {
    setLoginState    
};

const mapStateToProps = state => {
    return {
        initialState: state.initialState,
        loginReducer: state.loginReducer
    };
}

class AuthLoadingScreen extends React.Component {

    componentDidMount() {
        /*this.props.setLoginState;
        console.log('initialState:');
        console.log(initialState);*/
        
        //this._bootstrapAsync();
    }
    
    _bootstrapAsync = async () => {
        //const userToken = await AsyncStorage.GetItem('userToken');
    
        console.log('usertoken is true!');
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        //this.props.navigation.navigate(userToken ? 'App' : 'Auth');


    };

    

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Text>Auth landing page</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps)(AuthLoadingScreen);