import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';
import NowPlayingScreen from '../ui/screens/movie_tabs/NowPlayingScreen';
import PopularScreen from '../ui/screens/movie_tabs/PopularScreen';
import TopRatedScreen from '../ui/screens/movie_tabs/TopRatedScreen';
import UpcomingScreen from '../ui/screens/movie_tabs/UpcomingScreen';
import {ROUTES, SCREENS} from './routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonStateType} from '../types';
import {getRequestToken} from '../api/helper';
import {useSelector} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [isAuthInProgress, setIsAuthInProgress] = useState(false);

  const accountId = useSelector(
    (state: CommonStateType) => state.auth.accountId,
  );

  const navigation = useNavigation();

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

  const onPressSearch = () => {
    navigation.navigate(SCREENS.MOVIE_SEARCH_SCREEN);
  };

  const onPressFavorites = async () => {
    if (accountId) {
      navigation.navigate(SCREENS.FAVORITES_SCREEN);
    } else {
      setIsAuthInProgress(true);
      const requestToken = await getRequestToken();
      if (requestToken) {
        navigation.navigate(SCREENS.AUTHENTICATION_WEB_VIEW_SCREEN, {
          requestToken,
          isSourceFavoritesIcon: true,
        });
      }
      setIsAuthInProgress(false);
    }
  };

  const headerRight = ({tintColor}: {tintColor?: string}) => {
    return (
      <View style={styles.headerRightContainer}>
        <MaterialCommunityIcons
          name="movie-search-outline"
          size={24}
          color={tintColor}
          style={styles.searchIcon}
          onPress={onPressSearch}
        />
        {isAuthInProgress ? (
          <ActivityIndicator
            size={24}
            color={tintColor}
            style={styles.favouriteIcon}
          />
        ) : (
          <MaterialCommunityIcons
            name="heart-pulse"
            size={24}
            color={tintColor}
            style={styles.favouriteIcon}
            onPress={onPressFavorites}
          />
        )}
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTintColor: Colors.headerColor,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarInactiveTintColor: Colors.inactiveColor,
        tabBarActiveTintColor: Colors.colorAccentPrimary,
        headerRight: ({tintColor}) => headerRight({tintColor}),
      }}>
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
    paddingHorizontal: 8,
  },
  searchIcon: {
    paddingHorizontal: 8,
  },
  favouriteIcon: {
    paddingHorizontal: 8,
  },
});

export default TabNavigator;
