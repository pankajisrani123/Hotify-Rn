/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import App from './src';
import store from './src/redux/store';
import TrackPlayer from 'react-native-track-player';
import {PlaybackService} from './src/utils/PlaybackService';
import {MenuProvider} from 'react-native-popup-menu';

const RNRoot = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <App />
      </MenuProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRoot);
TrackPlayer.registerPlaybackService(() => PlaybackService);
