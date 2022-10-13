import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLOR_GREY, COLOR_PRIMARY } from '../shared/constants/style-variables';

import { Home } from '../screens/home';
import { News } from '../screens/news';
import { Search } from '../screens/search';
import { PersonalCabinet } from '../screens/personal-cabinet';
import { AppNavigationProps } from './index';
import { FundAdmin } from '../screens/fund-admin';
import { useAuth, UserType } from '../shared/hooks/use-auth';

enum iconType {
  home = 'home',
  newspaperOutline = 'newspaper-outline',
  search = 'search',
  personOutline = 'person-outline',
  fundAdmin = 'grid-outline',
}

const Tab = createBottomTabNavigator();

/**
 * Компонент для Tab роутинга
 */

export const AppNavigation = (appNavigation: AppNavigationProps) => {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarIcon: ({ focused }) => {
          let name: iconType = iconType.home;

          if (route.name === 'Home') {
            name = iconType.home;
          }

          if (route.name === 'News') {
            name = iconType.newspaperOutline;
          }

          if (route.name === 'Search') {
            name = iconType.search;
          }

          if (route.name === 'FundAdmin') {
            name = iconType.fundAdmin;
          }

          if (route.name === 'PersonalCabinet') {
            name = iconType.personOutline;
          }

          return (
            <Ionicons
              size={25}
              name={name}
              style={{ color: focused ? COLOR_PRIMARY : COLOR_GREY }}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          let namePage = '';
          const { name } = route;

          if (name === 'Home') namePage = 'Главная';
          if (name === 'News') namePage = 'Новости';
          if (name === 'Search') namePage = 'Поиск';
          if (name === 'FundAdmin') namePage = 'Фонд';
          if (name === 'PersonalCabinet') namePage = 'Кабинет';

          return (
            <Text style={{ color: focused ? COLOR_PRIMARY : COLOR_GREY, fontSize: 10 }}>
              {namePage}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        children={(props) => <Home appNavigation={appNavigation} {...props} />}
      />
      <Tab.Screen
        name="News"
        children={(props) => <News appNavigation={appNavigation} {...props} />}
      />
      {/*<Tab.Screen name="Search" component={Search} />*/}
      {user?.type === UserType.fund && <Tab.Screen name="FundAdmin" component={FundAdmin} />}
      <Tab.Screen name="PersonalCabinet" component={PersonalCabinet} />
    </Tab.Navigator>
  );
};
