import { View, Text } from 'react-native';

import { CustomModal } from '../../shared/ui/custom-modal';
import { CustomButton } from '../../shared/ui/custom-button';
import { AppNavigationProps } from '../../navigation';
import { TYPE_PAYMENT } from '../../shared/constants/types';
import { useEffect, useState } from 'react';
import { CustomTextInput } from '../../shared/ui/custom-text-input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { validationSchemaPayment } from './validation-schema';
import { payToBitFund } from '../../shared/api/bank-card/pay-to-bit-fund';
import { useAuth, UserType } from '../../shared/hooks/use-auth';
import { COLOR_ERROR } from '../../shared/constants/style-variables';
import { observer } from 'mobx-react';
import { bankCardStore } from '../../stores/bank-card-store';
import Toast from 'react-native-root-toast';
import { settingsToast } from '../../shared/constants/settings-toast';
import { payToBitFees } from '../../shared/api/bank-card/pay-to-bit-fees';
import { payToBitFeesFromFund } from '../../shared/api/bank-card/pay-to-bit-fees-from-fund';

type DonationProps = {
  visibility: boolean;
  onClose: () => void;
  appNavigation: AppNavigationProps;
  id: string | number;
  typePayment: TYPE_PAYMENT;
};

export const Donation = observer(
  ({ visibility, onClose, appNavigation, id, typePayment }: DonationProps) => {
    const { user } = useAuth();
    const [error, serError] = useState('');
    const [visiblePaymentBil, setVisiblePaymentBil] = useState(false);

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(validationSchemaPayment),
    });

    const openCardPayment = () => {
      appNavigation.navigation.push('BalanceIncrease', {
        title: `Оплата по карте`,
        paramPayment: { typePayment, id },
      });

      onClose();
    };

    const onSubmit = async (values: { amount: number }) => {
      // Если оплата по счету и оплата фонда
      if (typePayment === TYPE_PAYMENT.fondDonation && user?.type === UserType.user) {
        const payload = await payToBitFund({
          token: user?.token,
          amount: values.amount,
          fundId: id,
        });

        if (payload === null) {
          serError('Что-то пошло не так, повторите запрос');
        } else {
          bankCardStore.setDonations(payload[0]['Balance']);
          Toast.show('Транзакция прошла успешно', settingsToast);
          serError('');
          onClose();
        }
      }

      if (typePayment === TYPE_PAYMENT.feesDonation && user?.type === UserType.user) {
        const payload = await payToBitFees({
          token: user?.token,
          amount: values.amount,
          feesId: id,
        });

        if (payload === null) {
          serError('Что-то пошло не так, повторите запрос');
        } else {
          Toast.show('Транзакция прошла успешно', settingsToast);
          serError('');
          onClose();
        }
      }

      if (typePayment === TYPE_PAYMENT.feesDonation && user?.type === UserType.fund) {
        const payload = await payToBitFeesFromFund({
          token: user?.token,
          amount: values.amount,
          feesId: id,
        });

        if (payload === null) {
          serError('Что-то пошло не так, повторите запрос');
        } else {
          bankCardStore.setDonations(payload);
          Toast.show('Транзакция прошла успешно', settingsToast);
          serError('');
          onClose();
        }
      }
    };

    useEffect(() => {
      setVisiblePaymentBil(false);
      setValue('amount', 0);
    }, [visibility]);

    return (
      <CustomModal title="Выберите способ оплаты" visibility={visibility} onClose={onClose}>
        <View>
          {!visiblePaymentBil && (
            <>
              {user?.type === UserType.user && (
                <CustomButton
                  name="Оплата банковской картой"
                  onPress={openCardPayment}
                  primary={true}
                  stylesButton={{ marginBottom: 15 }}
                />
              )}
              {id !== undefined && (
                <CustomButton
                  name="Оплата по счету"
                  onPress={() => setVisiblePaymentBil(true)}
                  primary={true}
                />
              )}
            </>
          )}

          {visiblePaymentBil && (
            <>
              <Controller
                control={control}
                name="amount"
                render={({ field: { ref, onChange, onBlur, value } }) => (
                  <CustomTextInput
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    isRequired={true}
                    name="Сумма"
                    placeholder="Введите сумму"
                    keyboardType="numeric"
                    styles={[
                      { marginBottom: 15 },
                      errors?.['amount']?.message && {
                        borderBottomColor: COLOR_ERROR,
                      },
                    ]}
                  />
                )}
              />
              {!!error && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 15,
                    color: COLOR_ERROR,
                    textAlign: 'center',
                  }}
                >
                  {error}
                </Text>
              )}
              <CustomButton name="Оплатить" onPress={handleSubmit(onSubmit)} primary={true} />
            </>
          )}
        </View>
      </CustomModal>
    );
  },
);
