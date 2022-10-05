import { Pressable, Text, View } from 'react-native';

import { styles } from './styles';
import { ReactElement } from 'react';

type CustomButtonProps = {
  name: string;
  onPress: () => void;
  primary?: boolean;
  icon?: ReactElement;
  stylesButton?: object;
};

/**
 * Кастомный компонент кнопки
 * @param name - название
 * @param onPress - callback при клике
 * @param primary - изменение стилизации кнопки (заливка)
 * @param icon - иконка
 * @param stylesButton - стили для кнопки
 */

export const CustomButton = ({
  name,
  onPress,
  primary = false,
  icon: Icon,
  stylesButton = {},
}: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
        primary && styles.primaryContainer,
        primary && pressed && styles.primaryContainerPressed,
        stylesButton,
      ]}
      onPress={onPress}
    >
      {!!Icon && <View style={styles.iconContainer}>{Icon}</View>}
      <Text style={[styles.name, primary && styles.namePrimary]}>{name}</Text>
    </Pressable>
  );
};
