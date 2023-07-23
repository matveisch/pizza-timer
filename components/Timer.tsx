import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

import { getRemaining } from '../lib';

interface Props {
  remainingSecs: number;
}

export default function Timer({ remainingSecs }: Props) {
  // timer states
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(remainingSecs);
  const { mins, secs } = getRemaining(timeLeft);

  // color & sound states
  const [sound, setSound] = useState<Audio.Sound>();
  const [isColorRed, setIsColorRed] = useState(false);
  const [shouldBlink, setShouldBlink] = useState(false);

  // animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [currentColor, setCurrentColor] = useState<any>('red');
  const animationValueRef = useRef(0);

  // resetting timeLeft when props changing
  useEffect(() => {
    setTimeLeft(remainingSecs);
  }, [remainingSecs]);

  function handleClick() {
    if (timeLeft > 0) {
      setIsActive(!isActive);
      handleAnimation();
    } else if (timeLeft <= 0) {
      setShouldBlink(false);
      setTimeLeft(remainingSecs);
    }
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      if (isActive) playSound();
      animation.setValue(0);
      setShouldBlink(true);
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

  useEffect(() => {
    // Change the state every second or the time given by User.
    let interval: NodeJS.Timer | undefined = undefined;
    if (shouldBlink) {
      interval = setInterval(() => {
        setIsColorRed((colorRed) => !colorRed);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [shouldBlink]);

  const handleAnimation = () => {
    if (!isAnimating) {
      // Animation is not running, start the animation
      setIsAnimating(true);
      Animated.timing(animation, {
        useNativeDriver: false,
        toValue: 1,
        duration: timeLeft * 1000,
      }).start(({ finished }) => {
        if (finished) {
          // Save the current color and stop the animation
          setIsAnimating(false);
        }
      });
    } else {
      // Animation is running, stop the animation
      animation.stopAnimation((value) => {
        setIsAnimating(false);
        setCurrentColor(boxInterpolation);
        animationValueRef.current = value; // Save the current value
      });
    }
  };

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['red', 'green'],
  });

  const animatedStyle = {
    backgroundColor: isAnimating ? boxInterpolation : currentColor,
  };

  return (
    <Pressable onPress={handleClick}>
      <Animated.View
        style={[
          styles.button,
          animatedStyle,
          timeLeft === 0 && { backgroundColor: isColorRed ? 'red' : 'green' },
        ]}
      >
        <Text style={styles.text}>{`${mins}:${secs}`}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    borderRadius: 5,
  },
  text: {
    fontSize: 40,
  },
});
