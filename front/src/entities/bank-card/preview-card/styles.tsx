import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_WHITE } from '../../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: COLOR_WHITE,
    fontSize: 24,
    marginLeft: 10,
  },
  subtitle: {
    color: COLOR_WHITE,
    fontSize: 18,
    opacity: 0.8,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLOR_WHITE,
    padding: 20,
    borderRadius: 7,
  },
  buttonName: {
    fontSize: 16,
    color: COLOR_PRIMARY,
    letterSpacing: 1,
  },
  balance: {
    color: COLOR_WHITE,
    fontWeight: 'bold',
    fontSize: 28,
  },
});
