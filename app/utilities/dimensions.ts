import {Platform, StatusBar} from 'react-native';

export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
