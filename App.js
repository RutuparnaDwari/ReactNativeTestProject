import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import SplashScreen from './Screen/SplashScreen';
import DetailsScreen from './Screen/DetailsScreen';
import HomeScreen from './Screen/HomeScreen';
import SearchScreen from './Screen/SearchScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconSource;
                    if (route.name === 'Home') {
                        iconSource = focused
                            ? require('../TaskReactNativeProject/Assets/HomeIconActive.png')
                            : require('../TaskReactNativeProject/Assets/HomeIconImage.png');
                    } else if (route.name === 'Search') {
                        iconSource = focused
                            ? require('../TaskReactNativeProject/Assets/ActiveSearchIcon.png')
                            : require('../TaskReactNativeProject/Assets/SearchIconImage.png');
                    }
                    return <Image source={iconSource} style={{ width: 25, height: 25, tintColor: '#fff' }} />;
                },
                tabBarStyle: { backgroundColor: '#000' },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#808080',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


