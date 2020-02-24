import React from 'react';
import { func, bool, string, number } from 'prop-types'
import { View } from 'react-native'
import { Snackbar, Title, ProgressBar, Headline, Button, Colors, IconButton } from "react-native-paper"

import styles from "../App.styles"

const HomeScreen = ({
    isAlertVisible,
    drankGlassesAmount,
    handleOnPress,
    hasDrunkMoreThanZero,
    handleLogout,
    alertText,
    setAlertVisible,
}) => {
    return (
        <React.Fragment>
            {isAlertVisible && (
                <Snackbar
                    style={styles.snackbar}
                    visible={isAlertVisible}
                    duration={3000}
                    onDismiss={() => setAlertVisible(false)}
                >
                    {alertText}
                </Snackbar>
            )}
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <Headline>Today you've drank {drankGlassesAmount} of 8 necessary glasses of water.</Headline>
                    <Button mode="contained" onPress={handleOnPress}>+1 Glass</Button>
                    <ProgressBar
                        progress={hasDrunkMoreThanZero ? drankGlassesAmount / 8 : 0}
                        color={Colors.deepPurple700}
                        backgroundColor={Colors.purple100}
                        style={styles.progress}
                    />
                </View>
                <Button onPress={handleLogout}>Log Out</Button>
            </View>
        </React.Fragment>
    )
}

HomeScreen.propTypes = {
    isAlertVisible: bool,
    drankGlassesAmount: number,
    handleOnPress: func.isRequired,
    hasDrunkMoreThanZero: bool,
    handleLogout: func.isRequired,
    alertText: string,
    setAlertVisible: func.isRequired,

}

export default HomeScreen;
