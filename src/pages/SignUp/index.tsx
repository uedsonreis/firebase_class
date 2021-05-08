import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

import { authService } from '../../services';

import styles from './styles';

export default function SignUp() {

    const navigation = useNavigation();

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');

    function handleEmail(text: string) {
        setEmail(text.trim().toLowerCase());
    }

    async function handleSave() {
        if (!email || !email.includes('@')) {
            alert("Email format is invalid!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Password don't match!");
            return;
        }

        try {
            await authService.createUser(email, password);
            navigation.goBack();
        } catch (error) {
            alert(error.message);
        }
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

            <Text style={styles.label}>Confirm Password:</Text>
            <TextInput
                style={styles.input} onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry
            />

            <Button title="Enter" onPress={handleSave} />
        </View>
    );
}