import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 20
    },

    label: {
        marginBottom: 10,
    },

    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 20,
        width: Dimensions.get('window').width - 40,
    },

});