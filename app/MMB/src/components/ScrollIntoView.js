// @flow

import * as React from 'react';
import { View, ScrollView } from 'react-native';

type Props = {|
  +shouldScrollIntoView: boolean,
  +scrollToY: (y: number) => void,
  +children: React.Node,
|};

type OnLayoutEvent = {|
  nativeEvent: {
    layout: { x: number, y: number, width: number, height: number },
  },
|};

export class ScrollIntoView extends React.Component<Props> {
  static defaultProps = {
    scrollToY: () => {},
  };

  onLayout = (e: OnLayoutEvent) => {
    this.props.shouldScrollIntoView &&
      this.props.scrollToY(e.nativeEvent.layout.y);
  };
  render() {
    return <View onLayout={this.onLayout}>{this.props.children}</View>;
  }
}

type CustomScrollViewProps = {|
  +children: React.Node,
|};

export class CustomScrollView extends React.Component<CustomScrollViewProps> {
  scrollView: ?ScrollView;

  constructor(props: CustomScrollViewProps) {
    super(props);
    this.scrollView = React.createRef();
  }

  scrollToY = (y: number) => {
    if (this.scrollView && this.scrollView.current) {
      this.scrollView.current.scrollTo({ y });
    }
  };

  render() {
    return (
      <ScrollView ref={this.scrollView}>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, { scrollToY: this.scrollToY }),
        )}
      </ScrollView>
    );
  }
}
