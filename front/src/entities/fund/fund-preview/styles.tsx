import { StyleSheet } from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GOLD,
  COLOR_GREY_LIGHT,
  COLOR_WHITE,
} from '../../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    width: 250,
    padding: 10,
    backgroundColor: COLOR_WHITE,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  containerLarge: {
    width: '100%',
    marginBottom: 10,
  },
  img: {
    width: '100%',
    height: 120,
    resizeMode: 'stretch',
  },
  imgLarge: {
    height: 160,
  },
  containerImg: {},
  coefficientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: COLOR_GREY_LIGHT,
    borderBottomWidth: 1,
  },
  coefficientTitle: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  coefficient: {
    fontSize: 16,
    color: COLOR_GOLD,
    fontWeight: 'bold',
  },
  info: {
    marginVertical: 10,
  },
  nameFund: {
    color: COLOR_BLACK,
    opacity: 0.9,
    fontWeight: 'bold',
    fontSize: 16,
  },
  fee: {
    marginTop: 10,
  },
  feeText: {
    fontSize: 14,
  },
});
