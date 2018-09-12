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
    this.allFilters = this.determineAllFilters();
  }

  private determineAllFilters(): FilterMap {
    const allFilters: FilterMap = new Map();
    Object.keys(FilterKey).forEach(key => {
      const selectionSet: Set<string> = new Set(
        this.state.imageData.map(story => story[FilterKey[key]])
      );
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
        if (story[filter] != selection) {
          visible = false;
        }
      }
      return visible;
    });
  }

  private setContent(): JSX.Element {
    return !this.state.isLoaded ? (
      <h2>Loading image data...</h2>
    ) : this.state.imageData.length > 0 ? (
      <h2>Failed to load image data.</h2>
    ) : (
      <React.Fragment>
        <AllFiltersView
          activeFilters={this.state.activeFilters}
          allFilters={this.allFilters}
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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex'
  } as React.CSSProperties,
  subHeader: {
    textAlign: 'center'
  }
};
