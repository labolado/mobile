// @flow strict

import { Dimensions, Platform } from 'react-native'; // eslint-disable-line no-restricted-imports

type DimensionsChangedEvent = {|
  width: number,
  height: number,
|};

let dimensions: DimensionsChangedEvent = Dimensions.get('screen');
console.log('Setup');
Dimensions.addEventListener('change', ({ screen }) => {
  dimensions = screen;
  console.log(dimensions);
  dimensionChangeListeners.forEach(listener => listener(dimensions));
});

const dimensionChangeListeners = [];

/**
 * Note: getDimensions should only be used in componentDidMount. Dimensions are
 * changing during the application lifecycle so you have to use
 * `AdaptableLayout` component or subscribe to these changes.
 */
export default {
  /**
   * Dimensions may change (landscape <-> portrait, multitasking). Subscribe to
   * this event if you want to be notified about these changes.
   */
  subscribeToDimensionChanges(
    handler: (dimensions: DimensionsChangedEvent) => void,
  ): () => void {
    dimensionChangeListeners.push(handler);

    return function unsubscribe() {
      const index = dimensionChangeListeners.indexOf(handler);
      dimensionChangeListeners.splice(index, 1);
    };
  },

  /**
   * .---.
   * |   |
   * |   |
   * `---`
   */
  isPortrait() {
    return dimensions.height >= dimensions.width;
  },

  /**
   * .------.
   * |      |
   * `------`
   */
  isLandscape() {
    return dimensions.width >= dimensions.height;
  },

  /**
   * Wide layout is usually for tablets. However, this may be false even
   * on tablet for example during iOS multitasking mode.
   *
   * WARNING: this won't update with device change. Use subscriber instead.
   */
  isWideLayout() {
    return dimensions.width > this.getWideDeviceThreshold();
  },

  /**
   * WARNING: this won't update with device change. Use subscriber instead.
   */
  isNarrowLayout() {
    return !this.isWideLayout();
  },

  /**
   * Wide device is every device above this value.
   */
  getWideDeviceThreshold() {
    return 668; // according to the graphic design
  },

  /**
   * Height of the application toobar. Please note that toolbar is the
   * place where top navigation resides. Don't confuse it with statusbar.
   */
  getToolbarHeight() {
    return Platform.select({
      android: 56,
      ios: 64,
    });
  },

  getDimensions() {
    return dimensions;
  },
};
