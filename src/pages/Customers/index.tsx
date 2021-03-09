import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, Text, View } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { Customer } from './types';
import styles from './styles';

export default function Customers() {

    const navigation = useNavigation();

    const [logged, setLogged] = React.useState(auth().currentUser);
    const [customers, setCustomers] = React.useState<Customer[]>([]);

    React.useLayoutEffect(() => {
        if (!logged) handleSignOut();

        navigation.setOptions({
            headerRight: () => <Button title="Sign Out" onPress={handleSignOut} />
        });
    }, [navigation, handleSignOut, logged]);

    firestore().collection('customers').where('userId', '==', logged?.uid).get().then(response => {
        setCustomers(response.docs.map(doc => doc.data() as any));
    });

    function handleSignOut() {
        navigation.navigate('login');
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <FlatList
                data={customers}
                keyExtractor={item => item.email}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.text}>{item.name} - {item.email}</Text>
                    </View>
                )}
            />
        </View>
    );
}