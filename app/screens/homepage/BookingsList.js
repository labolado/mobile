// @flow

import * as React from 'react';
import { Text, View, Button, ScrollView } from 'react-native';

import Styles from '../../src/Styles';

import type { BookingsListContainer_bookings } from './__generated__/BookingsListContainer_bookings.graphql';

type Props = {
  flights: BookingsListContainer_bookings,
  relay: Object, // FIXME
};

type State = {
  loading: boolean,
};

export default class SearchResults extends React.Component<Props, State> {
  // TODO: offline layer for allBookings
  render = () => {
    return this.props.bookings.allBookings.edges.map(edge => {
      return <View key={edge.node.id}>
        <Text>{edge.node.id}</Text>
        <Text>{edge.node.departure.airport.locationId} &rarr; {edge.node.arrival.airport.locationId}</Text>
      </View>
    })
  }
}

// render = () => <Text>OK</Text>
