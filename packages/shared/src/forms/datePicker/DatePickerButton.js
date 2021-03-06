// @flow

import * as React from 'react';
import { Translation, DateFormatter } from '@kiwicom/mobile-localization';
import { View } from 'react-native';

import Touchable from '../../Touchable';
import StyleSheet from '../../PlatformStyleSheet';
import Text from '../../Text';
import Color from '../../Color';

type Props = {|
  onPress: () => void,
  date: Date,
  iconComponent?: React.Node,
|};

export default function DatePickerButton(props: Props) {
  return (
    <Touchable style={styles.dateTouchBody} onPress={props.onPress}>
      <View style={styles.date}>
        {props.iconComponent}
        <Text style={styles.dateText}>
          <Translation passThrough={DateFormatter(props.date).formatToDate()} />
        </Text>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  dateTouchBody: {
    backgroundColor: Color.inputBackground,
    android: {
      height: 48,
      borderRadius: 2,
    },
    ios: {
      borderRadius: 6,
      height: 47,
    },
    justifyContent: 'center',
  },
  date: {
    flexDirection: 'row',
    marginStart: 10,
  },
  dateText: {
    color: Color.textDark,
    android: {
      fontSize: 16,
    },
    ios: {
      paddingTop: 2,
      fontSize: 14,
    },
    marginStart: 5,
  },
});
