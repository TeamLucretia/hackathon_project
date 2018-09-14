import * as React from 'react';
import { AllFiltersView } from './AllFiltersView';
import { FilteredStoriesView } from './FilteredStoriesView';
import {
  StoryImageData,
  getImageData
} from '../data_layer/models/StoryImageData';
import {
  FilterKey,
  FilterMap,
  ActiveFilters
} from '../data_layer/models/Filters';

type Props = {};
type State = {
  imageData: StoryImageData[];
  isLoaded: boolean;
  activeFilters: ActiveFilters;
};

export class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      imageData: [],
      isLoaded: false,
      activeFilters: new Map()
    };
    this.setContent = this.setContent.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.removeAllFilters = this.removeAllFilters.bind(this);
  }

  allFilters: FilterMap = new Map();

  async componentDidMount() {
    const imageData: StoryImageData[] = await getImageData();
    this.setState({
      imageData,
      isLoaded: true
    });
  }

  private determineAllFilters(imageData: StoryImageData[]): FilterMap {
    const allFilters: FilterMap = new Map();
    Object.keys(FilterKey).forEach(key => {
      const selectionSet: Set<string> = new Set();
      imageData.forEach(story => {
        const property = story[FilterKey[key]];
        if (property) {
          // eliminates empty string, undefined, null
          if (typeof property === 'string') {
            selectionSet.add(property);
          } else if (Array.isArray(property)) {
            property.forEach(element => {
              selectionSet.add(element);
            });
          }
        }
      });
      allFilters.set(FilterKey[key], selectionSet);
    });
    return allFilters;
  }

  private addFilter(filter: FilterKey, selection: string): void {
    this.setState(prevState => {
      const newFilterMap: ActiveFilters = new Map(prevState.activeFilters);
      newFilterMap.set(filter, selection);
      return { activeFilters: newFilterMap };
    });
  }

  private removeFilter(filter: FilterKey): void {
    this.setState(prevState => {
      const newFilterMap: ActiveFilters = new Map(prevState.activeFilters);
      newFilterMap.delete(filter);
      return { activeFilters: newFilterMap };
    });
  }

  private removeAllFilters(): void {
    this.setState({ activeFilters: new Map() });
  }

  private filterImageData(): StoryImageData[] {
    return this.state.imageData.filter(story => {
      let visible = true;
      for (let [filter, selection] of this.state.activeFilters) {
        const element = story[filter];
        if (typeof element === 'string') {
          visible = element === selection ? visible : false;
        } else if (Array.isArray(element)) {
          visible = element.includes(selection) ? visible : false;
        } else {
          // element is undefined or null
          visible = false;
        }
      }
      return visible;
    });
  }

  private setContent(): JSX.Element {
    return !this.state.isLoaded ? (
      <h1 style={styles.header}>Loading image data...</h1>
    ) : this.state.imageData.length === 0 ? (
      <h1 style={styles.header}>Failed to load image data.</h1>
    ) : (
      <React.Fragment>
        <AllFiltersView
          activeFilters={this.state.activeFilters}
          allFilters={this.determineAllFilters(this.state.imageData)}
          addFilter={this.addFilter}
          removeFilter={this.removeFilter}
          removeAllFilters={this.removeAllFilters}
        />
        <FilteredStoriesView activeImageData={this.filterImageData()} />
      </React.Fragment>
    );
  }

  render(): JSX.Element {
    return <div style={styles.container}>{this.setContent()}</div>;
  }
}

const styles = {
  container: {
    display: 'flex'
  } as React.CSSProperties,
  header: {
    textAlign: 'center',
    fontSize: '1.5rem'
  }
};
