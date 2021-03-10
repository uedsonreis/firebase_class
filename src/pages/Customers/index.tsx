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
            headerRight: () => <Button title="New" onPress={() => handleEditCustomer()} />,
            headerLeft: () => <Button title="Exit" onPress={handleSignOut} />,
        });
    }, [navigation, handleSignOut, logged]);

    firestore().collection('customers').where('userId', '==', logged?.uid).get().then(response => {
        setCustomers(response.docs.map(doc => ({ ...doc.data(), id: doc.id } as Customer) ));
    });

    function handleSignOut() {
        navigation.navigate('login');
    }

    function handleEditCustomer(customer?: Customer) {
        navigation.navigate('Edit Customer', { customer });
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <FlatList
                data={customers}
                keyExtractor={item => item.email}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.text} onPress={() => handleEditCustomer(item)}>{item.name} - {item.email}</Text>
                    </View>
                )}
            />
        </View>
    );
}