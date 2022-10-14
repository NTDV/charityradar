import { StyleSheet } from 'react-native';
import { COLOR_GREY, COLOR_WHITE } from '../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  footer: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: COLOR_WHITE,
    borderTopWidth: 1,
    borderTopColor: COLOR_GREY,
  },
});
