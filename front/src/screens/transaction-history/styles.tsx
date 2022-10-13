import { StyleSheet } from 'react-native';
import {
  COLOR_ERROR,
  COLOR_GREY,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  rowCard: {
    marginTop: 15,
  },
  rowSection: {
    marginBottom: 30,
  },
  listContainer: {
    marginTop: 15,
  },
  transactions: {},
  transactionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  transactionsMonth: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionsAdd: {
    fontSize: 16,
    fontWeight: '500',
    color: COLOR_PRIMARY,
  },
  transactionsMinus: {
    fontSize: 16,
    fontWeight: '500',
    color: COLOR_ERROR,
  },
  transactionsContainer: {
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
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionInfo: {
    justifyContent: 'center',
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 3,
  },
  transactionSmallText: {
    fontSize: 12,
    color: COLOR_GREY,
  },
  logo: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLOR_GREY,
    marginRight: 15,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLOR_PRIMARY,
  },
});
