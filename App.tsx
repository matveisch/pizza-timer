import { StatusBar } from 'expo-status-bar';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Timer from './components/Timer';
import Settings from './components/Settings';

export type ContextType = {
  timers: number[];
  setTimers: Dispatch<SetStateAction<number[]>>;
};

export const TimersContext = createContext<ContextType | null>(null);

export default function App() {
  const [timers, setTimers] = useState([100, 50, 30, 10, 2, 0, 0, 0]);
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
      <FlatList
        style={styles.flatList}
        data={timers}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItemContainer}>
              <Timer remainingSecs={item} />
            </View>
          );
        }}
      />
      <TimersContext.Provider value={{ timers, setTimers }}>
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
  flatList: { marginTop: 200 },
  listItemContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 4,
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
