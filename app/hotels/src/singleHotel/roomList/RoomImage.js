// @flow

import * as React from 'react';
import { View } from 'react-native';
import { Touchable, NetworkImage, StyleSheet } from '@kiwicom/mobile-shared';

import GalleryButton from '../galleryButton/GalleryButton';

type Props = {|
  +thumbnailUrl: ?string,
  +photoCount: number,
  +openGallery: () => void,
|};

export default function RoomImage({
  thumbnailUrl,
  photoCount,
  openGallery,
}: Props) {
  return (
    <Touchable onPress={openGallery} disabled={thumbnailUrl == null}>
      <View>
        <NetworkImage source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
        <View style={styles.galleryButton}>
          <GalleryButton
            count={photoCount}
            style={{ container: styles.galleryButtonContainer }}
          />
        </View>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  galleryButton: {
    position: 'absolute',
    bottom: 0,
    end: 0,
    start: 0,
  },
  galleryButtonContainer: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  thumbnail: {
    width: 60,
    height: 80,
    borderRadius: 2,
  },
});
