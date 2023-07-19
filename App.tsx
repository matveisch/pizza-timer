import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';

import Timer from './components/Timer';

export default function App() {
  const [timers, setTimers] = useState([100, 50, 30, 10, 0, 0, 0, 0]);
  const [orientation, setOrientation] = useState<
    null | 'LANDSCAPE' | 'PORTRAIT'
  >(null);

  useEffect(() => {
    const handleOrientationChange = (motionData: {
      accelerationIncludingGravity: { x: number; y: number };
    }) => {
      const { accelerationIncludingGravity } = motionData;
      const { x, y } = accelerationIncludingGravity;

      if (Math.abs(x) > Math.abs(y)) {
        setOrientation('LANDSCAPE');
      } else {
        setOrientation('PORTRAIT');
      }
    };

    // Subscribe to the DeviceMotion sensor to track orientation changes
    const subscription = DeviceMotion.addListener(handleOrientationChange);

    // Lock the screen orientation based on the detected orientation
    const lockOrientation = async () => {
      if (orientation === 'LANDSCAPE') {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      } else {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      }
    };

    lockOrientation(); // Lock the initial orientation

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.remove();
    };
  }, [orientation]);

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
      <Text style={{ color: '#25292e' }}>orientation: {orientation}</Text>
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
