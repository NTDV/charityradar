import { TextInput, TouchableOpacity, View, Text, Keyboard, StatusBar } from 'react-native';

import { styles } from './styles';

import { COLOR_PLACEHOLDER_LIGHT } from '@shared/constants/style-variables';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type SearchProps = {
  placeholder?: string;
};

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
    <View style={{}}>
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
      {/*{focusSearch && (*/}
      {/*  <View*/}
      {/*    style={{*/}
      {/*      display: 'flex',*/}
      {/*      position: 'absolute',*/}
      {/*      bottom: 0,*/}
      {/*      left: 0,*/}
      {/*      width: 200,*/}
      {/*      height: 200,*/}
      {/*      backgroundColor: '#e2e2e2',*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
    </View>
  );
};
