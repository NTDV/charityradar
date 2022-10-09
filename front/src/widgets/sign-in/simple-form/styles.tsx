import { StyleSheet } from 'react-native';
import { COLOR_ERROR } from '../../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    marginBottom: 35,
  },
  rowLast: {
    marginBottom: 40,
  },
  rowButton: {
    marginBottom: 20,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 10,
    color: COLOR_ERROR,
  },
});
