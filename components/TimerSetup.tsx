import { StyleSheet, Text, TextInput, View } from 'react-native';

import { getRemaining } from '../lib';

type Props = {
  timeLeft: number;
  timerNumber: number;
};

export default function TimerSetup({ timeLeft, timerNumber }: Props) {
  const { mins, secs } = getRemaining(timeLeft);

  return (
    <View style={styles.timerContainer}>
      <Text>Timer {timerNumber}: </Text>
      <View style={styles.inputsContainer}>
        <TextInput
          defaultValue={mins}
          keyboardType="numeric"
          maxLength={2}
          style={styles.input}
        />
        <TextInput
          defaultValue={secs}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
