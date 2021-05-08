import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, FlatList, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { Customer } from '../types';
import styles from './styles';


export default function EditCustomer() {

    const navigation = useNavigation();
    const route = useRoute();

    const { customer } = route.params as { customer: Customer };

    const [logged, setLogged] = React.useState(auth().currentUser);
    const [name, setName] = React.useState<string>(customer ? customer.name : '');
    const [email, setEmail] = React.useState<string>(customer ? customer.email : '');

    function handleEmail(text: string) {
        setEmail(text.trim().toLowerCase());
    }

    async function handleSave() {
        if (!logged) {
            alert('You must to Sign In!');
            navigation.navigate('login');
        }

        if (!email || !email.includes('@')) {
            alert("Email format is invalid!");
            return;
        }

        if (!name || name.trim() === '') {
            alert("Name is required!");
            return;
        }

        if (customer) {
            firestore().collection('customers').doc(customer.id).set({ ...customer, name, email });
        } else {
            await firestore().collection('customers').add({ name, email, userId: logged?.uid });
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>

            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input} onChangeText={setName} value={name}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input} onChangeText={handleEmail} value={email}
                keyboardType="email-address" placeholder="hector@anymail.com"
            />

            <Button title="Save" onPress={handleSave} />
        </View>
    );
}