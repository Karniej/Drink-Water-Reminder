import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    progress: {
        width: 300,
        height: 20,
        borderRadius: 5,
        marginTop: 10
    },
    snackbar: {
        textAlign: 'center',
        bottom: 200
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    modal: {
        flex: 1,
        backgroundColor: 'white'
    },
    textInput: {
        width: '100%',
        marginVertical: 10
    },
    error: {
        color: Colors.red900
    },
    title: {
        textAlign: 'center'
    }
});
