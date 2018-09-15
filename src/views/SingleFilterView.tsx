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

function centurySort(a: string, b: string): number {
  const aIsBCE = /BCE/.test(a);
  const bIsBCE = /BCE/.test(b);
  const aDigit = a.match(/\d+/);
  const bDigit = b.match(/\d+/);
  if (aDigit && bDigit) {
    if (aIsBCE && bIsBCE) {
      return parseInt(aDigit[0]) - parseInt(bDigit[0]);
    } else if (!aIsBCE && !bIsBCE) {
      return parseInt(bDigit[0]) - parseInt(aDigit[0]);
    } else if (aIsBCE) {
      return 1;
    } else if (bIsBCE) {
      return -1;
    }
  }
  return 0;
}

export const SingleFilterView = (props: Props): JSX.Element => {
  let sortedSelections: string[];
  const selectionArray: string[] = Array.from(props.selectionSet);
  if (props.filter === FilterKey.CENTURY) {
    sortedSelections = selectionArray.sort(centurySort);
  } else if (props.filter === FilterKey.DISPLAY) {
    sortedSelections = ['On View', 'Not On View'];
  } else {
    sortedSelections = selectionArray.sort();
  }
  const componentArray: JSX.Element[] = sortedSelections.map(selection => {
    const isChecked = selection === props.activeFilter;
    const isInactive = !!props.activeFilter && !isChecked;
    return (
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
  });

  // TODO: Animate caret, list; sort; style

  return (
    <fieldset style={styles.filterFieldset}>
      <legend style={styles.filterLegend}>
        <FontAwesomeIcon icon={faCaretRight} />
        <span style={styles.filterLegendText}>{props.filter}</span>
      </legend>
      {componentArray}
    </fieldset>
  );
};

const styles = {
  filterFieldset: {
    width: '100%',
    marginTop: '0.25rem',
    border: 0
  } as React.CSSProperties,
  filterLegend: {
    textTransform: 'capitalize',
    border: 0
  } as React.CSSProperties,
  filterLegendText: {
    marginLeft: '0.25rem'
  }
};
