import { StyleSheet } from 'react-native';
import { COLOR_GREY } from '../../constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLOR_GREY,
    borderWidth: 1,
  },
  letter: {
    color: COLOR_GREY,
    fontSize: 22,
  },
});
