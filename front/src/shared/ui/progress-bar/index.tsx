import { View, Text } from 'react-native';

import { styles } from './styles';
import { declOfNum } from '../../utils/decl-of-num';
import { numberWithSpaces } from '../../utils/number-with-spaces';
import { useEffect, useState } from 'react';

type ProgressBarProps = {
  deadline: number | null;
  allMoney: number;
  currentMoney: number;
};

/**
 * Компонент, ProgressBar для сбора
 * @param deadline - кол-во дней до окончания сбора (если 0, то менее 1 дня)
 * @param allMoney - сколько необходимо собрать денежных средств
 * @param currentMoney - сколько денежных средств собрано на данный момент
 */

export const ProgressBar = ({ deadline, allMoney, currentMoney }: ProgressBarProps) => {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const percent = parseInt(((currentMoney / allMoney) * 100).toString());
    setPercent(percent);
  }, [allMoney, currentMoney]);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progress}>
          <View style={[styles.progressCurrent, { width: `${percent >= 100 ? 100 : percent}%` }]} />
        </View>
        <Text style={styles.percent}>{percent}%</Text>
      </View>
      <Text style={styles.currentMoney}>
        {numberWithSpaces(currentMoney)} ₽ / {numberWithSpaces(allMoney)} ₽
      </Text>
      {deadline === null ? (
        <Text style={styles.deadline}>Не установлен период</Text>
      ) : (
        <Text style={styles.deadline}>
          Осталось {`${deadline} ${declOfNum(deadline, ['день', 'дня', 'дней'])}`}
        </Text>
      )}
    </View>
  );
};
