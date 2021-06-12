import React, { Component } from 'react';

import Home from './HomeComponent';
import Account from './AccountComponent';
import CreateCase from './CreateCaseComponent';
import RecentCases from './RecentCasesComponent';

import ViewCase from './ViewCaseComponent';
import DisplayCase from './DisplayCaseComponent';
import TabNavigation from './TabNavigationComponent';
import EditCase from './EditCaseComponent';
import AddItem from './AddItemComponent';



import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';

//react-redux
import { connect } from 'react-redux';
import { fetchIncidents, fetchItems } from '../redux/ActionCreators';

const mapDispatchToProps = {
    //fetchItems,
    fetchIncidents,
    
};


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
        CreateCase: {
            screen: CreateCase,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        DisplayCase: { screen: DisplayCase }
    },
    {
        initialRouteName: 'CreateCase',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#FFD600'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const RecentCasesNavigator = createStackNavigator(
    {
        RecentCases: {
            screen: RecentCases,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        DisplayCase: { screen: DisplayCase },
        EditCase: { screen: EditCase },
        AddItem: { screen: AddItem },
    },
    {
        initialRouteName: 'RecentCases',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#FFD600'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);


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

const ViewCaseNavigator = createStackNavigator( 
    {
        ViewCase: {
            screen: ViewCase,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        DisplayCase: { screen: DisplayCase },
        EditCase: { screen: EditCase },
        AddItem: { screen: AddItem }
    },
    {
        initialRouteName: 'ViewCase',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#FFD600'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
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
        ViewCase: {
            screen: ViewCaseNavigator,
            navigationOptions: {
                drawerLabel: 'View/Edit Case',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='cog'
                        type='font-awesome'
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

    componentDidMount() {
        this.props.fetchIncidents();
        //this.props.fetchItems();

    }

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

export default connect(null, mapDispatchToProps)(Main);

