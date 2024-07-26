import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './tabs';
import {SCREENS} from './routes';
import MovieItemScreen from '../ui/screens/MovieItemScreen';
import {StyleSheet} from 'react-native';
import Colors from '../utils/colors';
import {MovieType} from '../types';

const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
      }}>
      <Stack.Screen
        name={SCREENS.TAB_SCREEN}
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.MOVIE_ITEM_SCREEN}
        component={MovieItemScreen}
        options={{
          headerTitle: '',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTintColor: Colors.headerColor,
        }}
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
