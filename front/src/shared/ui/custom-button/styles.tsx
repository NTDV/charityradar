import { StyleSheet } from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GREY,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR_GREY,
  },
  rectContainer: {
    borderRadius: 8,
  },
  primaryContainer: {
    backgroundColor: COLOR_PRIMARY,
    borderColor: COLOR_PRIMARY,
  },
  namePrimary: {
    color: COLOR_WHITE,
  },
  primaryContainerPressed: {
    opacity: 0.8,
  },
  containerPressed: {
    borderColor: COLOR_PRIMARY,
  },
  iconContainer: {
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    color: COLOR_BLACK,
  },
});
