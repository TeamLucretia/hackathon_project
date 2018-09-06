import * as React from 'react';
import { inject, observer } from '../../node_modules/mobx-react';
import { ApplicationStore } from '../data_layer/stores/ApplicationStore';
import { FilterSet } from '../data_layer/stores/StoriesOnDisplayStore';

interface Props {
  store?: ApplicationStore;
}

export interface SelectedFilter {
  filter: string;
  selection: string;
}

interface State {
  selectedFilters: SelectedFilter[];
}

@inject('store')
@observer
export class FilterView extends React.Component<Props, State> {
  public state: State = {
    selectedFilters: []
  };

  public addFilter(filter: SelectedFilter): void {}

  public removeFilter(filter: SelectedFilter): void {}

  public removeAllFilters(): void {}

  public updateFilter(): void {
    this.props.store!.storyStore.filterStoriesToDisplay([
      ...this.state.selectedFilters
    ]);
  }

  public renderFilterSelection(
    filter: string,
    selection: string,
    available: boolean
  ) {
    return <div>{selection}</div>;
  }

  public renderFilterSet(filterSet: FilterSet) {
    const availableFilterSelections: string[] = Array.from(
      this.props.store!.storyStore.getAvailableFilterSelections(
        filterSet.filter
      )
    ).sort();
    const unavailableFilterSelections: string[] = Array.from(
      filterSet.filterValues
    )
      .filter(value => !availableFilterSelections.includes(value))
      .sort();
    return (
      <div>
        <div>
          <p>{filterSet.filter.toUpperCase()}</p>
        </div>
        <div>
          {availableFilterSelections.map(value =>
            this.renderFilterSelection(filterSet.filter, value, true)
          )}
          {unavailableFilterSelections.map(value =>
            this.renderFilterSelection(filterSet.filter, value, false)
          )}
        </div>
      </div>
    );
  }

  /*
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
  */

  public render(): JSX.Element {
    const allFilters = this.props.store!.storyStore.allFilterSets.sort(
      (a, b) => {
        return a.filter < b.filter ? -1 : 1;
      }
    );
    return (
      <div
        style={{
          width: 200,
          backgroundColor: '#00000011',
          paddingTop: 20
        }}
      >
        {allFilters.map(filterSet => this.renderFilterSet(filterSet))}
      </div>
    );
  }
}

/*
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
*/
