import { ReactElement } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { styles } from './styles';

import { COLOR_PRIMARY, COLOR_WHITE } from '../../constants/style-variables';

type CustomButtonProps = {
  name: string;
  onPress: () => void;
  primary?: boolean;
  icon?: ReactElement;
  stylesButton?: object;
  rect?: boolean;
  loading?: boolean;
};

/**
 * Кастомный компонент кнопки
 * @param name - название
 * @param onPress - callback при клике
 * @param primary - изменение стилизации кнопки (заливка)
 * @param icon - иконка
 * @param stylesButton - стили для кнопки
 * @param loading - состояние загрузки
 */

export const CustomButton = ({
  name,
  onPress,
  primary = false,
  icon: Icon,
  stylesButton = {},
  rect,
  loading = false,
}: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
        primary && styles.primaryContainer,
        rect && styles.rectContainer,
        primary && pressed && styles.primaryContainerPressed,
        stylesButton,
      ]}
      onPress={onPress}
      disabled={!!loading}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={primary ? COLOR_WHITE : COLOR_PRIMARY}
          style={{ marginRight: 10 }}
        />
      )}
      {!!Icon && <View style={styles.iconContainer}>{Icon}</View>}
      <Text style={[styles.name, primary && styles.namePrimary]}>{name}</Text>
    </Pressable>
  );
};
