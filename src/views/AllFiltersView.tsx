import * as React from 'react';
import { SingleFilterView } from './SingleFilterView';
import {
  FilterKey,
  ActiveFilters,
  FilterMap
} from '../data_layer/models/Filters';

interface Props {
  activeFilters: ActiveFilters;
  allFilters: FilterMap;
  addFilter(filter: FilterKey, selection: string): void;
  removeFilter(filter: FilterKey): void;
  removeAllFilters(): void;
}

// TODO: Styling, sort categories

export const AllFiltersView = (props: Props): JSX.Element => {
  const componentArray: JSX.Element[] = [];
  for (let [filter, selectionSet] of props.allFilters) {
    componentArray.push(
      <SingleFilterView
        key={filter}
        filter={filter}
        activeFilter={props.activeFilters.get(filter) || null}
        selectionSet={selectionSet}
        addFilter={props.addFilter}
        removeFilter={props.removeFilter}
      />
    );
  }
  return <div style={styles.filterList}>{componentArray}</div>;
};

const styles = {
  filterList: {
    backgroundColor: '#eeeeee',
    flex: 'initial',
    width: '10rem',
    height: 'auto',
    margin: '0.5rem',
    padding: '0.5rem',
    border: '0.1rem solid black'
  } as React.CSSProperties
};
