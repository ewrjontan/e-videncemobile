import React, { Component } from 'react';

import Home from './HomeComponent';
import Account from './AccountComponent';
import CreateCase from './CreateCaseComponent';
import RecentCases from './RecentCasesComponent';



import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';



const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions:({navigation}) => ({
            headerStyle: {
                backgroundColor: '#FFD600'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='list'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }       
);

const CreateCaseNavigator = createStackNavigator(
    {
        CreateCase: { screen: CreateCase }
    },
    {
        defaultNavigationOptions:({navigation}) => ({
            headerStyle: {
                backgroundColor: '#FFD600'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='list'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }       
);

const RecentCasesNavigator = createStackNavigator(
    {
        RecentCases: { screen: RecentCases }
    },
    {
        defaultNavigationOptions:({navigation}) => ({
            headerStyle: {
                backgroundColor: '#FFD600'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='list'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }       
);

/*const DirectoryNavigator = createStackNavigator(
    {
        Directory: {
            screen: Directory,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {
        initialRouteName: 'Directory',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);*/

/*const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        defaultNavigationOptions:({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }       
);*/

const AccountNavigator = createStackNavigator(
    {
        Account: { screen: Account }
    },
    {
        defaultNavigationOptions:({navigation}) => ({
            headerStyle: {
                backgroundColor: '#FFD600'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='list'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }       
);

const CustomDrawerContentComponent = props => (
    //SafeAreaView is for iphone X to compensate for rounder corners and camera notch
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}
        >
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Icon
                        name='search'
                        type='font-awesome'
                        size={48}
                    />
                </View>

                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>E-Vidence</Text>
                    
                </View>
            </View>

            <DrawerItems {...props} />

        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { 
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        CreateCase: {
            screen: CreateCaseNavigator,
            navigationOptions: {
                drawerLabel: 'Create New Case',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='folder-plus'
                        type='font-awesome-5'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        RecentCases: {
            screen: RecentCasesNavigator,
            navigationOptions: {
                drawerLabel: 'Recent Cases',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='folder'
                        type='font-awesome-5'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Account: {
            screen: AccountNavigator,
            navigationOptions: {
                drawerLabel: 'Account Settings',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='cog'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }

    },


    {
        drawerBackgroundColor: '#FFD600',
        contentComponent: CustomDrawerContentComponent
    }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {

    render(){
        return (
            <View 
                style={{
                    flex:1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
                }}
            >
                <AppNavigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    drawerHeader: {
        backgroundColor: '#FFD600',
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#000',
        fontSize: 24
    }
});

export default Main;

