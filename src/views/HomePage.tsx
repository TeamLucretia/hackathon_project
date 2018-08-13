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
        if (this.props.store.storiesOnDisplayStore.storeIsReady === false) {
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
        backgroundColor: 'blue',
        display: 'flex',

    } as React.CSSProperties
}

