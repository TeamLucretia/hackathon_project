import * as React from 'react';
import Gallery from 'react-grid-gallery';
import { StoryImageData } from '../data_layer/models/StoryImageData';

interface Props {
  activeImageData: StoryImageData[];
}

function onPressStory(imageID: string) {
  const storyURL = `https://artstories.artsmia.org/#/o/${imageID}`;
  const storyWindow = window.open(storyURL, 'Art Story');
  storyWindow!.focus();
}

export const FilteredStoriesView = (props: Props): JSX.Element => {
  return (
    <div style={styles.container}>
      <Gallery
        images={props.activeImageData}
        enableLightbox={false}
        onClickThumbnail={(image: number) => {
          onPressStory(props.activeImageData[image].id);
        }}
        margin={10}
      />
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: '13rem',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    marginTop: '0.25rem',
    padding: '0.25rem'
  } as React.CSSProperties
};
