import { observable } from 'mobx';
import { StoryImage, GET_DUMMY_IMAGES } from '../models/StoryImage';

export enum PhotoFilter {
    ALL,
    TEMP
    //todo: 
}

export class StoryStore {
    @observable private _storiesToDisplay: StoryImage[] = [];
    @observable private _storeIsReady: boolean = false;

    private _allStories: StoryImage[] = [];

    constructor() {
        //todo: get stories from databbase.then((results) => {

        this._allStories = GET_DUMMY_IMAGES();
        this._storeIsReady = true;
        // }
    }

    public get storiesToDisplay(): StoryImage[] {
        return this._storiesToDisplay;
    }

    public get storeIsReady(): boolean {
        return this._storeIsReady;
    }

    // Call this when we want to update filter, add switch case and update `this._storiesToDisplay` 
    // It will re-render the FilteredStoriesView
    public filterStoriesToDisplay(filter: PhotoFilter, subFilter: string): void {
        const allStories = this._allStories;

        switch (filter) {
            case PhotoFilter.ALL:
                this._storiesToDisplay = [...allStories];
                break;
            case PhotoFilter.TEMP:
                this._storiesToDisplay = [...allStories].filter(x => x.TEMP === subFilter);
                break;
            default:
                console.assert(false, 'case @filterStoriesToDisplay() was not accounted for');
        }
    }
}
