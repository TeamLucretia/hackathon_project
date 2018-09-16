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

  /**
   * Generates a Map of filter types (as keys) and selection strings
   * (as values) from imageData loaded from MIA.
   * @param imageData {StoryImageData[]}
   * @returns {AllFilterMap} Map<FilterKey, Set<string>>
   */
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

  /**
   * Adds active filter to component state. Side effect only, no return.
   * @param filter {FilterKey}
   * @param selection {string}
   */
  private addFilter(filter: FilterKey, selection: string): void {
    this.setState(prevState => {
      const newFilterMap: ActiveFilters = new Map(prevState.activeFilters);
      newFilterMap.set(filter, selection);
      return { activeFilters: newFilterMap };
    });
  }

  /**
   * Removes active filter from component state. Side effect only, no return.
   * @param filter {FilterKey}
   */
  private removeFilter(filter: FilterKey): void {
    this.setState(prevState => {
      const newFilterMap: ActiveFilters = new Map(prevState.activeFilters);
      newFilterMap.delete(filter);
      return { activeFilters: newFilterMap };
    });
  }

  /**
   * Passed currently visible stories, returns a Map of filters (as keys),
   * selectors and number of appearances of these selectors in the stories
   * as a child Map<selector: string, appearances: number>.
   * @param filteredImageData
   * @returns {ReducedFilterMap} Map<FilterKey, Map<string, number>>
   */
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

  /**
   * Using current this.state.activeFilters, filters all imageData
   * to show only filtered images. Accepts no parameters, returns
   * nothing; used only for side effects.
   */
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

  /**
   * Helper function for render() method.
   * @returns {JSX.Element}
   */
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
