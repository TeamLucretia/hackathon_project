import * as React from 'react';
import { ApplicationStore } from '../data_layer/stores/ApplicationStore';
import { inject, observer } from 'mobx-react';
import { FilterView } from './FilterView';
import { FilteredStoriesView } from './FilteredStoriesView';

interface Props {
    store: ApplicationStore;
}

@inject('store')
@observer
export class HomePage extends React.Component<Props> {

    public render(): JSX.Element | null {
        // Nothing will render until we get our items from the database, could put loading screen instead of null.
        if (this.props.store.storyStore.storeIsReady === false) {
            return null;
        }

        return (
            <div style={styles.container}>
                <FilterView />
                <FilteredStoriesView />
            </div>
        );
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',

    } as React.CSSProperties
};

