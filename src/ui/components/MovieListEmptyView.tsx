import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../utils/colors';

interface Props {
  subTitle: string;
}

const MovieListEmptyView = ({subTitle}: Props) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Couldn't find any movies on this!</Text>
      <Text style={styles.emptySubtitle}>{subTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyTitle: {
    color: Colors.subTextColor,
    textAlign: 'center',
    fontSize: 20,
  },
  emptySubtitle: {
    color: Colors.subTextColor,
    fontSize: 16,
    marginTop: 8,
  },
});

export default MovieListEmptyView;
