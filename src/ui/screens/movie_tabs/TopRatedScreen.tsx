import React from 'react';
import {useSelector} from 'react-redux';
import {CommonStateType} from '../../../types';
import {SafeAreaView, StyleSheet} from 'react-native';
import MovieListView from '../../components/MovieListView';
import Colors from '../../../utils/colors';
import {topRatedMovieActions} from '../../../redux/action';

const TopRatedScreen = () => {
  const movieDataState = useSelector(
    (state: CommonStateType) => state.topRatedMovies,
  );

  return (
    <SafeAreaView style={styles.container}>
      <MovieListView
        movieDataState={movieDataState}
        movieAction={topRatedMovieActions}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});

export default TopRatedScreen;
