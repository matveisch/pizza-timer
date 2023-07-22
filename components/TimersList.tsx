import { FlatList, StyleSheet, View } from 'react-native';
import Timer from './Timer';
import { useContext } from 'react';
import { TimersContext, TimersContextType } from '../TimersContext';

export default function TimersList() {
  const { timers } = useContext(TimersContext) as TimersContextType;

  // Create a new array with updated remaining seconds
  const updatedTimers = timers.map((timer) => ({ remainingSecs: timer }));

  console.log(timers);

  return (
    <FlatList
      style={styles.flatList}
      numColumns={2}
      data={updatedTimers} // Use the updatedTimers array
      keyExtractor={(item, index) => index.toString()} // Added keyExtractor to avoid "missing key" warning
      renderItem={({ item, index }) => {
        return (
          <View style={styles.listItemContainer}>
            <Timer remainingSecs={item.remainingSecs} key={`timer-${index}`} />
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  flatList: { marginTop: 200 },
  listItemContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 4,
  },
});
