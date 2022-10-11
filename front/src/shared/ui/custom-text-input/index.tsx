import { forwardRef, Ref, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, KeyboardTypeOptions } from 'react-native';

import { styles } from './styles';

import { COLOR_PLACEHOLDER } from '../../constants/style-variables';
import { IconEye } from '../../icons/icon-eye';
import { IconEye2 } from '../../icons/icon-eye-2';

export type CustomTextInputProps = {
  name: string;
  isRequired?: boolean;
  placeholder?: string;
  isPassword?: boolean;
  editable?: boolean;
  value: string;
  onChangeText: () => void;
  onBlur?: () => void;
  errorMessage?: string | FieldError | any;
  textContentType?: any;
  blurOnSubmit?: boolean;
  onSubmitEditing?: () => void;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

/**
 * widget регистрации через форму
 * @param name - название
 * @param isRequired - обязательное заполнение поля в форме
 * @param isPassword - является ли форма паролем
 * @param editable - readonly
 * @param errorMessage - текст ошибки
 */

export const CustomTextInput = forwardRef(
  (
    { name, errorMessage, isRequired = false, isPassword = false, ...props }: CustomTextInputProps,
    ref: Ref<TextInput>,
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(isPassword);

    const passwordVisibleHandler = () => setPasswordVisible((prev) => !prev);

    return (
      <View style={styles.container}>
        <Text style={styles.name}>
          {name} {isRequired && <Text style={styles.isRequired}>*</Text>}
        </Text>
        <TextInput
          ref={ref}
          placeholderTextColor={COLOR_PLACEHOLDER}
          {...props}
          secureTextEntry={passwordVisible}
          style={[styles.textField, !!errorMessage ? styles.textFieldError : {}]}
        />

        <TouchableOpacity onPress={passwordVisibleHandler}>
          <View style={styles.inputIcon}>
            {isPassword && !passwordVisible && <IconEye />}
            {isPassword && passwordVisible && <IconEye2 />}
          </View>
        </TouchableOpacity>
        {!!errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>
    );
  },
);
