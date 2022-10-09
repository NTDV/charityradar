import { StyleSheet } from 'react-native';
import { COLOR_BLACK, COLOR_ERROR, COLOR_GREY } from '../../../shared/constants/style-variables';

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
  inputPhone: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GREY,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  inputPhoneError: {
    borderBottomColor: COLOR_ERROR,
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 5,
    color: COLOR_ERROR,
  },
  name: {
    fontSize: 16,
    color: COLOR_BLACK,
    opacity: 0.7,
    marginBottom: 6,
  },
  isRequired: {
    color: COLOR_ERROR,
  },
});
