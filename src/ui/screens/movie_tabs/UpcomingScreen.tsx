import React from 'react';
import {useSelector} from 'react-redux';
import {CommonStateType} from '../../../types';
import {popularMovieActions} from '../../../redux/action';
import {SafeAreaView, StyleSheet} from 'react-native';
import MovieListView from '../../components/MovieListView';
import Colors from '../../../utils/colors';

const UpcomingScreen = () => {
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

export default UpcomingScreen;
