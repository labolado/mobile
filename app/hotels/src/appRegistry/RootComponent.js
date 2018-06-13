// @flow

import * as React from 'react';
import { ConfigContext } from '@kiwicom/mobile-config';
import {
  Device,
  GeolocationContext,
  type OnLayout,
} from '@kiwicom/mobile-shared';

import HotelsSearchContext from '../HotelsSearchContext';
import HotelsFilterContext from '../HotelsFilterContext';

type Props = {|
  dataSaverEnabled: boolean,
  children: React.Node,
|};

export default class RootComponent extends React.Component<Props> {
  render = () => (
    <ConfigContext.Provider dataSaverEnabled={this.props.dataSaverEnabled}>
      <HotelsSearchContext.Provider>
        <HotelsFilterContext.Provider>
          <GeolocationContext.Provider>
            {this.props.children}
          </GeolocationContext.Provider>
        </HotelsFilterContext.Provider>
      </HotelsSearchContext.Provider>
    </ConfigContext.Provider>
  );
}
