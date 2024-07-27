import React, {ReactElement, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../../utils/colors';
import {CommonStateType, MovieStateType, MovieType} from '../../types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {MovieActionType} from '../../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import MovieListItem from './MovieListItem';

interface Props {
  movieDataState: MovieStateType;
  movieAction: MovieActionType;
  shouldFetchDataInitially?: boolean;
  debouncedSearchTextRef?: React.MutableRefObject<string>;
  listHeaderComponent?: () => ReactElement;
}

const MovieListView = ({
  movieDataState,
  movieAction,
  shouldFetchDataInitially = true,
  debouncedSearchTextRef,
  listHeaderComponent,
}: Props) => {
  const [page, setPage] = useState(1);

  const accountId = useSelector(
    (state: CommonStateType) => state.auth.accountId,
  );

  const dispatch = useDispatch();

  const getData = (selectedPageNumber: number) => {
    dispatch(
      movieAction.getData({
        page: selectedPageNumber,
        ...(debouncedSearchTextRef?.current
          ? {query: debouncedSearchTextRef.current}
          : {}),
        ...(accountId ? {accountId} : {}),
      }),
    );
  };

  const onEndReached = () => {
    if (
      movieDataState.data.results.length !==
        movieDataState.data.total_results &&
      page + 1 <= movieDataState.data.total_pages
    ) {
      getData(page + 1);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (shouldFetchDataInitially) {
      getData(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieAction, shouldFetchDataInitially]);

  const renderHeaderComponent = () => {
    return (
      <>
        {listHeaderComponent?.()}
        {movieDataState.data.results.length > 0 ? (
          <Text style={styles.longPressHintText}>
            Long press on a movie to add it to favorites!
          </Text>
        ) : null}
      </>
    );
  };

  const renderEmptyView = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Couldn't find any movies on this!</Text>
      <Text style={styles.emptySubtitle}>Please try again...</Text>
    </View>
  );

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
    <MovieListItem item={item} accountId={accountId} />
  );

  const keyExtractor = (item: MovieType) => item.id.toString();

  const renderMovieList = () => (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={
            movieDataState.loading && movieDataState.data.results.length > 0
          }
          progressBackgroundColor={Colors.cardBackground}
          colors={[Colors.colorAccentPrimary, Colors.colorAccentPrimary]}
        />
      }
      data={movieDataState.data.results}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={renderHeaderComponent()}
      ListEmptyComponent={renderEmptyView()}
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
    flexGrow: 1,
  },
  longPressHintText: {
    color: Colors.subTextColor,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 16,
  },
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

export default MovieListView;
