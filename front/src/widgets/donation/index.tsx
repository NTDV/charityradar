import { View } from 'react-native';

import { CustomModal } from '../../shared/ui/custom-modal';
import { CustomButton } from '../../shared/ui/custom-button';
import { AppNavigationProps } from '../../navigation';
import { TYPE_PAYMENT } from '../../shared/constants/types';

type DonationProps = {
  visibility: boolean;
  onClose: () => void;
  appNavigation: AppNavigationProps;
  id: string | number;
  typePayment: TYPE_PAYMENT;
};

export const Donation = ({
  visibility,
  onClose,
  appNavigation,
  id,
  typePayment,
}: DonationProps) => {
  const openCardPayment = () => {
    appNavigation.navigation.push('BalanceIncrease', {
      title: `Оплата по карте`,
      paramPayment: { typePayment, id },
    });

    onClose();
  };

  return (
    <CustomModal title="Выберите способ оплаты" visibility={visibility} onClose={onClose}>
      <View>
        <CustomButton
          name="Оплата банковской картой"
          onPress={openCardPayment}
          primary={true}
          stylesButton={{ marginBottom: 15 }}
        />
        <CustomButton name="Оплата по счету" onPress={() => {}} primary={true} />
      </View>
    </CustomModal>
  );
};
