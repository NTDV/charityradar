import { StyleSheet } from 'react-native';
import { COLOR_GREY } from '../../constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: COLOR_GREY,
    borderWidth: 1,
  },
  letter: {
    color: COLOR_GREY,
    fontSize: 22,
  },
});
