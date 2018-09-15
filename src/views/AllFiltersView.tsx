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
  const keyArray = Array.from(props.allFilters.keys()).sort();
  const componentArray: JSX.Element[] = keyArray.map(filter => {
    const selectionSet: Set<string> = props.allFilters.get(filter)!;
    return (
      <SingleFilterView
        key={filter}
        filter={filter}
        activeFilter={props.activeFilters.get(filter) || null}
        selectionSet={selectionSet}
        addFilter={props.addFilter}
        removeFilter={props.removeFilter}
      />
    );
  });
  return (
    <form style={styles.filterList}>
      <h2 style={styles.filterListHeader}>Filter by:</h2>
      <div style={styles.divider} />
      {componentArray}
    </form>
  );
};

const styles = {
  filterList: {
    backgroundColor: '#eeeeee',
    flex: 'initial',
    width: '12rem',
    height: 'auto',
    margin: '0.5rem',
    padding: '0.25rem',
    border: '0.1rem solid black'
  } as React.CSSProperties,
  filterListHeader: {
    fontSize: '1.2rem',
    marginBottom: '0.25rem'
  } as React.CSSProperties,
  divider: {
    height: '0.1rem',
    backgroundColor: 'black'
  }
};
