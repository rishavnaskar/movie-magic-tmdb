import React from 'react';
import {useSelector} from 'react-redux';
import {CommonStateType} from '../../../types';
import {nowPlayingMovieActions} from '../../../redux/action';
import {SafeAreaView, StyleSheet} from 'react-native';
import Colors from '../../../utils/colors';
import MovieListView from '../../components/MovieListView';

const NowPlayingScreen = () => {
  const movieDataState = useSelector(
    (state: CommonStateType) => state.nowPlayingMovies,
  );

  return (
    <SafeAreaView style={styles.container}>
      <MovieListView
        movieDataState={movieDataState}
        movieAction={nowPlayingMovieActions}
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

export default NowPlayingScreen;
