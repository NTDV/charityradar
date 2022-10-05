import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import { COLOR_PLACEHOLDER } from '@shared/constants/style-variables';
import { IconEye } from '@shared/icons/icon-eye';
import { IconEye2 } from '@shared/icons/icon-eye-2';

export type CustomTextInputProps = {
  name: string;
  isRequired?: boolean;
  placeholder?: string;
  isPassword?: boolean;
  editable?: boolean;
};

/**
 * widget регистрации через форму
 * @param name - название
 * @param isRequired - обязательное заполнение поля в форме
 * @param isPassword - является ли форма паролем
 * @param editable - readonly
 */

export const CustomTextInput = ({
  name,
  isRequired = false,
  isPassword = false,
  ...props
}: CustomTextInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(isPassword);

  const passwordVisibleHandler = () => setPasswordVisible((prev) => !prev);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {name} {isRequired && <Text style={styles.isRequired}>*</Text>}
      </Text>
      <TextInput
        placeholderTextColor={COLOR_PLACEHOLDER}
        {...props}
        secureTextEntry={passwordVisible}
        style={[styles.textField]}
      />

      <TouchableOpacity onPress={passwordVisibleHandler}>
        <View style={styles.inputIcon}>
          {isPassword && !passwordVisible && <IconEye />}
          {isPassword && passwordVisible && <IconEye2 />}
        </View>
      </TouchableOpacity>
    </View>
  );
};
