import { RefreshControl, ScrollView, View } from 'react-native';

import { FeesFull } from '../../entities/fees/fees-full';
import { COLOR_WHITE } from '../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../shared/constants/styles-global';
import { useCallback, useEffect, useState } from 'react';
import { AppNavigationProps } from '../../navigation';
import { intervalToDuration } from 'date-fns';
import { styles } from './styles';
import { CustomButton } from '../../shared/ui/custom-button';
import { Donation } from '../../widgets/donation';
import { TYPE_PAYMENT } from '../../shared/constants/types';
import { useAuth, UserType } from '../../shared/hooks/use-auth';
import { FeesType, getFeesById } from '../../shared/api/fund/get-fees-by-id';
import { useFocusEffect } from '@react-navigation/native';

export const FeesFullScreen = (appNavigation: AppNavigationProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const [visibilityFeesModal, setVisibilityFeesModal] = useState(false);
  const [fees, setFees] = useState<FeesType | null>(null);
  const [fund, setFund] = useState(null);
  const params = appNavigation.route.params;

  const openFeesModal = () => setVisibilityFeesModal(true);
  const closeFeesModal = () => setVisibilityFeesModal(false);

  const getDeadline = (startDate: Date, endDate: Date) => {
    return intervalToDuration({ start: new Date(startDate), end: new Date(endDate) }).days;
  };

  const getData = async () => {
    if (params?.id !== undefined) {
      const payload = await getFeesById(params.id);
      setFees(payload);
      setFund({ name: params.fondName, rating: params.fondRating });
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await getData();
      })();
    }, []),
  );

  if (fees?.id === undefined || fund === null)
    return <View style={{ flex: 1, backgroundColor: COLOR_WHITE }} />;

  return (
    <View style={{ flex: 1 }}>
      <Donation
        visibility={visibilityFeesModal}
        onClose={closeFeesModal}
        appNavigation={appNavigation}
        id={fees.id}
        typePayment={TYPE_PAYMENT.feesDonation}
      />
      <ScrollView
        style={{ flexGrow: 1, backgroundColor: COLOR_WHITE }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={{ flex: 1, padding: MAIN_PADDING }}>
          <FeesFull
            image={fees?.image}
            fundName={fund.name}
            fundDescription={fees?.description}
            fundraising={{
              allMoney: fees.goal,
              currentMoney: fees.collected,
              deadline: getDeadline(fees.startDate, fees.endDate) ?? null,
            }}
          />
        </View>
      </ScrollView>
      {user?.type !== UserType.guest && (
        <View style={styles.footer}>
          <CustomButton name="Пожертвовать" onPress={openFeesModal} primary={true} />
        </View>
      )}
    </View>
  );
};
