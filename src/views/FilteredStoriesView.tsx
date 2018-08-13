import * as React from 'react';
import Gallery from 'react-grid-gallery'
import { StoryImage, GET_DUMMY_IMAGES } from '../data_layer/models/StoryImage';


export class FilteredStoriesView extends React.Component {

    images: StoryImage[] = [];

    constructor(props: {}) {
        super(props);
        //todo: get filtered stories and build image objects out of them. 
        //See data_layer/models/StoryImage.ts for interface to use

        this.images = GET_DUMMY_IMAGES();
    }

    public render(): JSX.Element {
        return (
            <div style={styles.container}>
                <Gallery
                    images={this.images}
                    onClickThumbnail={(photoIndex: number) => console.log(photoIndex)}
                    margin={10}
                />
            </div >
        );
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 450,
        bottom: 0, right: 0,
        backgroundColor: 'white',
        padding: 25,
        overflowY: 'scroll'
    } as React.CSSProperties
};