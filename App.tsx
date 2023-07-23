import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Settings from './components/Settings';
import TimersList from './components/TimersList';
import { TimersContext } from './TimersContext';
import AnimatedColor from './components/AnimatedColor';

export default function App() {
  const [timers, setTimers] = useState([10, 10, 10, 10, 10, 10, 10, 2]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const storeData = async (value: number[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('timers', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('timers');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData().then((data) => {
      if (data !== null) setTimers(data);
    });
  }, []);

  useEffect(() => {
    storeData(timers);
  }, [timers]);

  return (
    <View
      style={[
        styles.container,
        isModalVisible && { backgroundColor: 'rgba(0,0,0,0.5)' },
      ]}
    >
      <View style={styles.iconContainer}>
        <Pressable onPress={() => setIsModalVisible(!isModalVisible)}>
          <MaterialIcons
            icon="settings"
            color="#fff"
            name="settings"
            size={40}
            style={styles.icon}
          />
        </Pressable>
      </View>
      {/*<TimersContext.Provider value={{ timers, setTimers }}>*/}
      {/*  <TimersList />*/}
      {/*  <Settings*/}
      {/*    isVisible={isModalVisible}*/}
      {/*    setIsModalVisible={setIsModalVisible}*/}
      {/*  />*/}
      {/*</TimersContext.Provider>*/}
      <AnimatedColor />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 100,
    right: 0,
    flex: 1,
  },
  icon: {
    margin: 20,
  },
});
