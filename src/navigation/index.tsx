import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './tabs';
import {SCREENS} from './routes';
import MovieItemScreen from '../ui/screens/MovieItemScreen';
import {StyleSheet} from 'react-native';
import Colors from '../utils/colors';
import MovieSearchScreen from '../ui/screens/MovieSearchScreen';
import MovieAuthWebViewScreen from '../ui/screens/MovieAuthWebViewScreen';
import FavoritesScreen from '../ui/screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTintColor: Colors.headerColor,
      }}>
      <Stack.Screen
        name={SCREENS.TAB_SCREEN}
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.MOVIE_ITEM_SCREEN}
        component={MovieItemScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={SCREENS.MOVIE_SEARCH_SCREEN}
        component={MovieSearchScreen}
        options={{
          headerTitle: 'Search Movies',
        }}
      />
      <Stack.Screen
        name={SCREENS.AUTHENTICATION_WEB_VIEW_SCREEN}
        component={MovieAuthWebViewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.FAVORITES_SCREEN}
        component={FavoritesScreen}
        options={{headerTitle: 'Favorites'}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.colorAccentSecondary,
  },
  headerTitleStyle: {
    color: Colors.headerColor,
    textTransform: 'capitalize',
    textDecorationLine: 'line-through',
  },
});

export default BottomTabs;
