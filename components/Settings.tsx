import { FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Dispatch, SetStateAction, useContext } from 'react';

import TimerSetup from './TimerSetup';
import { TimersContextType, TimersContext } from '../TimersContext';

type Props = {
  isVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
};

export default function Settings({ isVisible, setIsModalVisible }: Props) {
  const { timers } = useContext(TimersContext) as TimersContextType;

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.iconContainer}>
          <Pressable onPress={() => setIsModalVisible(false)}>
            <MaterialIcons
              icon="close"
              color="#fff"
              name="close"
              size={40}
              style={styles.icon}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.timersContainer}>
        <FlatList
          data={timers}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item, index }) => {
            return <TimerSetup timeLeft={item} timerNumber={index + 1} />;
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '95%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
  },
  icon: {
    margin: 20,
  },
  timersContainer: {
    flex: 1,
    marginTop: 100,
  },
});
