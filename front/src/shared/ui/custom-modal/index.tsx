import { Modal, View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';

import { styles } from './styles';
import { IconExit } from '../../icons/icon-exit';

type CustomModalProps = {
  title: string;
  children: JSX.Element;
  visibility: boolean;
  onClose: () => void;
};

/**
 * Modal - забыл пароль
 * @param title - название popup
 * @param visibility - параметр отображения
 * @param onClose - callback для закрытия popup
 */

export const CustomModal = ({ title, visibility = false, onClose, children }: CustomModalProps) => {
  return (
    <Modal visible={visibility} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={[styles.centeredView, styles.background]}>
        <SafeAreaView>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.headerName}>{title}</Text>
              <Pressable
                style={({ pressed }) => [pressed && { opacity: 0.5 }]}
                onPress={onClose}
                hitSlop={10}
              >
                <IconExit />
              </Pressable>
            </View>
            <ScrollView style={styles.content}>{children}</ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};
