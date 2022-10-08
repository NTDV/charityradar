import { StyleSheet } from 'react-native';

import { MAIN_PADDING } from '../../../shared/constants/styles-global';
import { COLOR_BLACK, COLOR_GREY_LIGHT } from '../../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  header: {
    paddingVertical: MAIN_PADDING,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GREY_LIGHT,
    borderTopColor: COLOR_GREY_LIGHT,
    borderTopWidth: 1,
    marginBottom: 15,
  },
  headerName: {
    color: COLOR_BLACK,
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  headerEmail: {
    color: COLOR_BLACK,
    fontSize: 14,
    opacity: 0.8,
  },
});
