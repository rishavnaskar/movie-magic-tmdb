import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../../utils/colors';
import {CommonStateType, MovieType} from '../../types';
import {addMovieToFavorites, getPostImageUrl} from '../../utils/helper';
import FontIsto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import {HeaderButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useSelector} from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  route: {params: MovieType};
}

const MovieItemScreen = (props: Props) => {
  const item = props?.route?.params ?? {};

  const [isAuthInProgress, setIsAuthInProgress] = useState(false);
  const [imgError, setImgError] = useState(false);

  const accountId = useSelector(
    (state: CommonStateType) => state.auth.accountId,
  );

  const imgSource: ImageSourcePropType = {
    uri: getPostImageUrl(item.poster_path, 'large'),
  };

  const navigation = useNavigation();

  const onPressAddFavorite = async () => {
    await addMovieToFavorites(
      navigation,
      accountId,
      item.id,
      setIsAuthInProgress,
    );
  };

  const renderAddFavoriteIcon = ({tintColor}: HeaderButtonProps) =>
    isAuthInProgress ? (
      <ActivityIndicator size={24} color={tintColor} />
    ) : (
      <MaterialCommunityIcon
        name="heart-plus"
        size={24}
        color={tintColor}
        onPress={onPressAddFavorite}
      />
    );

  const renderImageError = () => {
    return (
      <View style={styles.imageErrorContainer}>
        <MaterialIcon
          name="report-gmailerrorred"
          size={150}
          color={Colors.subTextColor}
        />
        <Text style={styles.imageErrorText}>No movie poster found</Text>
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({headerRight: renderAddFavoriteIcon});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, isAuthInProgress]);

  return (
    <ScrollView style={styles.container}>
      {imgError ? (
        renderImageError()
      ) : (
        <Image
          source={imgSource}
          style={styles.posterImage}
          onError={() => setImgError(true)}
        />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.releaseAndRatingContainer}>
        <Text style={styles.releaseDate}>Release: {item.release_date}</Text>
        <View style={styles.ratingContainer}>
          <FontIsto name="star" style={styles.ratingIcon} />
          <Text style={styles.ratingText}>{item.vote_average.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.overviewText}>{item.overview}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 16,
  },
  posterImage: {
    height: 520,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.colorAccentSecondary,
    elevation: 10,
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    color: Colors.textColor,
    marginTop: 20,
  },
  releaseAndRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  releaseDate: {
    color: Colors.subTextColor,
    marginTop: 12,
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    color: Colors.ratingColor,
    marginVertical: 8,
    marginHorizontal: 8,
    fontSize: 16,
  },
  ratingText: {
    color: Colors.ratingColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  overviewText: {
    color: Colors.subTextColor,
    marginTop: 20,
    marginBottom: 24,
    fontSize: 18,
  },
  imageErrorContainer: {
    height: 520,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBackground,
    marginHorizontal: 16,
    elevation: 10,
    backgroundColor: Colors.cardBackground,
  },
  imageErrorText: {
    marginTop: 24,
    color: Colors.subTextColor,
    fontSize: 20,
  },
});

export default MovieItemScreen;
