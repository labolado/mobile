/* @flow */

import { NativeModules } from 'react-native';

NativeModules.RNVectorIconsManager = {
  loadFontWithFileName: jest.fn(),
  getImageForFont: jest.fn(),
};
