import { observable } from 'mobx';
import { StoryImage, getImages } from '../models/StoryImage';
import { SelectedFilter } from '../../views/FilterView';

export interface FilterSet {
  filter: string;
  filterValues: Set<string>;
}

export const photoFilters: string[] = [
  'continent',
  'country',
  'medium',
  'classification',
  'style',
  'onView'
];

export class StoryStore {
  @observable
  private _storiesToDisplay: StoryImage[] = [];
  @observable
  private _storeIsReady: boolean = false;

  private _allStories: StoryImage[] = [];

  constructor() {
    getImages().then(result => {
      console.log(result);
      this._allStories = result;
      this._storeIsReady = true;
    });
  }

  public get storiesToDisplay(): StoryImage[] {
    return this._storiesToDisplay;
  }

  public get storeIsReady(): boolean {
    return this._storeIsReady;
  }

  public getAvailableFilterSelections(filter: string): Set<string> {
    return new Set(this._storiesToDisplay.map(story => story[filter]));
  }

  public get allFilterSets(): FilterSet[] {
    return photoFilters.map(filter => {
      const filterValues: Set<string> = new Set(
        this._allStories.map(story => story[filter])
      );
      return { filter, filterValues };
    });
  }

  // Call this when we want to update filter, add switch case and update `this._storiesToDisplay`
  // It will re-render the FilteredStoriesView
  public filterStoriesToDisplay(checkedFilters: SelectedFilter[]): void {
    this._storiesToDisplay = this._allStories.filter(story => {
      let matchesAllFilters: boolean = true;
      const index: number = 0;
      while (matchesAllFilters && index < checkedFilters.length) {
        const currentFilter: SelectedFilter = checkedFilters[index];
        matchesAllFilters =
          story[currentFilter.filter] === currentFilter.selection;
      }
      return matchesAllFilters;
    });
  }
}
