import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { authService } from '../../services';

import styles from './styles';

export default function SignIn() {

    const navigation = useNavigation();

    authService.signOut();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title="Sign Up" onPress={goSignUp} />
        });
    }, [navigation, goSignUp]);

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    function handleEmail(text: string) {
        setEmail(text.trim().toLowerCase());
    }

    function handleLogin() {
        authService.signIn(email, password).then(hasLogged => {
            if (hasLogged) {
                navigation.navigate('main');
            } else {
                alert('Email/Password is invalid!');
            }
        });
    }

    function goSignUp() {
        navigation.navigate('Sign Up');
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input} onChangeText={handleEmail} value={email}
                keyboardType="email-address" placeholder="hector@anymail.com"
            />
            
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input} onChangeText={setPassword} value={password} secureTextEntry
            />

            <Button title="Enter" onPress={handleLogin} />
        </View>
    );
}