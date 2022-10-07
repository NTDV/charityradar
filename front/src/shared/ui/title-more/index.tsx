import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { Entypo } from '@expo/vector-icons';
import { COLOR_PRIMARY } from '../../constants/style-variables';

type TitleMoreProps = {
  title: string;
  nameLink: string;
  onPress: () => void;
};

/**
 * Компонент для поисковика
 * @param title - Название блока
 * @param nameLink - Название ссылки
 * @param onPress - callback при клике по ссылке
 */

export const TitleMore = ({ title, nameLink, onPress }: TitleMoreProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.nameLink}>{nameLink}</Text>
        <Entypo size={25} name="chevron-right" style={{ color: COLOR_PRIMARY }} />
      </TouchableOpacity>
    </View>
  );
};
