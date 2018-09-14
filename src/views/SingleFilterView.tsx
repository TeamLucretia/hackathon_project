import * as React from 'react';
import { FilterKey } from '../data_layer/models/Filters';
import { SingleSelectionView } from './SingleSelectionView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  key: FilterKey;
  filter: FilterKey;
  activeFilter: string | null;
  selectionSet: Set<string>;
  addFilter(filter: FilterKey, selection: string): void;
  removeFilter(filter: FilterKey): void;
}

// TODO: Add label, dropdown icon/functionality, styling; sort selections

export const SingleFilterView = (props: Props): JSX.Element => {
  const componentArray: JSX.Element[] = [];
  for (let selection of props.selectionSet) {
    const isChecked = selection === props.activeFilter;
    const isInactive = !!props.activeFilter && !isChecked;
    componentArray.push(
      <SingleSelectionView
        key={selection}
        filter={props.filter}
        isChecked={isChecked}
        isInactive={isInactive}
        selection={selection}
        addFilter={props.addFilter}
        removeFilter={props.removeFilter}
      />
    );
  }
  return (
    <div style={styles.filterUnit}>
      <FontAwesomeIcon icon={faCaretRight} />
      {props.filter}
      {componentArray}
    </div>
  );
};

const styles = {
  filterUnit: {
    width: '100%'
  } as React.CSSProperties
};
