import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY } from '@shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: COLOR_PRIMARY,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
  },
  leftColumn: {},
  rightColumn: {},
  header: {},
});
