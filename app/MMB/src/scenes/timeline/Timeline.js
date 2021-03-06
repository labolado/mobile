// @flow

import * as React from 'react';
import { ScrollView } from 'react-native';
import idx from 'idx';
import { PrivateApiRenderer, graphql } from '@kiwicom/mobile-relay';
import { DateFormatter } from '@kiwicom/mobile-localization';

import type { TimelineQueryResponse } from './__generated__/TimelineQuery.graphql';
import BookingDetailContext from '../../context/BookingDetailContext';
import BookedFlightTimelineEvent from './events/BookedFlightTimelineEvent';
import AirportArrivalTimelineEvent from './events/AirportArrivalTimelineEvent';
import DownloadInvoiceTimelineEvent, {
  TimelineInvoiceSubmenuItems,
} from './events/DownloadInvoiceTimelineEvent';
import DepartureTimelineEvent from './events/DepartureTimelineEvent';
import ArrivalTimelineEvent from './events/ArrivalTimelineEvent';
import LeaveForAirportTimelineEvent from './events/LeaveForAirportTimelineEvent';
import BoardingTimelineEvent from './events/BoardingTimelineEvent';
import TransportFromAirportTimelineEvent from './events/TransportFromAirportTimelineEvent';
import DaySeparator from './DaySeparator';
import DownloadETicketTimelineEvent from './events/DownloadETicketTimelineEvent';
import TimelineEventIconContext from '../../context/TimelineEventIconContext';
import DownloadBoardingPassTimelineEvent from './events/DownloadBoardingPassTimelineEvent';

export const TimelineSubmenuItems = {
  ...TimelineInvoiceSubmenuItems,
};

type Events = $PropertyType<
  $NonMaybeType<$PropertyType<TimelineQueryResponse, 'bookingTimeline'>>,
  'events',
>;

type Event = $ElementType<$NonMaybeType<Events>, number>;

type TimelineEvent = ?React.Element<
  | typeof BookedFlightTimelineEvent
  | typeof AirportArrivalTimelineEvent
  | typeof DownloadInvoiceTimelineEvent
  | typeof DepartureTimelineEvent
  | typeof ArrivalTimelineEvent
  | typeof LeaveForAirportTimelineEvent
  | typeof BoardingTimelineEvent
  | typeof TransportFromAirportTimelineEvent
  | typeof DownloadETicketTimelineEvent
  | typeof DownloadBoardingPassTimelineEvent,
>;

function getValidTimelineEvent(data: Event): TimelineEvent {
  if (data) {
    switch (data.__typename) {
      case 'BookedFlightTimelineEvent':
        return <BookedFlightTimelineEvent data={data} />;
      case 'DownloadInvoiceTimelineEvent':
        return <DownloadInvoiceTimelineEvent data={data} />;
      case 'DownloadETicketTimelineEvent':
        return <DownloadETicketTimelineEvent data={data} />;
      case 'AirportArrivalTimelineEvent':
        return <AirportArrivalTimelineEvent data={data} />;
      case 'LeaveForAirportTimelineEvent':
        return <LeaveForAirportTimelineEvent data={data} />;
      case 'BoardingTimelineEvent':
        return <BoardingTimelineEvent data={data} />;
      case 'ArrivalTimelineEvent':
        return <ArrivalTimelineEvent data={data} />;
      case 'DepartureTimelineEvent':
        return <DepartureTimelineEvent data={data} />;
      case 'TransportFromAirportTimelineEvent':
        return <TransportFromAirportTimelineEvent data={data} />;
      case 'DownloadBoardingPassTimelineEvent':
        return <DownloadBoardingPassTimelineEvent data={data} />;
      default:
        return null;
    }
  }
  return null;
}

type Acc = {
  [date: string]: Array<TimelineEvent>,
};

function renderChildren(events: Events) {
  if (events) {
    const renderedEventsByDate = events.reduce((acc: Acc, curr: Event) => {
      const event = getValidTimelineEvent(curr);
      const timestamp = idx(curr, _ => _.timestamp);
      if (!event || !timestamp) {
        return acc;
      }

      const key = DateFormatter(new Date(timestamp)).formatForMachine();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(event);
      return acc;
    }, {});

    const dates = Object.keys(renderedEventsByDate);

    return dates.map((date, dateIndex) => {
      const renderedEvents = renderedEventsByDate[date];
      const isFirstDate = dateIndex === 0;
      const isLastDate = dateIndex === dates.length - 1;
      const renderedEventsWithContext = renderedEvents.map(
        (renderedEvent, index) => {
          // This controls top and bottom lines around the icon
          const value = {
            displayTopLine: !(isFirstDate && index === 0),
            displayBottomLine: !(
              isLastDate && index === renderedEvents.length - 1
            ),
          };
          const typename =
            idx(renderedEvent, _ => _.props.data.__typename) || '';

          return (
            <TimelineEventIconContext.Provider
              value={value}
              key={'TimelineEvent-' + date + typename + index}
            >
              {renderedEvent}
            </TimelineEventIconContext.Provider>
          );
        },
      );

      return (
        <React.Fragment key={'TimelineDay-' + date}>
          <DaySeparator date={new Date(date)} />
          {renderedEventsWithContext}
        </React.Fragment>
      );
    });
  }
}

export default class Timeline extends React.Component<{||}> {
  renderInner = (renderProps: TimelineQueryResponse) => {
    const events = idx(renderProps, _ => _.bookingTimeline.events);
    const children = renderChildren(events);
    return <ScrollView>{children}</ScrollView>;
  };

  render = () => (
    <BookingDetailContext.Consumer>
      {({ bookingId }) => (
        <PrivateApiRenderer
          query={graphql`
            query TimelineQuery($id: ID!) {
              bookingTimeline(id: $id) {
                events {
                  __typename
                  timestamp
                  ... on BookedFlightTimelineEvent {
                    ...BookedFlightTimelineEvent
                  }
                  ... on LeaveForAirportTimelineEvent {
                    ...LeaveForAirportTimelineEvent
                  }
                  ... on AirportArrivalTimelineEvent {
                    ...AirportArrivalTimelineEvent
                  }
                  ... on DownloadInvoiceTimelineEvent {
                    ...DownloadInvoiceTimelineEvent
                  }
                  ... on DownloadETicketTimelineEvent {
                    ...DownloadETicketTimelineEvent
                  }
                  ... on BoardingTimelineEvent {
                    ...BoardingTimelineEvent
                  }
                  ... on DepartureTimelineEvent {
                    ...DepartureTimelineEvent
                  }
                  ... on ArrivalTimelineEvent {
                    ...ArrivalTimelineEvent
                  }
                  ... on TransportFromAirportTimelineEvent {
                    ...TransportFromAirportTimelineEvent
                  }
                  ... on DownloadBoardingPassTimelineEvent {
                    ...DownloadBoardingPassTimelineEvent
                  }
                }
              }
            }
          `}
          variables={{
            id: bookingId,
          }}
          render={this.renderInner}
        />
      )}
    </BookingDetailContext.Consumer>
  );
}
