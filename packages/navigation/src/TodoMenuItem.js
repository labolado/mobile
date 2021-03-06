// @flow

import * as React from 'react';
import { Text, StyleSheet } from '@kiwicom/mobile-shared';

import MenuItem from './MenuItem';

const VoidAction = () => {
  console.warn('TODO - this menu item is not ready yet');
};

// this type should be compatible with the type from "MenuItem" component
type Props = {|
  title: React.Element<*>,
  onPress?: () => void,
  isActive?: boolean,
  icon?: React.Element<*>,
  description?: React.Element<*>,
|};

export default function TodoMenuItem(props: Props) {
  return (
    <MenuItem
      onPress={VoidAction}
      isActive={false}
      {...props}
      title={
        // $FlowExpectedError: should be translation but works with any component
        <React.Fragment>
          <Text style={styleSheet.text}>{props.title}</Text>{' '}
          {/* $FlowExpectedError: should be translation but works with any component */}
          <Text style={styleSheet.textTodo}>(TODO)</Text>
        </React.Fragment>
      }
    />
  );
}

const styleSheet = StyleSheet.create({
  text: {
    textDecorationLine: 'line-through',
  },
  textTodo: {
    color: 'red',
  },
});
