// @flow

import React from 'react';
import idx from 'idx';
import { View } from 'react-native';
import { graphql, createFragmentContainer } from '@kiwicom/mobile-relay';
import { Translation } from '@kiwicom/mobile-localization';
import { TextIcon, StyleSheet } from '@kiwicom/mobile-shared';

import ExploreAirportButton from './components/ExploreAirportButton';
import Note from '../MainContentNote';
import Title from '../MainContentTitle';
import type { AirportArrivalTimelineEvent as AirportArrivalTimelineEventType } from './__generated__/AirportArrivalTimelineEvent.graphql';
import TimelineEvent from '../TimelineEvent';
import TimelineEventIcon from '../TimelineEventIcon';
import TimelineEventDateLocationContext from '../../../context/TimelineEventDateLocationContext';

type Props = {|
  +data: ?AirportArrivalTimelineEventType,
|};

const AirportArrivalTimelineEvent = (props: Props) => {
  const airport = idx(props, _ => _.data.location.airport.name);
  const code = idx(props, _ => _.data.location.airport.locationId) || '';
  const timestamp = idx(props, _ => _.data.timestamp);
  return (
    <TimelineEventDateLocationContext.Provider value={{ highlightText: true }}>
      <TimelineEvent
        timestamp={timestamp}
        place={code}
        iconVertLines={<TimelineEventIcon icon={<TextIcon code="a" />} />}
        mainContent={
          <React.Fragment>
            <Title>
              <Translation
                id="mmb.booking_timeline.event.airport_arrival.title"
                values={{
                  airport,
                  code,
                }}
              />
            </Title>
            <Note>
              <Translation id="mmb.booking_timeline.event.airport_arrival.note" />
            </Note>
            <View style={styles.button}>
              <ExploreAirportButton locationId={code} />
            </View>
          </React.Fragment>
        }
      />
    </TimelineEventDateLocationContext.Provider>
  );
};

export default createFragmentContainer(
  AirportArrivalTimelineEvent,
  graphql`
    fragment AirportArrivalTimelineEvent on AirportArrivalTimelineEvent {
      timestamp
      location {
        airport {
          locationId
          name
        }
      }
    }
  `,
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
});
