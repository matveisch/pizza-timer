import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Dispatch, SetStateAction } from 'react';

export default function Settings({
  isVisible,
  setIsModalVisible,
}: {
  isVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.iconContainer}>
          <Pressable onPress={() => setIsModalVisible(false)}>
            <MaterialIcons
              icon="close"
              name="close"
              size={40}
              style={styles.icon}
            />
          </Pressable>
        </View>
        <Text>Settings</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '95%',
    width: '100%',
    backgroundColor: 'white',
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
});
