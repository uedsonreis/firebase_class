import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

import styles from './styles';

export default function Customers() {

    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title="Sign Out" onPress={handleSignOut} />
        });
    }, [navigation, handleSignOut]);

    const [customers, setCustomers] = React.useState([
        { name: 'Maria', email: 'maria@any.com'  },
        { name: 'Heitor', email: 'heitor@any.com' },
    ]);

    function handleSignOut() {
        navigation.navigate('login');
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <FlatList
                data={customers}
                keyExtractor={user => user.email}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.text}>{item.name} - {item.email}</Text>
                    </View>
                )}
            />
        </View>
    );
}