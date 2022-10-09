import { StyleSheet } from 'react-native';
import { COLOR_BLACK, COLOR_ERROR, COLOR_GREY } from '../../constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  name: {
    fontSize: 16,
    color: COLOR_BLACK,
    opacity: 0.7,
    marginBottom: 6,
  },
  textField: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GREY,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  textFieldError: {
    borderBottomColor: COLOR_ERROR,
  },
  isRequired: {
    color: COLOR_ERROR,
  },
  inputIcon: {
    position: 'absolute',
    right: 15,
    bottom: 6,
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 5,
    color: COLOR_ERROR,
  },
});
