import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Settings from './components/Settings';
import TimersList from './components/TimersList';
import { TimersContext } from './TimersContext';

export default function App() {
  const [timers, setTimers] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
            name="settings"
            size={40}
            style={styles.icon}
          />
        </Pressable>
      </View>
      <TimersContext.Provider value={{ timers, setTimers }}>
        <TimersList />
        <Settings
          isVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </TimersContext.Provider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 50,
    right: 0,
    flex: 1,
  },
  icon: {
    margin: 20,
  },
});
