import * as React from 'react';
import { SingleFilterView } from './SingleFilterView';
import {
  FilterKey,
  ActiveFilters,
  ReducedFilterMap
} from '../data_layer/models/Filters';

interface Props {
  activeFilters: ActiveFilters;
  reducedFilterMap: ReducedFilterMap;
  addFilter(filter: FilterKey, selection: string): void;
  removeFilter(filter: FilterKey): void;
}

export const AllFiltersView = (props: Props): JSX.Element => {
  const keyArray = Array.from(props.reducedFilterMap.keys()).sort();
  const componentArray: JSX.Element[] = keyArray.map(filter => {
    const selectionMap: Map<string, number> = props.reducedFilterMap.get(
      filter
    )!;
    return (
      <SingleFilterView
        key={filter}
        filter={filter}
        activeFilter={props.activeFilters.get(filter) || null}
        selectionMap={selectionMap}
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
    marginTop: '1rem',
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
