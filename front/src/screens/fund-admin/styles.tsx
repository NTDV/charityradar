import { Dimensions, StyleSheet } from 'react-native';
import { COLOR_WHITE } from '../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../shared/constants/styles-global';

export const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: COLOR_WHITE,
  },
  wrapper: {
    padding: MAIN_PADDING,
  },
});
