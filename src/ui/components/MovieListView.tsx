import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../utils/colors';
import {MovieStateType, MovieType} from '../../types';
import {getPostImageUrl} from '../../utils/helper';
import {FlashList} from '@shopify/flash-list';
import FontIsto from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  movieDataState: MovieStateType;
  onEndReached: () => void;
}

const MovieListView = ({movieDataState, onEndReached}: Props) => {
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

  const renderMovieList = () => {
    const renderItem = ({item}: {item: MovieType}) => {
      const imgSource: ImageSourcePropType = {
        uri: getPostImageUrl(item.poster_path, 'small'),
      };
      return (
        <TouchableOpacity style={styles.listItemContainer}>
          <Image source={imgSource} style={styles.posterImage} />
          <View style={styles.movieListInfoContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.movieTitle}>
              {item.title}
            </Text>
            <Text style={styles.releaseDate}>Release: {item.release_date}</Text>
            <View style={styles.ratingContainer}>
              <FontIsto name="star" size={17} style={styles.ratingIcon} />
              <Text style={styles.ratingText}>
                {item.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    const keyExtractor = (item: MovieType) => item.id.toString();

    return (
      <FlashList
        data={movieDataState.data.results}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={140}
        onEndReached={onEndReached}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  if (movieDataState.data.page < 1 && movieDataState.loading) {
    return renderLoader();
  }
  if (movieDataState.error) {
    return renderErrorContainer();
  }
  if (movieDataState.data.results) {
    return renderMovieList();
  }
  return <></>;
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
  listItemContainer: {
    height: 140,
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    flexDirection: 'row',
    borderRadius: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  posterImage: {
    height: 110,
    width: 100,
    resizeMode: 'cover',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.colorAccentSecondary,
    marginEnd: 16,
  },
  movieListInfoContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  movieTitle: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontSize: 18,
    color: Colors.textColor,
    marginVertical: 16,
  },
  releaseDate: {
    color: Colors.subTextColor,
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontSize: 14,
    fontStyle: 'italic',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    color: '#ECD996',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  ratingText: {
    color: Colors.textColor,
  },
});

export default MovieListView;
