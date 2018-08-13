import * as React from 'react';
import { inject, observer } from '../../node_modules/mobx-react';
import { ApplicationStore } from '../data_layer/stores/ApplicationStore';
import { PhotoFilter } from '../data_layer/stores/StoriesOnDisplayStore';

interface Props {
    store?: ApplicationStore;
}
@inject('store')
@observer
export class FilterView extends React.Component<Props> {

    public updateFilter(filter: PhotoFilter): void {
        this.props.store!.storyStore.filterStoriesToDisplay(filter);
    }

    public render(): JSX.Element {
        return (
            <div style={{ width: 450, height: '100%', backgroundColor: '#00000011' }} />
        );
    }
}