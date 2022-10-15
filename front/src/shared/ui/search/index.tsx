import { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, Keyboard } from 'react-native';

import { styles } from './styles';

import { COLOR_PLACEHOLDER_LIGHT } from '../../constants/style-variables';
import { Ionicons } from '@expo/vector-icons';
import { search, SearchType } from '../../api/search';
import { AppNavigationProps } from '../../../navigation';

type SearchProps = {
  placeholder?: string;
  appNavigation: AppNavigationProps;
};

/**
 * Компонент для поисковика
 * @param placeholder - children
 */

export const Search = ({ placeholder, appNavigation }: SearchProps) => {
  const [value, setValue] = useState('');
  const [fundList, setFundList] = useState<SearchType['fund'] | []>([]);
  const [feesList, setFeesList] = useState<SearchType['fees'] | []>([]);
  const [focusSearch, setFocusSearch] = useState(false);

  const onFocus = () => setFocusSearch(true);
  const onBlur = () => setFocusSearch(false);

  const openFund = (id: string | number) => {
    appNavigation.navigation.push('FundScreen', { id });
  };
  const openFees = (fees: SearchType['fees']) => {
    appNavigation.navigation.push('FeesFullScreen', {
      id: fees.id,
      fondName: fees.name,
    });
  };

  const onChangeText = async (value: string) => {
    setValue(value);
    const payload: SearchType = await search(value);
    setFundList(payload.fund);
    setFeesList(payload.fees);
  };

  const clearValue = () => {
    setValue('');
    setFundList([]);
    setFeesList([]);
  };

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
      {focusSearch && (fundList.length > 0 || feesList.length > 0) && (
        <View style={styles.containerList}>
          <View style={styles.searchContainer}>
            {fundList.length > 0 && <Text style={styles.searchContainerTitle}>Фонды</Text>}
            <View style={styles.searchBox}>
              {fundList.map((fund) => (
                <TouchableOpacity
                  key={fund.id}
                  style={styles.searchBoxItem}
                  onPress={() => openFund(fund.id)}
                  activeOpacity={0.8}
                >
                  <Text>{fund.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.searchContainer}>
            {feesList.length > 0 && <Text style={styles.searchContainerTitle}>Сборы</Text>}
            <View style={styles.searchBox}>
              {feesList.map((fees) => (
                <TouchableOpacity
                  key={fees.id}
                  style={styles.searchBoxItem}
                  onPress={() => openFees(fees)}
                  activeOpacity={0.8}
                >
                  <Text>{fees.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
