// @flow

import * as React from 'react';
import Renderer from 'react-test-renderer';

import Dimensions from '../Dimensions';
import AdaptableLayout from '../AdaptableLayout';

jest.mock('../../Device', () => ({
  isWideLayout: () => true,
}));

const RendersCorrectly = () => 'I am going to render without any problems...';

const ThrowsError = () => {
  throw new Error('do not render');
};

it('renders wide components', () => {
  expect(
    Renderer.create(
      <Dimensions.Provider dimensions={{ width: 700, height: 500 }}>
        <AdaptableLayout
          renderOnWide={<RendersCorrectly />}
          renderOnNarrow={<ThrowsError />}
        />
      </Dimensions.Provider>,
    ),
  ).toMatchSnapshot();
});

it('renders empty element if there is no wide layout', () => {
  expect(
    Renderer.create(
      <Dimensions.Provider dimensions={{ width: 200, height: 500 }}>
        <AdaptableLayout renderOnNarrow={<ThrowsError />} />
      </Dimensions.Provider>,
    ),
  ).toMatchSnapshot();
});
