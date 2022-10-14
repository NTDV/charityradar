import { Controller, useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ScrollView, Text, View } from 'react-native';

import { styles } from './styles';

import { KeyboardShift } from '../../shared/ui/keyboard-shift';
import { CustomTextInput } from '../../shared/ui/custom-text-input';
import {
  CVVMask,
  MMYYMask,
  validationSchemaCard,
  validationSchemaCardType,
} from './lib/validation-schema';
import { CustomButton } from '../../shared/ui/custom-button';
import MaskInput, { Masks } from 'react-native-mask-input';
import { COLOR_PLACEHOLDER } from '../../shared/constants/style-variables';
import { useEffect, useState } from 'react';
import { getCardInfo } from '../../shared/api/bank-card/get-card-info';
import { useAuth, UserType } from '../../shared/hooks/use-auth';
import { AppNavigationProps } from '../../navigation';
import { TYPE_PAYMENT } from '../../shared/constants/types';
import { payToFund } from '../../shared/api/bank-card/pay-to-fund';
import Toast from 'react-native-root-toast';
import { settingsToast } from '../../shared/constants/settings-toast';
import { payToFees } from '../../shared/api/bank-card/pay-to-fees';

export const BalanceIncrease = observer((appNavigation: AppNavigationProps) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const params = appNavigation.route.params;

  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchemaCard),
  });

  const onSubmit = async (value: validationSchemaCardType) => {
    setLoading(true);
    let balance = null;
    const id = params?.paramPayment?.id;

    // Пожертвование в фонд
    if (params?.paramPayment?.typePayment === TYPE_PAYMENT.fondDonation) {
      balance = await payToFund({
        token: user?.token,
        number: value.number,
        holder: value.personName,
        expire: value.mmYY,
        cvc: value.cvv,
        amount: value.money,
        fundId: id,
      });
    }

    // Оплата в сбор
    if (params?.paramPayment?.typePayment === TYPE_PAYMENT.feesDonation) {
      balance = await payToFees({
        token: user?.token,
        number: value.number,
        holder: value.personName,
        expire: value.mmYY,
        cvc: value.cvv,
        amount: value.money,
        feesId: id,
      });
    }

    // Успешно
    if (balance !== null) {
      Toast.show('Оплата прошла успешно', settingsToast);
      setError('');
      appNavigation.navigation.goBack();
    } else {
      setError('Реквизиты карты введены некорректно');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!!params?.title) {
      appNavigation.navigation.setOptions({ title: params.title });
    }

    if (user?.type === UserType.user) {
      (async () => {
        // Получаем данные карты пользователя
        const payload = await getCardInfo(user.token);

        // Пользователь имеет ВТБ id и карта найдена
        if (payload !== null) {
          setValue('number', payload.number);
          setValue('mmYY', payload.expire);
          setValue('personName', payload.holder);
        }
      })();
    }
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardShift>
        <ScrollView style={styles.wrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>По карте</Text>
            <View>
              <Controller
                control={control}
                name="number"
                render={({ field: { ref, onChange, onBlur, value } }) => (
                  <MaskInput
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Номер карты"
                    placeholderTextColor={COLOR_PLACEHOLDER}
                    mask={Masks.CREDIT_CARD}
                    keyboardType="numeric"
                    style={[
                      styles.cardInput,
                      errors?.['number']?.message ? styles.inputCustomError : {},
                    ]}
                  />
                )}
              />
            </View>
            <View>
              <Controller
                control={control}
                name="personName"
                render={({ field: { ref, onChange, onBlur, value } }) => (
                  <CustomTextInput
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    name=""
                    placeholder="ИМЯ ФАМИЛИЯ"
                    styles={[
                      styles.cardInput,
                      errors?.['personName']?.message ? styles.inputCustomError : {},
                    ]}
                    errorMessage={errors?.['personName']?.message}
                  />
                )}
              />
            </View>
            <View style={styles.row}>
              <Controller
                control={control}
                name="mmYY"
                render={({ field: { ref, onChange, onBlur, value } }) => (
                  <MaskInput
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="MM/YY"
                    placeholderTextColor={COLOR_PLACEHOLDER}
                    mask={MMYYMask}
                    keyboardType="numeric"
                    style={[
                      styles.cardInput,
                      { marginRight: 10 },
                      errors?.['mmYY']?.message ? styles.inputCustomError : {},
                    ]}
                  />
                )}
              />
              <Controller
                control={control}
                name="cvv"
                render={({ field: { ref, onChange, onBlur, value } }) => (
                  <MaskInput
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="CVV"
                    placeholderTextColor={COLOR_PLACEHOLDER}
                    mask={CVVMask}
                    keyboardType="numeric"
                    style={[
                      styles.cardInput,
                      { marginLeft: 10 },
                      errors?.['cvv']?.message ? styles.inputCustomError : {},
                    ]}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.money}>
            <Controller
              control={control}
              name="money"
              render={({ field: { ref, onChange, onBlur, value } }) => (
                <CustomTextInput
                  ref={ref}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  name="Сумма пополнения"
                  isRequired={true}
                  keyboardType="numeric"
                  placeholder="Введите сумму пополнения"
                  errorMessage={errors?.['money']?.message}
                />
              )}
            />
          </View>
        </ScrollView>
      </KeyboardShift>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.footer}>
        <CustomButton
          name="Пополнить баланс"
          onPress={handleSubmit(onSubmit)}
          primary={true}
          loading={loading}
        />
      </View>
    </View>
  );
});
