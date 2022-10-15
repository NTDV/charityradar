import { StyleSheet } from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GOLD,
  COLOR_GREY,
  COLOR_GREY_LIGHT,
  COLOR_WHITE,
} from '../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../shared/constants/styles-global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: MAIN_PADDING,
    backgroundColor: COLOR_WHITE,
  },
  name: {
    fontSize: 20,
    letterSpacing: 0.5,
    fontWeight: '500',
    opacity: 0.9,
    marginBottom: 10,
  },
  containerImg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 180,
    alignSelf: 'stretch',
    flex: 1,
  },
  img: {
    width: '100%',
    height: 180,
    borderRadius: 7,
  },
  coefficientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: COLOR_GREY_LIGHT,
    borderBottomWidth: 1,
  },
  coefficientTitle: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  coefficient: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR_GOLD,
  },
  reporting: {
    marginVertical: 30,
  },
  reportingTitle: {
    color: COLOR_BLACK,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  reportingText: {
    color: COLOR_BLACK,
    fontSize: 14,
    marginBottom: 15,
  },
  fees: {},
  feesTitle: {
    marginBottom: 15,
  },
  containerFees: {},
  itemFees: {
    padding: 5,
  },
  description: {
    marginBottom: 30,
  },
  descriptionTitle: {
    marginBottom: 10,
  },
  descriptionText: {
    color: COLOR_BLACK,
    textAlign: 'justify',
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: COLOR_WHITE,
    borderTopWidth: 1,
    borderTopColor: COLOR_GREY,
  },
  email: {
    fontSize: 14,
    fontWeight: '300',
    color: COLOR_BLACK,
    marginBottom: 15,
  },
});
