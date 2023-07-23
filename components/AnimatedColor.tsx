import { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
export default function AnimatedColor() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [currentColor, setCurrentColor] = useState<any>('red');
  const animationValueRef = useRef(0);

  const handleAnimation = () => {
    if (!isAnimating) {
      // Animation is not running, start the animation
      setIsAnimating(true);
      Animated.timing(animation, {
        useNativeDriver: false,
        toValue: 1,
        duration: 5000,
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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleAnimation}>
        <Animated.View style={{ ...styles.box, ...animatedStyle }} />
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#5AD2F4',
  },
});
