import * as React from 'react';
import Gallery from 'react-grid-gallery';
import { StoryImageData } from '../data_layer/models/StoryImageData';

interface Props {
  activeImageData: StoryImageData[];
}

export const FilteredStoriesView = (props: Props): JSX.Element => {
  return (
    <div style={styles.container}>
      <Gallery
        images={props.activeImageData}
        /*
        onClickThumbnail={(index: number) =>
          this.onPressStoryImage(images[index])
        }
        */
        margin={10}
      />
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: '12rem',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    padding: '1rem'
  } as React.CSSProperties
};
