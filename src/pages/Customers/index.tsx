import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, Text, View } from 'react-native';

import { authService, customerService } from '../../services';

import { Customer } from './types';
import styles from './styles';

export default function Customers() {

    const navigation = useNavigation();
    const logged = authService.getLoggedUser();
    
    const [refreshing, setRefreshing] = React.useState(false);
    const [customers, setCustomers] = React.useState<Customer[]>([]);

    React.useLayoutEffect(() => {
        if (!logged) handleSignOut();

        navigation.setOptions({
            headerRight: () => <Button title="New" onPress={() => handleEditCustomer()} />,
            headerLeft: () => <Button title="Exit" onPress={handleSignOut} />,
        });

    }, [navigation, handleSignOut, logged]);

    React.useEffect(() => fetchCustomers(), []);

    function fetchCustomers(): void {
        setRefreshing(true);
        customerService.getCustomers().then(customers => {
            setCustomers(customers);
            setRefreshing(false);
        });
    }

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
                refreshing={refreshing}
                onRefresh={fetchCustomers}
            />
        </View>
    );
}