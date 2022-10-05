import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '@shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  primaryColor: {
    color: COLOR_PRIMARY,
    fontWeight: 'bold',
    fontSize: 20,
  },
  secondaryColor: {
    color: COLOR_SECONDARY,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
