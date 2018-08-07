import * as React from 'react';
import { ApplicationStore } from '../data_layer/stores/ApplicationStore';
import { inject, observer } from '../../node_modules/mobx-react';

interface Props {
    store: ApplicationStore;
}

@inject('store')
@observer
export class HomePage extends React.Component<Props> {
    public render() {
        return (
            <div>
                {this.props.store.exampleStore.exampleNumber}
                <button onClick={() => this.props.store.exampleStore.incrementExample()}>{'up that number!'}</button>
            </div>
        );
    }
}
