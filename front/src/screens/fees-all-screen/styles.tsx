import { StyleSheet } from 'react-native';
import { COLOR_WHITE } from '../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../shared/constants/styles-global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  section: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  containerTitle: {
    padding: MAIN_PADDING,
    marginBottom: 5,
  },
  item: {
    padding: 5,
    marginRight: 10,
  },
  itemVertical: {
    marginRight: 0,
  },
});
