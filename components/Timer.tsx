import { Pressable, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';

interface Props {
  remainingSecs: number;
}

function formatNumber(number: number) {
  return `0${number}`.slice(-2);
}

function getRemaining(time: number) {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function Timer(props: Props) {
  const { remainingSecs } = props;
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(remainingSecs);
  const { mins, secs } = getRemaining(timeLeft);

  function handleClick() {
    if (timeLeft > 0) {
      setIsActive(!isActive);
    }
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsActive(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined = undefined;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(() => timeLeft - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  return (
    <Pressable
      onPress={handleClick}
      style={[styles.button, timeLeft === 0 && { backgroundColor: 'green' }]}
    >
      <Text>{`${mins}:${secs}`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius: 5,
  },
});
