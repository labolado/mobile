// @flow

import * as React from 'react';

import Device from '../Device';

type Props = {|
  +renderOnWide?: React.Node,
  +renderOnNarrow?: React.Node,
|};

export default class AdaptableLayout extends React.Component<Props> {
  unsubscribeDimensionListener: Function = () => {};

  componentDidMount = () => {
    this.unsubscribeDimensionListener = Device.subscribeToDimensionChanges(() =>
      this.forceUpdate(),
    );
  };

  componentWillUnmount = () => {
    this.unsubscribeDimensionListener();
  };

  render = () => {
    const wideLayout = Device.isWideLayout();
    // may return nothing:
    // 1. renderOnWide set but we have narrow layout
    // 2. renderOnNarrow set but we have wide layout
    let children = null;

    if (wideLayout === true && this.props.renderOnWide) {
      children = this.props.renderOnWide;
    } else if (wideLayout === false && this.props.renderOnNarrow) {
      children = this.props.renderOnNarrow;
    }

    return children;
  };
}
