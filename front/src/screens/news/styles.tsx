import { StyleSheet } from 'react-native';
import { COLOR_WHITE } from '../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../shared/constants/styles-global';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  wrapperPadding: {
    paddingHorizontal: MAIN_PADDING,
  },
  titleContainer: {
    marginBottom: 10,
  },
  item: {
    zIndex: 999,
    padding: 5,
    marginBottom: 10,
  },
});
