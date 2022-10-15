import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { styles } from './styles';

import { stylesGlobal } from '../../shared/constants/styles-global';
import { AppNavigationProps } from '../../navigation';
import { getTransaction } from '../../shared/api/fund/get-transaction';
import { numberWithSpaces } from '../../shared/utils/number-with-spaces';
import { COLOR_ERROR } from '../../shared/constants/style-variables';

export const TransactionHistory = (appNavigation: AppNavigationProps) => {
  const [data, setData] = useState(null);
  const params = appNavigation.route.params;

  const getTransactionData = async () => {
    if (params.fundId !== undefined) {
      const payload = await getTransaction(params.fundId);
      setData(payload);
    }
  };

  const createAvatar = (type: string) => {
    if (type === 'REFILL') {
      return (
        <View style={styles.logo}>
          <Text style={styles.logoText}>+</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.logo]}>
          <Text style={[styles.logoText, { color: COLOR_ERROR }]}>-</Text>
        </View>
      );
    }
  };

  useEffect(() => {
    (async () => {
      await getTransactionData();
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        ListEmptyComponent={<Text style={styles.empty}>Данные не найдены</Text>}
        renderItem={({ item }) => (
          <View style={styles.transactions}>
            <View style={styles.transactionsHeader}>
              <Text style={styles.transactionsMonth}>{item.month}</Text>
              <Text style={styles.transactionsAdd}>{numberWithSpaces(item.fills)} ₽</Text>
              <Text style={styles.transactionsMinus}>{numberWithSpaces(item.expense)} ₽</Text>
            </View>
            {item.transactions.map((transaction, index) => (
              <View key={index} style={styles.transactionsContainer}>
                <View style={styles.transaction}>
                  <View style={styles.box}>
                    {createAvatar(transaction.type)}
                    <View style={styles.transactionInfo}>
                      <Text style={[styles.transactionName, styles.transactionNameSmall]}>
                        {transaction.name}
                      </Text>
                      <Text style={styles.transactionSmallText}>{transaction.category}</Text>
                    </View>
                  </View>
                  <View style={[styles.transactionInfo, styles.transactionInfoRight]}>
                    <Text style={styles.transactionName}>
                      {numberWithSpaces(parseInt(transaction.amount))} ₽
                    </Text>
                    <Text style={styles.transactionSmallText}>{transaction.date}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
        initialNumToRender={3}
        style={[styles.wrapper, stylesGlobal.mainContainer]}
      />
    </View>
  );
};
