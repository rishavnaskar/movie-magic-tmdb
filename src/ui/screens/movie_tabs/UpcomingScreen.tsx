import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CommonStateType} from '../../../types';
import {popularMovieActions} from '../../../redux/action';
import {SafeAreaView, StyleSheet} from 'react-native';
import MovieListView from '../../components/MovieListView';
import Colors from '../../../utils/colors';

const UpcomingScreen = () => {
  const [page, setPage] = useState(1);

  const movieDataState = useSelector(
    (state: CommonStateType) => state.popularMovies,
  );

  const dispatch = useDispatch();

  const onEndReached = () => {
    if (
      movieDataState.data.results.length !==
        movieDataState.data.total_results &&
      page + 1 <= movieDataState.data.total_pages
    ) {
      dispatch(popularMovieActions.getData(page + 1));
      setPage(page + 1);
    }
  };

  useEffect(() => {
    dispatch(popularMovieActions.getData(page));
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

export default UpcomingScreen;
