/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type TimelineTitle$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type TimelineArrival$ref: FragmentReference;
export type TimelineArrival = {|
  +$fragmentRefs: TimelineTitle$ref,
  +$refType: TimelineArrival$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "TimelineArrival",
  "type": "RouteStop",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "TimelineTitle",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '986de376e9fb64049cb15d37a83b3c44';
module.exports = node;
