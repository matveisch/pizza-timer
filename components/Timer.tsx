import { Pressable, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

import { getRemaining } from '../lib';

interface Props {
  remainingSecs: number;
}

export default function Timer({ remainingSecs }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(remainingSecs);
  const { mins, secs } = getRemaining(timeLeft);
  const [sound, setSound] = useState<Audio.Sound>();

  // resetting timeLeft when props changing
  useEffect(() => {
    setTimeLeft(remainingSecs);
  }, [remainingSecs]);

  function handleClick() {
    if (timeLeft > 0) {
      setIsActive(!isActive);
    }
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      if (isActive) playSound();
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

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/microwave-timer-117077.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound?.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
