import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {addMovieToFavorites, getPostImageUrl} from '../../utils/helper';
import {MovieType} from '../../types';
import FontIsto from 'react-native-vector-icons/Fontisto';
import {SCREENS} from '../../navigation/routes';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../utils/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  item: MovieType;
  accountId: number | null;
}

const MovieListItem = ({item, accountId}: Props) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const onAddMovieToFavorites = async () => {
    await addMovieToFavorites(navigation, accountId, item.id, setIsLoading);
  };

  const onPressMovieItem = (val: MovieType) => {
    navigation.navigate(SCREENS.MOVIE_ITEM_SCREEN, val);
  };

  const renderErrorView = () => (
    <View style={styles.imageErrorContainer}>
      <MaterialIcon
        name="report-gmailerrorred"
        size={50}
        color={Colors.subTextColor}
      />
    </View>
  );

  const imgSource: ImageSourcePropType = {
    uri: getPostImageUrl(item.poster_path, 'large'),
  };

  return (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => onPressMovieItem(item)}
      onLongPress={onAddMovieToFavorites}>
      {imageError ? (
        renderErrorView()
      ) : (
        <Image
          source={imgSource}
          style={styles.posterImage}
          onError={() => setImageError(true)}
        />
      )}
      <View style={styles.movieListInfoContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.movieTitle}>
          {item.title}
        </Text>
        <Text style={styles.releaseDate}>Release: {item.release_date}</Text>
        <View style={styles.ratingContainer}>
          {isLoading ? (
            <ActivityIndicator
              size={16}
              color={Colors.textColor}
              style={styles.loader}
            />
          ) : null}
          <FontIsto name="star" size={17} style={styles.ratingIcon} />
          <Text style={styles.ratingText}>{item.vote_average.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    elevation: 10,
  },
  posterImage: {
    height: 110,
    width: 100,
    resizeMode: 'cover',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBackground,
    marginEnd: 16,
    elevation: 10,
  },
  imageErrorContainer: {
    height: 110,
    width: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.backgroundColor,
    marginEnd: 16,
    elevation: 10,
    backgroundColor: Colors.backgroundColor,
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
    color: Colors.ratingColor,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  ratingText: {
    color: Colors.textColor,
  },
  loader: {
    marginEnd: 8,
  },
});

export default MovieListItem;
