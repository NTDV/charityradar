import { Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { styles } from './styles';
import { COLOR_ERROR, COLOR_PRIMARY } from '../../../../shared/constants/style-variables';

type CabinetButtonListProps = {
  buttons: {
    name: string;
    onPress: () => void;
    isWarning?: boolean;
  }[];
};

export const CabinetButtonList = ({ buttons }: CabinetButtonListProps) => {
  return (
    <View style={styles.container}>
      {buttons.map(({ name, onPress, isWarning }, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.item, index === buttons.length - 1 && { borderBottomWidth: 0 }]}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={[styles.itemName, isWarning && { color: COLOR_ERROR }]}>{name}</Text>
          <Entypo
            size={25}
            name="chevron-right"
            style={{ color: isWarning ? COLOR_ERROR : COLOR_PRIMARY }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
