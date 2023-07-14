import {Pressable, Text, ToastAndroid, View} from "react-native";
import {useEffect, useState} from "react";

interface Props {
  remainingSecs: number;
}

function formatNumber(number: number) {
  return `0${number}`.slice(-2);
}

function getRemaining(time: number) {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return {mins: formatNumber(mins), secs: formatNumber(secs)};
}

export default function Timer(props: Props) {
  const {remainingSecs} = props;
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(remainingSecs);

  function showToast() {
    ToastAndroid.show('Clicked', ToastAndroid.SHORT);
  }

  function handleClick() {
    showToast();
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(() => timeLeft - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft])

  return <View>
    <Pressable onPress={handleClick}>
      <Text>{`${getRemaining(timeLeft).mins}:${getRemaining(timeLeft).secs}`}</Text>
    </Pressable>
  </View>
}
