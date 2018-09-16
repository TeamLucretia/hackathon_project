import * as React from 'react';
import { AllFiltersView } from './AllFiltersView';
import { FilteredStoriesView } from './FilteredStoriesView';
import {
  StoryImageData,
  getImageData
} from '../data_layer/models/StoryImageData';
import {
  FilterKey,
  ReducedFilterMap,
  ActiveFilters
} from '../data_layer/models/Filters';

type AllFilterMap = Map<FilterKey, Set<string>>;

type Props = {};
type State = {
  imageData: StoryImageData[];
  allFilters: AllFilterMap;
  isLoaded: boolean;
  activeFilters: ActiveFilters;
};

export class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      imageData: [],
      allFilters: new Map(),
      isLoaded: false,
      activeFilters: new Map()
    };
    this.setContent = this.setContent.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.removeAllFilters = this.removeAllFilters.bind(this);
  }

  async componentDidMount() {
    const imageData: StoryImageData[] = await getImageData();
    const allFilters = this.determineAllFilters(imageData);
    this.setState({
      imageData,
      allFilters,
      isLoaded: true
    });
  }

  private determineAllFilters(imageData: StoryImageData[]): AllFilterMap {
    const allFilters: AllFilterMap = new Map();
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

  private reduceAllFilters(
    filteredImageData: StoryImageData[]
  ): ReducedFilterMap {
    const reducedFilterMap: ReducedFilterMap = new Map();
    for (let [filter, selectionSet] of this.state.allFilters) {
      const singleFilterMap: Map<string, number> = new Map();
      selectionSet.forEach((selection: string) => {
        // Count instances.
        const numInstances: number = filteredImageData.reduce(
          (instances: number, story: StoryImageData): number => {
            if (typeof story[filter] === 'string') {
              if (selection === story[filter]) {
                return instances + 1;
              }
              return instances;
            } else if (Array.isArray(story[filter])) {
              if (story[filter].includes(selection)) {
                return instances + 1;
              }
              return instances;
            }
            return instances;
          },
          0
        );
        // Add <selection, number> pair to singleFilterMap
        singleFilterMap.set(selection, numInstances);
      });
      // Add <filter, singleFilterMap> pair to reducedFilterMap
      reducedFilterMap.set(filter, singleFilterMap);
    }
    return reducedFilterMap;
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
    if (!this.state.isLoaded) {
      return <h1 style={styles.header}>Loading image data...</h1>;
    } else if (this.state.imageData.length === 0) {
      return <h1 style={styles.header}>Failed to load image data.</h1>;
    }
    const filteredImageData: StoryImageData[] = this.filterImageData();
    const reducedFilterMap: ReducedFilterMap = this.reduceAllFilters(
      filteredImageData
    );
    return (
      <React.Fragment>
        <AllFiltersView
          activeFilters={this.state.activeFilters}
          reducedFilterMap={reducedFilterMap}
          addFilter={this.addFilter}
          removeFilter={this.removeFilter}
          removeAllFilters={this.removeAllFilters}
        />
        <FilteredStoriesView activeImageData={filteredImageData} />
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
