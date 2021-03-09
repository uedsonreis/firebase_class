import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import SignInPage from './src/pages/SignIn';
import SignUpPage from './src/pages/SignUp';
import CustomersPage from './src/pages/Customers';

const Drawer = createDrawerNavigator();

function LoginStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator headerMode="screen">
            <Stack.Screen name="Sign In" component={SignInPage} />
            <Stack.Screen name="Sign Up" component={SignUpPage} />
        </Stack.Navigator>
    );
}

function MainStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator headerMode="screen">
            <Stack.Screen name="Customers" component={CustomersPage} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="main">
                <Drawer.Screen name="main" component={MainStack} />
                <Drawer.Screen name="login" component={LoginStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}