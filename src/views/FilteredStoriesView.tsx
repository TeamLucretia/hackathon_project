import * as React from 'react';
import Gallery from 'react-grid-gallery';
import { StoryImage } from '../data_layer/models/StoryImage';
import { inject, observer } from '../../node_modules/mobx-react';
import { ApplicationStore } from '../data_layer/stores/ApplicationStore';

interface Props {
  store?: ApplicationStore;
}

@inject('store')
@observer
export class FilteredStoriesView extends React.Component<Props> {
  /*
  private onPressStoryImage(photo: StoryImage) {
    console.log(photo);
  }
*/

  public render(): JSX.Element {
    let images: StoryImage[] = this.props.store!.storyStore.storiesToDisplay;
    console.log(images);

    // Todo: get filtered stories and build image objects out of them.
    // See data_layer/models/StoryImage.ts for interface to use

    // ie: TODO: allows re-render on filter
    // const stories = this.props.store!.storyStore.storiesToDisplay;
    // const images = this.mapStoriesToStoryImage(stories);

    return (
      <div style={styles.container}>
        <Gallery
          images={images}
          /*
          onClickThumbnail={(index: number) =>
            this.onPressStoryImage(images[index])
          }
          */
          margin={10}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 250,
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 25,
    overflowY: 'scroll'
  } as React.CSSProperties
};
