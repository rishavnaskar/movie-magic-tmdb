import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CommonStateType} from '../../../types';
import {SafeAreaView, StyleSheet} from 'react-native';
import MovieListView from '../../components/MovieListView';
import Colors from '../../../utils/colors';
import {topRatedMovieActions} from '../../../redux/action';

const TopRatedScreen = () => {
  const [page, setPage] = useState(1);

  const movieDataState = useSelector(
    (state: CommonStateType) => state.topRatedMovies,
  );

  const dispatch = useDispatch();

  const onEndReached = () => {
    if (
      movieDataState.data.results.length !==
        movieDataState.data.total_results &&
      page + 1 <= movieDataState.data.total_pages
    ) {
      dispatch(topRatedMovieActions.getData(page + 1));
      setPage(page + 1);
    }
  };

  useEffect(() => {
    dispatch(topRatedMovieActions.getData(page));
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

export default TopRatedScreen;
