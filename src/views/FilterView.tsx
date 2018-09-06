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
  constructor(props: Props) {
    super(props);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.renderFilterSelection = this.renderFilterSelection.bind(this);
    this.renderFilterSet = this.renderFilterSet.bind(this);
  }
  public state: State = {
    selectedFilters: []
  };

  public addFilter(filter: SelectedFilter): void {
    this.setState(prevState => ({
      selectedFilters: [...prevState.selectedFilters, filter]
    }));
    this.updateFilter();
  }

  public removeFilter(filter: SelectedFilter): void {
    const existingFilters = this.state.selectedFilters;
    this.setState({
      selectedFilters: existingFilters.filter(
        filterCheck => filterCheck.filter !== filter.filter
      )
    });
    this.updateFilter();
  }

  public removeAllFilters(): void {}

  public updateFilter(): void {
    this.props.store!.storyStore.filterStoriesToDisplay([
      ...this.state.selectedFilters
    ]);
  }

  public renderFilterSelection(filter: string, selection: string) {
    const existingFilterOfType = this.state.selectedFilters.find(
      selectedFilter => selectedFilter.filter === filter
    );
    const selected = existingFilterOfType
      ? existingFilterOfType.selection === selection
      : false;
    return (
      <div key={selection}>
        <input
          type="checkbox"
          checked={selected}
          onChange={
            selected
              ? () => {
                  this.removeFilter({ filter, selection });
                }
              : () => {
                  this.addFilter({ filter, selection });
                }
          }
        />
        {selection}
      </div>
    );
  }

  public renderFilterSet(filterSet: FilterSet) {
    const availableFilterSelections: string[] = Array.from(
      this.props.store!.storyStore.getAvailableFilterSelections(
        filterSet.filter
      )
    ).sort();
    /*
    const unavailableFilterSelections: string[] = Array.from(
      filterSet.filterValues
    )
      .filter(value => !availableFilterSelections.includes(value))
      .sort();
    */
    return (
      <div key={filterSet.filter}>
        <div>
          <p>{filterSet.filter.toUpperCase()}</p>
        </div>
        <div>
          {availableFilterSelections.map(value =>
            this.renderFilterSelection(filterSet.filter, value)
          )}
          {/*
          {unavailableFilterSelections.map(value =>
            this.renderFilterSelection(filterSet.filter, value, false)
          )}
          */}
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
          width: 240,
          backgroundColor: 'white',
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
