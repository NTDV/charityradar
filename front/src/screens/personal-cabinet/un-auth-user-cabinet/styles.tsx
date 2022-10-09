import { Dimensions, StyleSheet } from 'react-native';

import { MAIN_PADDING } from '../../../shared/constants/styles-global';
import { COLOR_BLACK, COLOR_WHITE } from '../../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: COLOR_WHITE,
  },
  wrapper: {
    padding: MAIN_PADDING,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  subTitle: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
  },
  ul: {
    marginBottom: 30,
  },
  li: {
    color: COLOR_BLACK,
    opacity: 0.8,
    marginBottom: 10,
  },
});
