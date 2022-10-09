import { Dimensions, StyleSheet } from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GREY,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get('window').height,
    backgroundColor: COLOR_WHITE,
  },
  container: {
    flex: 1,
  },
  row: {
    marginBottom: 30,
  },
  title: {
    fontWeight: '500',
    fontSize: 22,
    marginTop: 15,
    marginBottom: 25,
    color: COLOR_BLACK,
  },
  subtitle: {
    marginBottom: 15,
  },
  grayColor: {
    fontSize: 16,
    color: COLOR_GREY,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  buttonsRow: {
    marginBottom: 15,
  },
  additionally: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  additionallyText: {
    color: COLOR_GREY,
    fontSize: 14,
  },
  additionallyLine: {
    width: '40%',
    height: 1,
    backgroundColor: COLOR_GREY,
  },
  text: {
    fontSize: 14,
    color: COLOR_BLACK,
    textAlign: 'center',
  },
  textLink: {
    fontSize: 14,
    color: COLOR_PRIMARY,
    textDecorationLine: 'underline',
  },
  textForgotPassword: {
    marginTop: 10,
    textAlign: 'center',
  },

  modalText: {
    textAlign: 'justify',
    marginBottom: 15,
  },
});
