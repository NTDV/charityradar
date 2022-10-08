import { StyleSheet } from 'react-native';
import { COLOR_BLACK, COLOR_WHITE } from '../../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {
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
    marginBottom: 10,
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
});
