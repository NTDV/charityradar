import { StyleSheet } from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GOLD,
  COLOR_GREY_LIGHT,
  COLOR_WHITE,
} from '../../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {
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
  },
  img: {
    width: '100%',
    height: 150,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLOR_GREY_LIGHT,
    borderBottomWidth: 1,
  },
  containerImg: {},
  coefficientTitle: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  coefficient: {
    fontSize: 16,
    color: COLOR_GOLD,
    fontWeight: 'bold',
  },
  info: {
    marginVertical: 10,
  },
  nameFund: {
    color: COLOR_BLACK,
    opacity: 0.9,
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: COLOR_GREY_LIGHT,
    borderBottomWidth: 1,
  },
  headerFundName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  headerFundDescription: {
    fontSize: 12,
    color: COLOR_BLACK,
    opacity: 0.5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: COLOR_BLACK,
    opacity: 0.7,
    marginLeft: 20,
  },
  newsText: {
    padding: 10,
    paddingTop: 0,
    color: COLOR_BLACK,
    textAlign: 'justify',
  },
});
