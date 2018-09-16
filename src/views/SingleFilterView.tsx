import * as React from 'react';
import { FilterKey } from '../data_layer/models/Filters';
import { SingleSelectionView } from './SingleSelectionView';

interface Props {
  key: FilterKey;
  filter: FilterKey;
  activeFilter: string | null;
  selectionMap: Map<string, number>;
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
  let sortedSelections: string[] = Array.from(props.selectionMap.keys()).sort(
    (a: string, b: string) => {
      const aFrequency = props.selectionMap.get(a);
      const bFrequency = props.selectionMap.get(b);
      if (aFrequency === 0) {
        return 1;
      } else if (bFrequency === 0) {
        return -1;
      } else if (props.filter === FilterKey.CENTURY) {
        return centurySort(a, b);
      } else if (props.filter === FilterKey.DISPLAY) {
        return a === 'On View' ? -1 : 1;
      }
      return a < b ? -1 : 1;
    }
  );

  const componentArray: (JSX.Element | null)[] = sortedSelections.map(
    selection => {
      const isChecked = selection === props.activeFilter;
      const frequency = props.selectionMap.get(selection)!;
      const otherIsChecked: boolean = !!props.activeFilter && !isChecked;
      return frequency === 0 || otherIsChecked ? null : (
        <SingleSelectionView
          key={selection}
          filter={props.filter}
          isChecked={isChecked}
          selection={selection}
          frequency={frequency}
          addFilter={props.addFilter}
          removeFilter={props.removeFilter}
        />
      );
    }
  );

  return (
    <fieldset style={styles.filterFieldset}>
      <legend style={styles.filterLegend}>
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
