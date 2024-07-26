import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {CommonStateType} from '../../types';
import MovieListView from '../components/MovieListView';
import {searchMovieActions} from '../../redux/action';
import {debounce} from 'lodash';

const MovieSearchScreen = () => {
  const [searchText, setSearchText] = useState('');

  const movieDataState = useSelector(
    (state: CommonStateType) => state.searchedMovies,
  );

  const dispatch = useDispatch();

  const searchData = (query: string) => {
    dispatch(searchMovieActions.getData(1, query));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getBebouncedSearch = useCallback(debounce(searchData, 400), []);

  const onChangeText = (val: string) => {
    setSearchText(val);
    getBebouncedSearch(val);
  };

  const renderSearchBox = () => (
    <TextInput
      value={searchText}
      onChangeText={onChangeText}
      placeholder="Search movies..."
      placeholderTextColor={Colors.subTextColor}
      style={styles.searchContainer}
      autoFocus={true}
    />
  );

  const renderSearchEmptyView = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Couldn't find any movies on this!</Text>
      <Text style={styles.emptySubtitle}>Try searching something else...</Text>
    </View>
  );

  useEffect(() => {
    return () => {
      dispatch(searchMovieActions.resetData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MovieListView
        movieDataState={movieDataState}
        listHeaderComponent={renderSearchBox()}
        listEmptyComponent={renderSearchEmptyView()}
        movieAction={searchMovieActions}
        shouldFetchDataInitially={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  searchContainer: {
    backgroundColor: Colors.cardBackground,
    marginVertical: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.textColor,
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

export default MovieSearchScreen;
