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
import {getPostImageUrl} from '../../utils/helper';
import FontIsto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import {HeaderButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useSelector} from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import {getRequestToken, setFavoriteMovie} from '../../api/helper';
import {SCREENS} from '../../navigation/routes';

interface Props {
  route: {params: MovieType};
}

const MovieItemScreen = (props: Props) => {
  const item = props?.route?.params ?? {};

  const [isAuthInProgress, setIsAuthInProgress] = useState(false);

  const accountId = useSelector(
    (state: CommonStateType) => state.auth.accountId,
  );

  const imgSource: ImageSourcePropType = {
    uri: getPostImageUrl(item.poster_path, 'large'),
  };

  const navigation = useNavigation();

  const onPressAddFavorite = async () => {
    setIsAuthInProgress(true);
    if (accountId) {
      const response = await setFavoriteMovie(accountId, item.id);
      if (response) {
        Snackbar.show({
          text: 'Successfully added movie to favorites!',
          duration: Snackbar.LENGTH_LONG,
        });
      } else {
        Snackbar.show({
          text: 'Failed to add movie to favorites',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } else {
      const requestToken = await getRequestToken();
      if (requestToken) {
        navigation.navigate(SCREENS.AUTHENTICATION_WEB_VIEW_SCREEN, {
          requestToken,
          isSourceFavoritesIcon: false,
        });
      }
    }
    setIsAuthInProgress(false);
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

  useEffect(() => {
    navigation.setOptions({headerRight: renderAddFavoriteIcon});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, isAuthInProgress]);

  return (
    <ScrollView style={styles.container}>
      <Image source={imgSource} style={styles.posterImage} />
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
});

export default MovieItemScreen;
