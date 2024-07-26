import React from 'react';
import {StyleSheet} from 'react-native';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {BASE_URLS} from '../../api/base_urls';
import {getUserAccountId} from '../../api/authentication';
import {useDispatch} from 'react-redux';
import {authActions} from '../../redux/action';
import Snackbar from 'react-native-snackbar';
import {StackActions, useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../navigation/routes';

interface Props {
  route: {params: {requestToken: string}};
}

const MovieAuthWebViewScreen = (props: Props) => {
  const {requestToken} = props?.route?.params ?? {};

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onNavigationStateChange = async (event: WebViewNavigation) => {
    if (event.url.includes('/allow')) {
      const response = await getUserAccountId(requestToken);
      if (response) {
        dispatch(authActions.storeAccountIdSuccess(response));
        navigation.dispatch(StackActions.replace(SCREENS.FAVORITES_SCREEN));
      } else {
        Snackbar.show({text: 'Failed to get account ID'});
      }
    }
  };

  return (
    <WebView
      source={{uri: `${BASE_URLS.AUTHENTICATION}/${requestToken}`}}
      style={styles.container}
      onNavigationStateChange={onNavigationStateChange}
      incognito={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MovieAuthWebViewScreen;
