import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY } from '../../constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameLink: {
    color: COLOR_PRIMARY,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
