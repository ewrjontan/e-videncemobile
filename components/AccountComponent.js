import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchUser } from '../redux/ActionCreators';

import Loading from './LoadingComponent';



const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        user: state.user
    };
};

const mapDispatchToProps = {
    fetchUser: (userId) => (fetchUser(userId))

};


class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        title: 'Account Settings',
        headerStyle: {
            backgroundColor: '#FFD600',
        },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
    }

    componentDidMount(){
        console.log('xxxxx account component xxxxxxxxxxx');
        console.log('my user id');
        console.log(this.props.loginReducer.userId);
        this.props.fetchUser({'userId': this.props.loginReducer.userId, 'userToken': this.props.loginReducer.token});
    }
    
    render(){

        const DisplayUserInfo = () => {
            if (this.props.user.userInfo.length !== 0){
                console.log('User info is filled');
            }else{
                console.log('User info is not filled');
            }

            if (this.props.user.isLoading) {
                return <Loading />;
            }
    
            if (this.props.user.errMess) {
                return (
                    <View style={styles.errMess}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.props.user.errMess}</Text>
                    </View>
                );
            }

            console.log('Account component props:');
            
            let userInfo = this.props.user.userInfo;
            console.log(userInfo);

            
            return (
                <View style={styles.accountInfo}>
                    <Text style={{fontSize: 20}}>Username: {userInfo.username}</Text>
                    <Text style={{fontSize: 20}}>Firstname: {userInfo.firstname}</Text>
                    <Text style={{fontSize: 20}}>Lastname: {userInfo.lastname}</Text>
                    <Text style={{fontSize: 20}}>Agency: {userInfo.agency}</Text>
                    <Text style={{fontSize: 20}}>Email: {userInfo.email}</Text>
                </View>
            )
        };

        return (
            <ScrollView>

                <DisplayUserInfo />
                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    accountInfo: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
    },
});

//export default Account;
export default connect(mapStateToProps, mapDispatchToProps)(Account);
