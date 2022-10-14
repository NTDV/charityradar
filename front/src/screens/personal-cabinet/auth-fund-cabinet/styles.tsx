import { Dimensions, StyleSheet } from 'react-native';

import { MAIN_PADDING } from '../../../shared/constants/styles-global';
import {
  COLOR_BLACK,
  COLOR_GREY_LIGHT,
  COLOR_WHITE,
} from '../../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: COLOR_WHITE,
  },
  wrapper: {
    padding: MAIN_PADDING,
  },
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
    marginBottom: 3,
    fontWeight: '500',
  },
  headerEmail: {
    color: COLOR_BLACK,
    fontSize: 14,
    opacity: 0.8,
  },
  buttons: {
    marginTop: 30,
    padding: 5,
  },
  confirmed: {
    paddingBottom: MAIN_PADDING,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GREY_LIGHT,
  },
  confirmedTitle: {
    fontSize: 20,
    color: COLOR_BLACK,
    marginBottom: 8,
  },
  confirmedSubtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: COLOR_BLACK,
    marginBottom: 15,
  },
  money: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moneyTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  moneySubtitle: {
    fontSize: 22,
    letterSpacing: 2,
    fontWeight: '500',
  },
});
