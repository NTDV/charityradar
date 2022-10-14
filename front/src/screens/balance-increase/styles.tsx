import { Dimensions, StyleSheet } from 'react-native';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_GREY,
  COLOR_WHITE,
} from '../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../shared/constants/styles-global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: COLOR_WHITE,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: MAIN_PADDING,
    marginBottom: 20,
  },
  card: {
    marginTop: 15,
    backgroundColor: COLOR_WHITE,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },
  cardInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLOR_GREY,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footer: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderTopColor: COLOR_GREY,
    borderTopWidth: 1,
  },

  inputCustomError: {
    borderColor: COLOR_ERROR,
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 5,
    color: COLOR_ERROR,
  },
  error: {
    fontSize: 12,
    marginBottom: 15,
    color: COLOR_ERROR,
    textAlign: 'center',
  },
  name: {
    fontSize: 16,
    color: COLOR_BLACK,
    opacity: 0.7,
    marginBottom: 6,
  },
  money: {
    marginTop: 50,
  },
});
