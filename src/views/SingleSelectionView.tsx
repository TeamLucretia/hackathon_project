import * as React from 'react';
import { FilterKey } from '../data_layer/models/Filters';

interface Props {
  key: string;
  filter: FilterKey;
  isChecked: boolean;
  frequency: number;
  selection: string;
  addFilter(filter: FilterKey, selection: string): void;
  removeFilter(filter: FilterKey): void;
}

export const SingleSelectionView = (props: Props): JSX.Element => {
  return (
    <div style={styles.filterSelection}>
      <input
        type="checkbox"
        style={styles.filterCheckbox}
        name={props.selection}
        id={props.selection}
        checked={props.isChecked}
        onChange={
          props.isChecked
            ? () => {
                props.removeFilter(props.filter);
              }
            : () => {
                props.addFilter(props.filter, props.selection);
              }
        }
      />
      <label
        style={
          props.frequency === 0
            ? styles.filterLabelInactive
            : styles.filterLabelActive
        }
        htmlFor={props.selection}
      >
        {props.selection}
        {' ('}
        {props.frequency}
        {')'}
      </label>
    </div>
  );
};

const styles = {
  filterSelection: {
    backgroundColor: 'white',
    display: 'flex'
  } as React.CSSProperties,
  filterCheckbox: {
    margin: '0.15rem'
  } as React.CSSProperties,
  filterLabelActive: {
    fontSize: '0.9rem'
  } as React.CSSProperties,
  filterLabelInactive: {
    fontSize: '0.9rem',
    color: 'gray'
  } as React.CSSProperties
};
