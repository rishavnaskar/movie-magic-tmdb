import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CommonStateType} from '../../../types';
import {nowPlayingMovieActions} from '../../../redux/action';
import {SafeAreaView, StyleSheet} from 'react-native';
import Colors from '../../../utils/colors';
import MovieListView from '../../components/MovieListView';

const NowPlayingScreen = () => {
  const [page, setPage] = useState(1);

  const movieDataState = useSelector(
    (state: CommonStateType) => state.nowPlayingMovies,
  );

  const dispatch = useDispatch();

  const onEndReached = () => {
    if (
      movieDataState.data.results.length !==
        movieDataState.data.total_results &&
      page + 1 <= movieDataState.data.total_pages
    ) {
      dispatch(nowPlayingMovieActions.getData(page + 1));
      setPage(page + 1);
    }
  };

  useEffect(() => {
    dispatch(nowPlayingMovieActions.getData(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MovieListView
        movieDataState={movieDataState}
        onEndReached={onEndReached}
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
