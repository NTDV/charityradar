import { ScrollView, View } from 'react-native';

import { FeesFull } from '../../entities/fees/fees-full';
import { COLOR_WHITE } from '../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../shared/constants/styles-global';
import { useEffect, useState } from 'react';
import { AppNavigationProps } from '../../navigation';
import { FeesPreviewType } from '../home';
import { intervalToDuration } from 'date-fns';
import { styles } from './styles';
import { CustomButton } from '../../shared/ui/custom-button';
import { Donation } from '../../widgets/donation';
import { TYPE_PAYMENT } from '../../shared/constants/types';
import { useAuth, UserType } from '../../shared/hooks/use-auth';

export const FeesFullScreen = (appNavigation: AppNavigationProps) => {
  const { user } = useAuth();
  const [visibilityFeesModal, setVisibilityFeesModal] = useState(false);
  const [fees, setFees] = useState<FeesPreviewType | null>(null);
  const params = appNavigation.route.params;

  const openFeesModal = () => setVisibilityFeesModal(true);
  const closeFeesModal = () => setVisibilityFeesModal(false);

  const getDeadline = (startDate: Date, endDate: Date) => {
    return intervalToDuration({ start: new Date(startDate), end: new Date(endDate) }).days;
  };

  useEffect(() => {
    if (params && params.fees) {
      setFees(params.fees);
    }
  }, []);

  if (fees?.id === undefined) return <View />;

  return (
    <View style={{ flex: 1 }}>
      <Donation
        visibility={visibilityFeesModal}
        onClose={closeFeesModal}
        appNavigation={appNavigation}
        id={fees.id}
        typePayment={TYPE_PAYMENT.feesDonation}
      />
      <ScrollView style={{ flexGrow: 1, backgroundColor: COLOR_WHITE }}>
        <View style={{ flex: 1, padding: MAIN_PADDING }}>
          <FeesFull
            image={fees?.image}
            fundName={fees?.fund.name}
            coefficient={fees?.fund.rating}
            fundDescription={fees?.description}
            fundraising={{
              allMoney: fees.goal,
              currentMoney: fees.collected,
              deadline: getDeadline(fees.startDate, fees.endDate) ?? null,
            }}
          />
        </View>
      </ScrollView>
      {user?.type === UserType.user && (
        <View style={styles.footer}>
          <CustomButton name="Пожертвовать" onPress={openFeesModal} primary={true} />
        </View>
      )}
    </View>
  );
};
