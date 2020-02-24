import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Provider, Headline, Title } from 'react-native-paper'
import { View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from 'react-native-firebase'
import { LoginModal, HomeScreen } from './components'
import styles from "./App.styles"

function App() {
  const [drankGlassesAmount, setDrankGlassesAmount] = useState(0)
  const [isAlertVisible, setAlertVisible] = useState(false)
  const [isModalVisible, setModalVisible] = useState(true)
  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const [alertText, setAlertText] = useState('')
  const [errorLoginText, setErrorLoginText] = useState('')
  const maxNeededGlassesADay = 8
  const hasDrunkMoreThanZero = drankGlassesAmount > 0
  const [firstGlassTime, setFirstGlassTime] = useState(new Date(1582513020444))
  console.log('firstGlassTime: ', firstGlassTime);

  // AsyncStorage
  const retrieveData = async () => {
    try {
      const valueString = await AsyncStorage.getItem('time')
      const value = JSON.parse(valueString)
      const date = new Date(value)
      if (value !== null && date.getTime() !== firstGlassTime.getTime()) {
        setFirstGlassTime(date)
      }
    } catch (error) { console.log(error) }
  }

  const addTimeToAsyncStorage = async (time) => {
    await AsyncStorage.setItem('time', JSON.stringify(time));
    setFirstGlassTime(time);
  }

  //Setting Time of a day for start of notifications
  const handleOnTimeChange = (event, selectedTime) => {
    setFirstGlassTime(selectedTime)
    addTimeToAsyncStorage(selectedTime)
    setReminders()
  }

  const handleOnPress = () => {
    setDrankGlassesAmount(prevState => prevState + 1)
  }

  async function setReminders() {
    await firebase.notifications().cancelAllNotifications()
    await firebase.notifications().scheduleNotification(buildNotification('first'), {
      fireDate: firstGlassTime.getTime(),
      repeatInterval: 'day',
      exact: true,
    })

    for (let index = 1; index < maxNeededGlassesADay; index++) {
      await firebase.notifications().scheduleNotification(buildNotification(`anotherOne + ${index}`), {
        fireDate: firstGlassTime.getTime() + (index * 3600 * 1000),
        repeatInterval: 'day',
        exact: true,
      })

      console.log("HEJHEJHEJ")

    }

  }
  useEffect(() => {
    if (drankGlassesAmount === maxNeededGlassesADay) {
      setAlertText("Good For you! You've drank enough water today. :)")
      setAlertVisible(true)
    }


    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setModalVisible(false)
      }
    })
    checkPermission()
    retrieveData()
    setReminders()
  }, [drankGlassesAmount, firstGlassTime])

  // Notifications
  const buildNotification = (notificationID) => {
    const title = 'Drink a glass of Water now'
    const notification = new firebase.notifications.Notification()
      .setNotificationId(notificationID)
      .setTitle(title)
      .setBody(
        hasDrunkMoreThanZero
          ? 'Time for another glass of water'
          : 'Remember to drink your first glass of water!',
      )
    return notification
  }

  // Permissions
  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      firebase
        .notifications()
        .onNotification(async notification => {
          await firebase.notifications().displayNotification(notification)
        })
    } else {
      try {
        await firebase.messaging().requestPermission()
      } catch (error) {
        setAlertText(
          'Unable to access the Notification permission. Please enable the Notification Permission from the settings',
        )
        setAlertVisible(true)
      }
    }
  }

  // Auth
  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setModalVisible(false)
      })
      .then(() => {
        setAlertText("Logged In Successfully!")
        setAlertVisible(true)
      })
      .catch(error => {

        setErrorLoginText(error.message)
      })
  }

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {

        setAlertText("Signed Out!")
        setAlertVisible(true)
      })
      .then(() => {
        setModalVisible(true)
      })
  }

  // Rendering
  return (
    <Provider>
      <LoginModal
        handleLogin={handleLogin}
        onChangePassword={onChangePassword}
        onChangeEmail={onChangeEmail}
        email={email}
        password={password}
        isModalVisible={isModalVisible}
        errorLoginText={errorLoginText}
      />
      <View style={{ flex: 1, marginTop: 100 }}>
        <View >
          <Title style={styles.title}>DRINK WATER REMINDER</Title>
          <Headline style={styles.title}>Set the first's glass of water Reminder</Headline>
          <DateTimePicker
            style={{ width: '100%' }}
            timeZoneOffsetInMinutes={0}
            value={firstGlassTime}
            mode='time'
            is24Hour={true}
            display="default"
            onChange={handleOnTimeChange}
          />
        </View>
        <HomeScreen
          isAlertVisible={isAlertVisible}
          handleLogout={handleLogout}
          hasDrunkMoreThanZero={hasDrunkMoreThanZero}
          drankGlassesAmount={drankGlassesAmount}
          setAlertVisible={setAlertVisible}
          handleOnPress={handleOnPress}
          alertText={alertText}
          firstGlassTime={firstGlassTime}
          handleOnTimeChange={handleOnTimeChange}
        />
      </View>
    </Provider>
  )
}

export default App
