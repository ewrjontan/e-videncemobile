import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { setLoginState } from '../redux/ActionCreators';

const mapDispatchToProps = {
    setLoginState    
};

const mapStateToProps = state => {
    return {
        initialState: state.initialState
    };
}

class AuthLoadingScreen extends React.Component {

    componentDidMount() {
        this.props.setLoginState;
        console.log('initialState:');
        console.log(initialState);
    }
    
    _bootstrapAsync = async () => {
        //const userToken = await AsyncStorage.getItem('userToken');
    
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
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