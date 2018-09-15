import * as React from 'react';
import { FilterKey } from '../data_layer/models/Filters';

interface Props {
  key: string;
  filter: FilterKey;
  isChecked: boolean;
  isInactive: boolean;
  selection: string;
  addFilter(filter: FilterKey, selection: string): void;
  removeFilter(filter: FilterKey): void;
}

// TODO: Add label text, styling, sort

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
      <label style={styles.filterLabel} htmlFor={props.selection}>
        {props.selection}
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
    backgroundColor: 'white',
    margin: '0.15rem'
  } as React.CSSProperties,
  filterLabel: {
    backgroundColor: 'white',
    fontSize: '0.9rem'
  }
};
