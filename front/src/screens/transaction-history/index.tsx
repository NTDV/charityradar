import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { styles } from './styles';

import { stylesGlobal } from '../../shared/constants/styles-global';
import { AppNavigationProps } from '../../navigation';
import { getTransaction } from '../../shared/api/fund/get-transaction';

export const TransactionHistory = (appNavigation: AppNavigationProps) => {
  const [data, setData] = useState(null);
  const params = appNavigation.route.params;

  const getTransactionData = async () => {
    if (params.fundId !== undefined) {
      const payload = await getTransaction(params.fundId);
      console.log(payload);
    }
  };

  useEffect(() => {
    (async () => {
      await getTransactionData();
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.wrapper, stylesGlobal.mainContainer]}>
        <View style={styles.transactions}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsMonth}>Сентябрь</Text>
            <Text style={styles.transactionsAdd}>1 234 567 ₽</Text>
            <Text style={styles.transactionsMinus}>89 012 ₽</Text>
          </View>
          <View style={styles.transactionsContainer}>
            <View style={styles.transaction}>
              <View style={styles.box}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>CR</Text>
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>ЕАПТЕКА</Text>
                  <Text style={styles.transactionSmallText}>Аптека</Text>
                </View>
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionName}>15 000 ₽</Text>
                <Text style={styles.transactionSmallText}>29.09.2022</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
