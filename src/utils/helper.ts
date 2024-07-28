import Snackbar from 'react-native-snackbar';
import {BASE_URLS} from '../api/base_urls';
import {getRequestToken, setFavoriteMovie} from '../api/helper';
import {SCREENS} from '../navigation/routes';
import {NavigationType} from '../types';
import {Alert} from 'react-native';

export const getPostImageUrl = (endPoint: string, size: 'small' | 'large') => {
  if (size === 'small') {
    return BASE_URLS.FETCH_IMAGE_SMALL.concat(endPoint);
  } else {
    return BASE_URLS.FETCH_IMAGE_LARGE.concat(endPoint);
  }
};

export const navigateToTMDBAuthWebView = async (navigation: NavigationType) => {
  const requestToken = await getRequestToken();
  if (requestToken) {
    navigation.navigate(SCREENS.AUTHENTICATION_WEB_VIEW_SCREEN, {
      requestToken,
      isSourceFavoritesIcon: false,
    });
  } else {
    Snackbar.show({text: 'Unable to fetch request token. Please try again...'});
  }
};

export const showTMDBAlertDialog = (
  navigation: NavigationType,
  setIsLoading: (val: boolean) => void,
) => {
  const onDismiss = () => {
    Snackbar.show({
      text: 'Unable to access favorites without authentication',
      duration: Snackbar.LENGTH_LONG,
    });
  };

  const onPressProceed = async () => {
    setIsLoading(true);
    await navigateToTMDBAuthWebView(navigation);
    setIsLoading(false);
  };

  return Alert.alert(
    'Login required for favorites',
    'To add a movie to your favorites or accessing your favorites, please login/signup at www.themoviedb.org',
    [
      {
        text: 'Cancel',
        onPress: onDismiss,
        style: 'cancel',
      },
      {
        text: 'Proceed',
        onPress: onPressProceed,
        style: 'default',
        isPreferred: true,
      },
    ],
    {
      cancelable: true,
      userInterfaceStyle: 'dark',
      onDismiss,
    },
  );
};

export const addMovieToFavorites = async (
  navigation: NavigationType,
  accountId: number | null,
  movieId: number,
  setIsLoading: (val: boolean) => void,
) => {
  if (accountId) {
    setIsLoading(true);
    const response = await setFavoriteMovie(accountId, movieId);
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
    setIsLoading(false);
  } else {
    showTMDBAlertDialog(navigation, setIsLoading);
  }
};
