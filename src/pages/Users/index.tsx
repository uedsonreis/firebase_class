import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, Text, View } from 'react-native';
import auth from "@react-native-firebase/auth";

import styles from './styles';

export default function Users() {

    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        const logged = auth().currentUser;
        if (!logged) handleSignOut();

        navigation.setOptions({
            headerRight: () => <Button title="Sign Out" onPress={handleSignOut} />
        });
    }, [navigation, handleSignOut, auth]);

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
                keyExtractor={user => user.email}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.text}>{item.email}</Text>
                    </View>
                )}
            />
        </View>
    );
}