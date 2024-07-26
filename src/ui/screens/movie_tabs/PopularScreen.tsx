import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Colors from '../../../utils/colors';
import MovieListView from '../../components/MovieListView';
import {useSelector} from 'react-redux';
import {CommonStateType} from '../../../types';
import {popularMovieActions} from '../../../redux/action';

const PopularScreen = () => {
  const movieDataState = useSelector(
    (state: CommonStateType) => state.popularMovies,
  );

  return (
    <SafeAreaView style={styles.container}>
      <MovieListView
        movieDataState={movieDataState}
        movieAction={popularMovieActions}
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

export default PopularScreen;
