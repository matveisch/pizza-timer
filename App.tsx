import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import Timer from './components/Timer';

export default function App() {
  const [timers, setTimers] = useState([100, 50, 30, 10, 2, 0, 0, 0]);

  return (
    <View style={styles.container}>
      <FlatList
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 200,
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 4,
  },
});
