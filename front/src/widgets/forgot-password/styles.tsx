import { StyleSheet } from 'react-native';
import { COLOR_ERROR } from '../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  row: {
    marginBottom: 25,
  },
  err: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 12,
    color: COLOR_ERROR,
  },
});
