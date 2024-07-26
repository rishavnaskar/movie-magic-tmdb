import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';
import NowPlayingScreen from '../ui/screens/movie_tabs/NowPlayingScreen';
import PopularScreen from '../ui/screens/movie_tabs/PopularScreen';
import TopRatedScreen from '../ui/screens/movie_tabs/TopRatedScreen';
import UpcomingScreen from '../ui/screens/movie_tabs/UpcomingScreen';
import {ROUTES, SCREENS} from './routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NavigationProp,
  NavigationState,
  useNavigation,
} from '@react-navigation/native';

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const nowPlayingMoviesTabBarIcon = (props: TabBarIconProps) => (
    <MaterialIcon name="play-circle" {...props} />
  );
  const popularMoviesTabBarIcon = (props: TabBarIconProps) => (
    <MaterialCommunityIcon name="party-popper" {...props} />
  );
  const topRatedMoviesTabBarIcon = (props: TabBarIconProps) => (
    <MaterialCommunityIcon name="progress-star" {...props} />
  );
  const upcomingMoviesTabBarIcon = (props: TabBarIconProps) => (
    <MaterialIcon name="fiber-new" {...props} />
  );

  const onPressSearch = (
    navigation: Omit<
      NavigationProp<ReactNavigation.RootParamList>,
      'getState'
    > & {
      getState(): NavigationState | undefined;
    },
  ) => {
    navigation.navigate(SCREENS.MOVIE_SEARCH_SCREEN);
  };

  const headerRight = ({
    tintColor,
    navigation,
  }: {
    tintColor?: string;
    navigation: any;
  }) => {
    return (
      <View style={styles.headerRightContainer}>
        <MaterialCommunityIcons
          name="movie-search-outline"
          size={24}
          color={tintColor}
          onPress={() => onPressSearch(navigation)}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTintColor: Colors.headerColor,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarInactiveTintColor: Colors.inactiveColor,
        tabBarActiveTintColor: Colors.colorAccentPrimary,
        headerRight: ({tintColor}) => headerRight({navigation, tintColor}),
      })}>
      <Tab.Screen
        options={{tabBarIcon: nowPlayingMoviesTabBarIcon}}
        name={ROUTES.NOW_PLAYING_MOVIES_TAB}
        component={NowPlayingScreen}
      />
      <Tab.Screen
        options={{tabBarIcon: popularMoviesTabBarIcon}}
        name={ROUTES.POPULAR_MOVIES_TAB}
        component={PopularScreen}
      />
      <Tab.Screen
        options={{tabBarIcon: topRatedMoviesTabBarIcon}}
        name={ROUTES.TOP_RATED_MOVIES_TAB}
        component={TopRatedScreen}
      />
      <Tab.Screen
        options={{tabBarIcon: upcomingMoviesTabBarIcon}}
        name={ROUTES.UPCOMING_MOVIES_TAB}
        component={UpcomingScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.colorAccentSecondary,
  },
  headerTitleStyle: {
    color: Colors.headerColor,
    textTransform: 'capitalize',
  },
  tabBarLabelStyle: {
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tabBarStyle: {
    backgroundColor: Colors.colorAccentSecondary,
    height: 60,
  },
  tabBarIconStyle: {
    color: Colors.colorAccentPrimary,
  },
  headerRightContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default TabNavigator;
