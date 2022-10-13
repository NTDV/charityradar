import { ScrollView, View } from 'react-native';

import { FeesFull } from '../../entities/fees/fees-full';
import { COLOR_WHITE } from '../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../shared/constants/styles-global';
import { useEffect, useState } from 'react';
import { AppNavigationProps } from '../../navigation';
import { FeesPreviewType } from '../home';
import { intervalToDuration } from 'date-fns';

export const FeesFullScreen = (appNavigation: AppNavigationProps) => {
  const [fees, setFees] = useState<FeesPreviewType | null>(null);
  const params = appNavigation.route.params;

  const getDeadline = (startDate: Date, endDate: Date) => {
    return intervalToDuration({ start: new Date(startDate), end: new Date(endDate) }).days;
  };

  useEffect(() => {
    if (params && params.fees) {
      setFees(params.fees);
    }
  }, []);

  return (
    <ScrollView style={{ flexGrow: 1, backgroundColor: COLOR_WHITE }}>
      <View style={{ flex: 1, padding: MAIN_PADDING }}>
        {fees !== null && (
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
        )}
      </View>
    </ScrollView>
  );
};
