import { StyleSheet } from 'react-native';
import {
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
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    width: '100%',
    height: 120,
    resizeMode: 'stretch',
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
  },
  info: {
    marginVertical: 10,
  },
  nameFund: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
