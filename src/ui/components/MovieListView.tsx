import React, {ReactElement, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Colors from '../../utils/colors';
import {MovieStateType, MovieType} from '../../types';
import {FlashList} from '@shopify/flash-list';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {MovieActionType} from '../../redux/action';
import {useDispatch} from 'react-redux';
import MovieListItem from './MovieListItem';

interface Props {
  movieDataState: MovieStateType;
  movieAction: MovieActionType;
  listHeaderComponent?: ReactElement;
  listEmptyComponent?: ReactElement;
  shouldFetchDataInitially?: boolean;
}

const MovieListView = ({
  movieDataState,
  movieAction,
  listHeaderComponent,
  listEmptyComponent,
  shouldFetchDataInitially = true,
}: Props) => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const onEndReached = () => {
    if (
      movieDataState.data.results.length !==
        movieDataState.data.total_results &&
      page + 1 <= movieDataState.data.total_pages
    ) {
      dispatch(movieAction.getData(page + 1));
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (shouldFetchDataInitially) {
      dispatch(movieAction.getData(page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieAction, shouldFetchDataInitially]);

  const renderLoader = () => (
    <ActivityIndicator
      size={60}
      color={Colors.colorAccentPrimary}
      style={styles.loader}
    />
  );

  const renderErrorContainer = () => (
    <View style={styles.errorContainer}>
      <MaterialIcon
        name="report-gmailerrorred"
        size={80}
        color={Colors.error}
      />
      <Text style={styles.errorText}>
        {movieDataState.error?.message ??
          'Something went wrong. Please try again later'}
      </Text>
    </View>
  );

  const renderItem = ({item}: {item: MovieType}) => (
    <MovieListItem item={item} />
  );

  const keyExtractor = (item: MovieType) => item.id.toString();

  const renderMovieList = () => (
    <FlashList
      data={movieDataState.data.results}
      estimatedItemSize={140}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={listHeaderComponent}
      ListEmptyComponent={listEmptyComponent}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
    />
  );

  if (movieDataState.data.page < 1 && movieDataState.loading) {
    return renderLoader();
  }
  if (movieDataState.error) {
    return renderErrorContainer();
  }
  return renderMovieList();
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: Colors.textColor,
    marginTop: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default MovieListView;
