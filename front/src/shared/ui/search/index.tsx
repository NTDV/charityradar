import { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, Keyboard } from 'react-native';

import { styles } from './styles';

import { COLOR_PLACEHOLDER_LIGHT } from '../../constants/style-variables';
import { Ionicons } from '@expo/vector-icons';

type SearchProps = {
  placeholder?: string;
};

/**
 * Компонент для поисковика
 * @param placeholder - children
 */

export const Search = ({ placeholder }: SearchProps) => {
  const [value, setValue] = useState('');
  const [focusSearch, setFocusSearch] = useState(false);

  const onFocus = () => setFocusSearch(true);
  const onBlur = () => setFocusSearch(false);

  const onChangeText = (value: string) => setValue(value);

  const clearValue = () => setValue('');

  const cancelHandler = () => {
    Keyboard.dismiss();
    clearValue();
    onBlur();
  };

  return (
    <View>
      <View style={[styles.container, focusSearch && styles.containerFocused]}>
        <View style={styles.textInputContainer}>
          <View style={styles.icon}>
            <Ionicons size={25} name={'search'} style={{ color: 'rgba(0, 0, 0, 0.6)' }} />
          </View>
          <TextInput
            value={value}
            placeholder={placeholder}
            style={styles.textInput}
            placeholderTextColor={COLOR_PLACEHOLDER_LIGHT}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          {value.length > 0 && (
            <TouchableOpacity style={styles.iconClear} onPress={clearValue}>
              <Ionicons size={25} name={'close'} style={{ color: 'rgba(0, 0, 0, 0.6)' }} />
            </TouchableOpacity>
          )}
        </View>
        {focusSearch && (
          <TouchableOpacity style={styles.cancel} onPress={cancelHandler}>
            <Text style={styles.cancelText}>Отмена</Text>
          </TouchableOpacity>
        )}
      </View>
      {focusSearch && (
        <View style={styles.containerList}>
          <Text>Тут будет что-то</Text>
        </View>
      )}
    </View>
  );
};
