import React from 'react';
import { Portal, Modal, Title, Caption, TextInput, Button } from 'react-native-paper'
import { func, string, bool } from 'prop-types'
import styles from "../App.styles"

const LoginModal = ({
    errorLoginText,
    isModalVisible,
    onChangeEmail,
    onChangePassword,
    handleLogin,
    email,
    password
}) => (
        <Portal>
            <Modal style={styles.modal}
                contentContainerStyle={styles.modalContainer}
                visible={isModalVisible}
                onDismiss={() => { }}
            >
                <Title>DRINK WATER REMINDER</Title>
                <Caption style={styles.error}>{errorLoginText}</Caption>
                <TextInput
                    label='Email'
                    value={email}
                    style={styles.textInput}
                    onChangeText={email => onChangeEmail(email)}>
                </TextInput>
                <TextInput
                    label='Password'
                    value={password}
                    secureTextEntry
                    style={styles.textInput}
                    onChangeText={password => onChangePassword(password)}>
                </TextInput>
                <Button onPress={handleLogin} mode="contained">Log In</Button>
            </Modal>
        </Portal>
    )


LoginModal.propTypes = {
    onChangeEmail: func.isRequired,
    onChangePassword: func.isRequired,
    handleLogin: func.isRequired,
    errorLoginText: string,
    isModalVisible: bool.isRequired,
    email: string,
    password: string
}

export default LoginModal
