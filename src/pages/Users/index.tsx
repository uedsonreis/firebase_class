import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

import styles from './styles';

export default function Users() {

    const navigation = useNavigation();

    navigation.setOptions({
        headerRight: () => <Button title="Sign Out" onPress={handleSignOut} />
    });

    const [users, setUsers] = React.useState([
        { email: 'uedson@any.com', password: '123' },
        { email: 'heitor@any.com', password: '456' },
    ]);

    function handleSignOut() {
        navigation.navigate('login');
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.text}>{item.email}</Text>
                    </View>
                )}
            />
        </View>
    );
}