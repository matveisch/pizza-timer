import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

import { formatNumber, getRemaining } from '../lib';
import { TimersContextType, TimersContext } from '../TimersContext';

type Props = {
  timeLeft: number;
  timerNumber: number;
};

export default function TimerSetup({ timeLeft, timerNumber }: Props) {
  const { mins, secs } = getRemaining(timeLeft);
  const [minSetup, setMinSetup] = useState(mins);
  const [secSetup, setSecSetup] = useState(secs);
  const { timers, setTimers } = useContext(TimersContext) as TimersContextType;

  function handleUpdate() {
    // updating array value
    const timersCopy = [...timers];
    timersCopy[timerNumber - 1] = parseInt(minSetup) * 60 + parseInt(secSetup);
    setTimers(timersCopy);

    setMinSetup(formatNumber(parseInt(minSetup)));
    setSecSetup(formatNumber(parseInt(secSetup)));
  }

  function handleBlur(value: string, set: Dispatch<SetStateAction<string>>) {
    if (value === '') {
      set('00');
    }
  }

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.text}>Timer {timerNumber}: </Text>
      <View style={styles.inputsContainer}>
        <TextInput
          onFocus={() => setMinSetup('')}
          onBlur={() => handleBlur(minSetup, setMinSetup)}
          onChangeText={(text) => setMinSetup(text)}
          onEndEditing={handleUpdate}
          defaultValue={minSetup}
          keyboardType="numeric"
          maxLength={2}
          style={styles.input}
        />
        <TextInput
          onFocus={() => setSecSetup('')}
          onBlur={() => handleBlur(secSetup, setSecSetup)}
          onChangeText={(text) => setSecSetup(text)}
          onEndEditing={handleUpdate}
          defaultValue={secSetup}
          keyboardType="numeric"
          maxLength={2}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 4,
    padding: 1,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
});
