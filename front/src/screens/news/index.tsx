import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { styles } from './styles';

import { HeaderLogo } from '../../widgets/header';
import { NewsPreview } from '../../entities/news';
import { TitleMore } from '../../shared/ui/title-more';
import { getAllNews, NewsType } from '../../shared/api/news/get-all-news';
import { getFundById } from '../../shared/api/fund/get-fund-by-id';
import { AppNavigationProps } from '../../navigation';

export interface NewsWithFundType extends NewsType {
  fundName: string;
  rating: number | null;
}

export const News = ({ appNavigation }: { appNavigation: AppNavigationProps }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [newsList, setNewsList] = useState<NewsWithFundType[]>([]);

  const openFund = (id: string | number) => {
    appNavigation.navigation.push('FundScreen');
  };

  const setListHandler = async () => {
    const newsWithFundList: NewsWithFundType[] = [];
    const newsList = await getAllNews();

    for (let i = 0; i < newsList.length; i++) {
      const news = newsList[i];
      const fund = await getFundById(news.fundId);
      newsWithFundList.push({ ...news, fundName: fund.name, rating: fund.rating });
    }

    setNewsList(newsWithFundList);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await setListHandler();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    (async () => {
      await setListHandler();
    })();
  }, []);

  return (
    <View style={styles.wrapper}>
      <HeaderLogo />
      <FlatList
        ListHeaderComponent={
          <View style={styles.titleContainer}>
            <TitleMore title="Новостная лента" />
          </View>
        }
        data={newsList}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <NewsPreview {...item} openFund={openFund} />
          </View>
        )}
        style={styles.wrapperPadding}
        initialNumToRender={3}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};
