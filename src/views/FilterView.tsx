import * as React from 'react';
import { inject, observer } from '../../node_modules/mobx-react';
import { ApplicationStore } from '../data_layer/stores/ApplicationStore';
import { FilterSet } from '../data_layer/stores/StoriesOnDisplayStore';

interface Props {
  store?: ApplicationStore;
}

interface State {
  currentFilter: string;
}

@inject('store')
@observer
export class FilterView extends React.Component<Props, State> {
  public state: State = {
    availableFilters: []
  };

  public updateFilter(categoryFilter: PhotoFilter, subFilter: string): void {
    this.props.store!.storyStore.filterStoriesToDisplay(
      categoryFilter,
      subFilter
    );
  }

  public renderFilterButton(cat: string, sub: string[]) {
    return (
      <div>
        <div
          style={styles.mainFilterButton}
          onClick={() =>
            this.setState({
              currentFilter: this.state.currentFilter === cat ? '' : cat
            })
          }
        >
          <p>{cat}</p>
        </div>
        {this.state.currentFilter === cat && (
          <div style={{ width: '100%' }}>
            {sub.map((str, index) => {
              return (
                <div
                  key={index}
                  style={styles.subFilterButton}
                  onClick={() => this.updateFilter(PhotoFilter.TEMP, str)}
                >
                  <p>{str}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
          width: 450,
          height: '100%',
          backgroundColor: '#00000011',
          paddingTop: 250
        }}
      >
        {this.renderFilterButton('ZERO', ['ONE', 'TWO', 'THREE'])}
        {this.renderFilterButton('TEN', ['ELEVEN', 'TWELVE', 'THIRTEEN'])}
        {this.renderFilterButton('TWENTY', [
          'TWENTY-ONE',
          'TWENTY-TWO',
          'TWENTY-THREE'
        ])}
      </div>
    );
  }
}

const styles = {
  mainFilterButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#00000033',
    color: 'white',
    fontFamily: 'Helvetica',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    marginTop: 10
  } as React.CSSProperties,
  subFilterButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#00000077',
    color: 'white',
    fontFamily: 'Helvetica',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20
  } as React.CSSProperties
};
