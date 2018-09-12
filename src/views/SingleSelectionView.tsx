import * as React from 'react';
import { FilterKey } from '../data_layer/models/Filters';

interface Props {
  filter: FilterKey;
  isChecked: boolean;
  isInactive: boolean;
  selection: string;
  addFilter(filter: FilterKey, selection: string): void;
  removeFilter(filter: FilterKey): void;
}

// TODO: Add label text, styling

export const SingleSelectionView = (props: Props): JSX.Element => {
  return (
    <div style={styles.filterSelection} key={props.selection}>
      <input
        type="checkbox"
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
    </div>
  );
};

const styles = {
  filterSelection: {
    backgroundColor: 'white'
  } as React.CSSProperties
};
