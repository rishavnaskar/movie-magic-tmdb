import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Colors from '../../utils/colors';
import MovieListView from '../components/MovieListView';
import {useSelector} from 'react-redux';
import {CommonStateType} from '../../types';
import {favoriteMoviesAction} from '../../redux/action';
import MovieListEmptyView from '../components/MovieListEmptyView';

const FavoritesScreen = () => {
  const movieDataState = useSelector(
    (state: CommonStateType) => state.favoriteMovies,
  );

  return (
    <SafeAreaView style={styles.container}>
      <MovieListView
        movieDataState={movieDataState}
        listEmptyComponent={
          <MovieListEmptyView subTitle="Try adding something to favorites..." />
        }
        movieAction={favoriteMoviesAction}
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

export default FavoritesScreen;
